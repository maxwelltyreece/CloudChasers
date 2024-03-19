import React, { useState } from 'react';
import { View, Text, Dimensions, Alert, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'blue',
    height: 100,
    width: '100%',
  },
  header: {
    textAlign: 'center',
    marginVertical: 1,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  chart: {
    flex: 1,
    marginVertical: 10,
    backgroundColor: 'white',
  },
});

const screenWidth = Dimensions.get("window").width;

// eslint-disable-next-line no-unused-vars
const GoalsBarChart = ({ weeklyIntake, goal, nutrient }) => {
  // eslint-disable-next-line no-unused-vars
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
  };

  const data = {
    labels: weeklyIntake.map(d => d.day),
    datasets: [
      {
        data: weeklyIntake.map(d => d.amount),
        color: () => `rgba(127, 255, 212, 1)`,
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
        height={150}
        width={screenWidth}
        yAxisSuffix={yAxisSuffix}
        chartConfig={chartConfig}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        fromZero={true}
        showBarTops={true}
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


export default GoalsBarChart;

GoalsBarChart.propTypes = {
  weeklyIntake: PropTypes.array.isRequired,
  goal: PropTypes.number.isRequired,
  nutrient: PropTypes.string.isRequired,
};


