import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { useFocusEffect } from '@react-navigation/native';

const CircularProgressComponent = () => {
  const [progressValues, setProgressValues] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
  });
  const colorScheme = {
    value1: '#9f41ec',
    value2: '#ec41aa',
    value3: '#4160ec',
  };

//carbs, fat, fibre, sugar, sodium
  const resetProgressValues = () => setProgressValues({ value1: 0, value2: 0, value3: 0 });
  const loadProgressValues = () => {
    setProgressValues({ value1: 80, value2: 87, value3: 62 });
  };
  useFocusEffect(
    useCallback(() => {
      loadProgressValues();
      return () => {
        resetProgressValues();
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <CircularProgressBase
          {...props}
          value={progressValues.value1}
          radius={180}
          activeStrokeColor={colorScheme.value1}
          inActiveStrokeColor={colorScheme.value1}
          displayValue={true}
        >
          <CircularProgressBase
            {...props}
            value={progressValues.value2}
            radius={150}
            activeStrokeColor={colorScheme.value2}
            inActiveStrokeColor={colorScheme.value2}
          >
            <CircularProgressBase
              {...props}
              value={progressValues.value3}
              radius={120}
              activeStrokeColor={colorScheme.value3}
              inActiveStrokeColor={colorScheme.value3}
            />
        </CircularProgressBase>
      </CircularProgressBase>

      <View style={styles.keyContainer}>
        <Text style={[styles.keyText, { color: colorScheme.value1 }]}>Calories: {progressValues.value1}%</Text>
        <Text style={[styles.keyText, { color: colorScheme.value2 }]}>Protein: {progressValues.value2}%</Text>
        <Text style={[styles.keyText, { color: colorScheme.value3 }]}>Water: {progressValues.value3}%</Text>
      </View>
    </View>
  );
};

const props = {
  activeStrokeWidth: 30,
  inActiveStrokeWidth: 30,
  inActiveStrokeOpacity: 0.2,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    width: '100%',
  },
  keyText: {
    marginHorizontal: 5,
    fontSize: 18,
  },
});

export default CircularProgressComponent;
