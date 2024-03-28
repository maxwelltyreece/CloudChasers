import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';


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
 * ProgressBar component
 * @param {Object} props - The properties passed to the component
 * @param {string} props.label - The label for the progress bar
 * @param {number} props.progress - The current progress
 * @param {number} props.max - The maximum value for the progress bar
 * @param {string} props.unit - The unit of measurement for the progress
 * @returns {JSX.Element} The ProgressBar component
 */
const ProgressBar = ({ label, progress, max, unit }) => {
	const [containerWidth, setContainerWidth] = useState(0);
	const animatedWidth = useRef(new Animated.Value(0)).current;

	const measureContainer = (event) => {
		const { width } = event.nativeEvent.layout;
		setContainerWidth(width);
	};

	useEffect(() => {
		const safeDivision = (numerator, denominator, containerWidth) => {
			if (denominator > 0) {
				return (numerator / denominator) * containerWidth;
			} else {
				return 0;
			}
		};

		let finalWidth = 0;
		{
			(progress != undefined && progress != null && max != undefined && max != null && containerWidth != undefined && containerWidth != null) ?
				finalWidth = safeDivision(progress, max, containerWidth) : finalWidth = 0
		}
		Animated.timing(animatedWidth, {
			toValue: finalWidth,
			duration: 1000,
			useNativeDriver: false,
		}).start();
	}, [progress, max, containerWidth]);


	return (
		<View style={styles.progressBarItem}>
			<View style={styles.labelContainer}>
				<Text style={styles.label}>{label}</Text>
				<Text style={styles.label}>{`${progress ?? 0} / ${max} ${unit}`}</Text>
			</View>
			<View style={styles.progressBarContainer} onLayout={measureContainer}>
				<Animated.View style={[styles.filledProgressBar, { width: animatedWidth }]} />
			</View>
		</View>
	);
};

ProgressBar.PropTypes = {
	label: PropTypes.string.isRequired,
	progress: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	unit: PropTypes.string,
};

ProgressBar.defaultProps = {
	progress: 0,
	unit: '',
};

/**
 * NutritionProgress component
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.todayStats - The current stats for today
 * @param {Object} props.goals - The goals for the user
 * @returns {JSX.Element} The NutritionProgress component
 */
const NutritionProgress = ({ todayStats, goals }) => {
	let initialMacroValues = {
		calories: 0,
		water: 0,
		fat: 0,
		sodium: 0,
		carbs: 0,
		protein: 0,
		sugar: 0,
		fibre: 0,
	};

	let currentMacroValues = { ...initialMacroValues };

	Object.keys(todayStats).forEach(key => {
		if (todayStats[key] !== null && todayStats[key] !== undefined) {
			currentMacroValues[key] = todayStats[key];
		}
	});

	Object.keys(currentMacroValues).forEach(key => {
		currentMacroValues[key] = parseInt(currentMacroValues[key].toFixed(0));
	});

	let nutrientGoals = {
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
			{nutrientsOfInterest.map((nutrient) => {
				return (
					<ProgressBar
						key={nutrient}
						label={nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} // Capitalize the first letter for display
						progress={currentMacroValues[nutrient]}
						max={nutrientGoals[nutrient]}
						unit={nutrientUnits[nutrient]}
					/>
				);
			})}
		</View>
	);
};

NutritionProgress.PropTypes = {
	todayStats: PropTypes.object.isRequired,
	goals: PropTypes.object,
};


export default NutritionProgress;