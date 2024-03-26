import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
	progressBarComponentContainer: {
		justifyContent: 'center',
		alignContent: 'center',
		marginTop: '7%',
		marginBottom: Platform.OS === 'android' ? '5%' : '2%',
		borderRadius: 15,
		width: '100%',
		height: '100%',
	},
	progressBarContainer: {
		flexDirection: 'row',
		marginTop: '1%',
		backgroundColor: '#F0F0F0',
		borderRadius: 32,
		overflow: 'hidden',
		width: '100%',
		height: 15,
	},
	filledProgressBar: {
		backgroundColor: '#FF815E',
		height: 15,
		borderRadius: 32,
	},
	progressBarItem: {
		marginBottom: Platform.OS === 'android' ? 12 : 8,
		paddingHorizontal: 20,
		paddingVertical: 8,
		backgroundColor: 'white',
		borderRadius: 12,
		width: '96%',
		height: '20%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		alignSelf: 'center',
	},
	labelContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 2,
	},
	label: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 14,
		fontWeight: 'bold',
	},

});

/**
 * Units for the nutrients
 */
const nutrientUnits = {
	calories: 'kcal',
	protein: 'g',
	carbs: 'g',
	fat: 'g',
	fibre: 'g',
	sugar: 'g',
	sodium: 'mg',
	water: 'ml',
};

/**
 * Progress bar component
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the progress bar
 * @param {number} [props.progress=0] - Current progress
 * @param {number} props.max - Maximum value for the progress
 * @param {string} [props.unit=''] - Unit for the progress
 */
const ProgressBar = ({ label, progress = 0, max, unit = '' }) => {
	const progressAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(progressAnim, {
			toValue: (progress / max) * 100,
			duration: 500,
			useNativeDriver: false,
		}).start();
	}, [progress]);

	const widthInterpolated = progressAnim.interpolate({
		inputRange: [0, 100],
		outputRange: ['0%', '100%'],
	});

	return (
		<View style={styles.progressBarItem}>
			<View style={styles.labelContainer}>
				<Text style={styles.label}>{label}</Text>
				<Text style={styles.label}>{`${progress} / ${max} ${unit}`}</Text>
			</View>
			<View style={styles.progressBarContainer}>
				<Animated.View style={[styles.filledProgressBar, { width: widthInterpolated }]} />
			</View>
		</View>
	);
};

ProgressBar.propTypes = {
	label: PropTypes.string.isRequired,
	progress: PropTypes.number,
	max: PropTypes.number.isRequired,
	unit: PropTypes.string,
};

/**
 * Nutrition progress component
 * @param {Object} props - Component props
 * @param {Object} props.todayStats - Today's stats
 * @param {Object} props.goals - Goals
 */
const NutritionProgress = ({ todayStats, goals }) => {
	const initialMacroValues = {
		calories: 0,
		water: 0,
		fat: 0,
		sodium: 0,
		carbs: 0,
		protein: 0,
		sugar: 0,
		fibre: 0,
	};

	const currentMacroValues = Object.keys(initialMacroValues).reduce((acc, key) => {
		acc[key] = todayStats[key] ? parseInt(todayStats[key].toFixed(0)) : 0;
		return acc;
	}, {});

	const nutrientGoals = {
		calories: 2000,
		fat: 70,
		sodium: 2300,
		carbs: 300,
		water: 3700,
		protein: 50,
		sugar: 25,
		fibre: 30,
	};

	if (goals && goals.goals) {
		goals.goals.forEach(goal => {
			if (goal.measurement in nutrientGoals) {
				nutrientGoals[goal.measurement] = goal.maxTargetMass;
			}
		});
	}

	const nutrientsOfInterest = ['carbs', 'fat', 'sodium', 'sugar', 'fibre'];

	return (
		<View style={styles.progressBarComponentContainer}>
			{nutrientsOfInterest.map((nutrient) => (
				<ProgressBar
					key={nutrient}
					label={nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}
					progress={currentMacroValues[nutrient]}
					max={nutrientGoals[nutrient]}
					unit={nutrientUnits[nutrient]}
				/>
			))}
		</View>
	);
};

NutritionProgress.propTypes = {
	todayStats: PropTypes.object.isRequired,
	goals: PropTypes.arrayOf(
		PropTypes.shape({
			__v: PropTypes.number,
			_id: PropTypes.string.isRequired,
			maxTargetMass: PropTypes.number.isRequired,
			measurement: PropTypes.string.isRequired,
			minTargetMass: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default NutritionProgress;