import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import Proptypes from 'prop-types';


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

const colorScheme = {
    calories: '#ff592b',
    protein: '#ff815e',
    water: '#5edcff',
};

/**
 * Circular progress component
 * @component
 * @param {Object} todayStats - The stats for today
 * @param {Object} goals - The goals
 */
const CircularProgressComponent = ({ todayStats, goals }) => {

  const currentMacroValues = { ...initialMacroValues, ...todayStats }

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

  /**
   * Safely divides two numbers
   * @param {number} numerator - The numerator
   * @param {number} denominator - The denominator
   * @returns {number} - The result of the division, or 0 if the denominator is 0
   */
  const safeDivide = (numerator, denominator) => {
    const ratio = denominator === 0 ? 0 : numerator / denominator;
    return ratio >= 1 ? 100 : ratio * 100;
  };

    /**
     * Updates the progress values
     */
    const updateProgressValues = () => {
        const newProgressValues = ['calories', 'protein', 'water'].reduce((acc, key) => {
            acc[key] = todayStats[key] !== undefined ? safeDivide(currentMacroValues[key], nutrientGoals[key]) : 0;
            return acc;
        }, {});

        setProgressValues(newProgressValues);
    };

  /**
   * Updates the progress values when the stats or goals change
   */
  useEffect(() => {
    updateProgressValues();
  }, [todayStats, goals]);

  return (
    <View style={styles.container}>
      <CircularProgressBase
        style = {{transform: [{ rotate: '180deg' }]}}
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
          style = {{transform: [{ rotate: '180deg' }]}}
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
            style = {{transform: [{ rotate: '180deg' }]}}
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

CircularProgressComponent.propTypes = {
	todayStats: Proptypes.object,
	goals: Proptypes.object,
};

export default CircularProgressComponent;