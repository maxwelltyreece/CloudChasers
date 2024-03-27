import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
// import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		top: -10,
	},
	keyContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: 20,
		width: '100%',
	},
	keyText: {
		marginHorizontal: 5,
		fontSize: 16,
		fontFamily: 'Montserrat_700Bold',
	},
});

const CircularProgressComponent = ({ todayStats, goals }) => {

	// Initial macro values moved into state
	// const [currentMacroValues, setCurrentMacroValues] = useState({
	//   calories: 0,
	//   water: 0,
	//   fat: 0,
	//   sodium: 0,
	//   carbs: 0,
	//   protein: 0,
	//   sugar: 0,
	//   fibre: 0,
	// });

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

	let currentMacroValues = { ...initialMacroValues, ...todayStats }

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


	const [progressValues, setProgressValues] = useState({
		calories: 0,
		protein: 0,
		water: 0,
	});

	const colorScheme = {
		calories: '#ff592b',
		protein: '#ff815e',
		water: '#5edcff',
	};

	// useEffect(() => {
	//   const newCurrentMacroValues = { ...currentMacroValues, ...todayStats };
	//   console.log('New Current Macro Values:', newCurrentMacroValues);
	//   setCurrentMacroValues(newCurrentMacroValues);
	// }, [todayStats]);

	// Safe divide function to avoid dividing by zero or if filled to 100%
	const safeDivide = (numerator, denominator) => {
		const ratio = denominator === 0 ? 0 : numerator / denominator;
		return ratio >= 1 ? 100 : ratio * 100;
	};

	const updateProgressValues = () => {
		const newProgressValues = {
			calories: todayStats.calories != undefined
				? safeDivide(currentMacroValues.calories, nutrientGoals.calories)
				: 0,
			protein: todayStats.protein != undefined
				? safeDivide(currentMacroValues.protein, nutrientGoals.protein)
				: 0,
			water: todayStats.water != undefined
				? safeDivide(currentMacroValues.water, nutrientGoals.water)
				: 0,
		};

		setProgressValues(newProgressValues);
	};

	useEffect(() => {
		updateProgressValues();
	}, [todayStats, goals]);


	console.log('Progress Values:', progressValues);
	console.log('Current Macro Values:', currentMacroValues);
	console.log('Nutrient Goals:', nutrientGoals);
	console.log('Today Stats:', todayStats);

	return (
		<View style={styles.container}>
			<CircularProgressBase
				style={{ transform: [{ rotate: '180deg' }] }}
				value={isNaN(progressValues.calories) ? 0 : progressValues.calories}
				radius={135}
				activeStrokeColor={colorScheme.calories}
				inActiveStrokeColor={colorScheme.calories}
				inActiveStrokeOpacity={0.2}
				activeStrokeWidth={28}
				inActiveStrokeWidth={28}
				displayValue={false}
			>
				<CircularProgressBase
					style={{ transform: [{ rotate: '180deg' }] }}
					value={isNaN(progressValues.protein) ? 0 : progressValues.protein}
					radius={105}
					activeStrokeColor={colorScheme.protein}
					inActiveStrokeColor={colorScheme.protein}
					inActiveStrokeOpacity={0.2}
					activeStrokeWidth={28}
					inActiveStrokeWidth={28}
					displayValue={false}
				>
					<CircularProgressBase
						style={{ transform: [{ rotate: '180deg' }] }}
						value={isNaN(progressValues.water) ? 0 : progressValues.water}
						radius={75}
						activeStrokeColor={colorScheme.water}
						inActiveStrokeColor={colorScheme.water}
						inActiveStrokeOpacity={0.2}
						activeStrokeWidth={28}
						inActiveStrokeWidth={28}
						displayValue={false}
					/>
				</CircularProgressBase>
			</CircularProgressBase>

			<View style={styles.keyContainer}>
				<Text style={[styles.keyText, { color: colorScheme.calories }]}>Calories: {isNaN(progressValues.calories) ? 0 : progressValues.calories.toFixed(0)}%</Text>
				<Text style={[styles.keyText, { color: colorScheme.protein }]}>Protein: {isNaN(progressValues.protein) ? 0 : progressValues.protein.toFixed(0)}%</Text>
				<Text style={[styles.keyText, { color: colorScheme.water }]}>Water: {isNaN(progressValues.water) ? 0 : progressValues.water.toFixed(0)}%</Text>
			</View>
		</View>
	);
};

CircularProgressComponent.PropTypes = {
	todayStats: PropTypes.object,
	goals: PropTypes.object,
};

export default CircularProgressComponent;