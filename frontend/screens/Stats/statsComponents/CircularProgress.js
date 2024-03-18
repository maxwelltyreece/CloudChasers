import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import Proptypes from 'prop-types';

const CircularProgressComponent = ({ todayStats, goals }) => {
  const [progressValues, setProgressValues] = useState({
    calories: 0,
    protein: 0,
    water: 0,
  });

  const colorScheme = {
    calories: '#ff592b',
    middleRing: '#ff815e',
    water: '#5edcff',
  };

  // Safe divide function to avoid dividing by zero
  const safeDivide = (numerator, denominator) => {
    return denominator === 0 ? 0 : (numerator / denominator) * 100;
  };

  useEffect(() => {
    const calculateProgress = () => {
      let newProgressValues = { calories: 0, protein: 0, water: 0 };
      if (goals && goals.goals && todayStats) {
        goals.goals.forEach((goal) => {
          switch (goal.measurement) {
            case 'calories':
              newProgressValues.calories = safeDivide(todayStats.calories, goal.maxTargetMass);
              break;
            case 'protein':
              newProgressValues.protein = safeDivide(todayStats.protein, goal.maxTargetMass);
              break;
            case 'water':
              newProgressValues.water = safeDivide(todayStats.water, goal.maxTargetMass);
              break;
            default:
              break;
          }
        });
      }
      setProgressValues(newProgressValues);
    };

    calculateProgress();
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
          activeStrokeColor={colorScheme.middleRing}
          inActiveStrokeColor={colorScheme.middleRing}
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
        <Text style={[styles.keyText, { color: colorScheme.middleRing }]}>Protein: {progressValues.protein.toFixed(0)}%</Text>
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
