import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
// import { useFocusEffect } from '@react-navigation/native';
import Proptypes from 'prop-types';

const CircularProgressComponent = ({ todayStats, goals }) => {

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
  
  let currentMacroValues = { ...initialMacroValues, ...todayStats };

  // Pre-filled with default nutrient goals based on recommended daily amount for each nutrient.
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

  // Safe divide function to avoid dividing by zero or if filled to 100%
  const safeDivide = (numerator, denominator) => {
    const ratio = denominator === 0 ? 0 : numerator / denominator;
    return ratio >= 1 ? 100 : ratio * 100;
  };

  useEffect(() => {
    setProgressValues({
      calories: safeDivide(currentMacroValues.calories, nutrientGoals.calories),
      protein: safeDivide(currentMacroValues.protein, nutrientGoals.protein),
      water: safeDivide(currentMacroValues.water, nutrientGoals.water),
    });
  }, [todayStats, goals]);


  return (
    <View style={styles.container}>
      <CircularProgressBase
        value={progressValues.calories}
        radius={140}
        activeStrokeColor={colorScheme.calories}
        inActiveStrokeColor={colorScheme.calories}
        inActiveStrokeOpacity={0.2}
        activeStrokeWidth={30}
        inActiveStrokeWidth={30}
        displayValue={false}
      >
        <CircularProgressBase
          value={progressValues.protein}
          radius={110}
          activeStrokeColor={colorScheme.protein}
          inActiveStrokeColor={colorScheme.protein}
          inActiveStrokeOpacity={0.2}
          activeStrokeWidth={22}
          inActiveStrokeWidth={22}
          displayValue={false}
        >
          <CircularProgressBase
            value={progressValues.water}
            radius={80}
            activeStrokeColor={colorScheme.water}
            inActiveStrokeColor={colorScheme.water}
            inActiveStrokeOpacity={0.2}
            activeStrokeWidth={15}
            inActiveStrokeWidth={15}
            displayValue={false}
          />
        </CircularProgressBase>
      </CircularProgressBase>

      <View style={styles.keyContainer}>
        <Text style={[styles.keyText, { color: colorScheme.calories }]}>Calories: {progressValues.calories.toFixed(0)}%</Text>
        <Text style={[styles.keyText, { color: colorScheme.protein }]}>Protein: {progressValues.protein.toFixed(0)}%</Text>
        <Text style={[styles.keyText, { color: colorScheme.water }]}>Water: {progressValues.water.toFixed(0)}%</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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

CircularProgressComponent.propTypes = {
  todayStats: Proptypes.object,
  goals: Proptypes.object,
};

export default CircularProgressComponent;
