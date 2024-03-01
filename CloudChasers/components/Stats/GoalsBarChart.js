import React, { useState } from 'react';
import { View, Text, Dimensions, Alert, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const GoalBarChart = ({ weeklyIntake, goal, nutrient }) => {
  const [selectedBarIndex, setSelectedBarIndex] = useState(null);

  // Function to handle bar press
  const handleBarPress = (index) => {
    setSelectedBarIndex(index);
    const amount = weeklyIntake[index].amount;
    Alert.alert(`${nutrient}: ${amount}g`);
  };


  const chartConfig = {
    backgroundColor: '#F9D3C8',
    backgroundGradientFrom: '#F9D3C8',
    backgroundGradientTo: '#F9D3C8',
    decimalPlaces: 0,
    color: () => `#007AFF`, 
    labelColor: () => `#000000`, 
    barPercentage: 0.5,
    propsForDots: {
      r: "6", 
      strokeWidth: "2",
      stroke: "#FFFFFF"
    },
  };
  
  const renderCustomGoalAnnotation = (goal) => {
    return (
      <Text style={{color: 'YourGoalColor', position: 'absolute', right: 0, top: 'CalculatedTopPositionBasedOnGoal'}}>
        Goal: {goal}
      </Text>
    );
  };

  const data = {
    labels: weeklyIntake.map(d => d.day),
    datasets: [
      {
        data: weeklyIntake.map(d => d.amount),
        color: () => `rgba(127, 255, 212, 1)`, // Color is now fully opaque
        label: nutrient
      }
    ],
  };

  const yAxisSuffix = nutrient === 'Calories' ? '' : 'g';

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Weekly Goals for {nutrient}</Text>
      <BarChart
        style={styles.chart}
        data={data}
        width={screenWidth}
        height={160}
        yAxisSuffix={yAxisSuffix}
        chartConfig={chartConfig}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        fromZero={true}
        showBarTops={false}
        showValuesOnTopOfBars={true}
        withInnerLines={false}
        yAxisInterval={1}
        barRadius={5}
        barWidth={30}
        onDataPointClick={({ index }) => handleBarPress(index)}
      />
    </View>
  );

  
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    marginVertical: 1,
    fontWeight: 'bold',
    fontSize: 20,
  },
  chart: {
    flex: 1,
    marginVertical: 10,
  },
});

export default GoalBarChart;
