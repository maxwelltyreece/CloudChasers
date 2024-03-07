import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const ProgressChartComponent = () => {
  const data = {
    labels: ["Protein", "Calories", "Carbs"],
    data: [0.4, 0.6, 0.8]
  };

  return (
    <View>
    <ProgressChart
      data={data}
      width={Dimensions.get('window').width}
      height={200}
      strokeWidth={16}
      radius={32}
      chartConfig={{
        backgroundColor: '#F9D3C8', 
        backgroundGradientFrom: '#F9D3C8', 
        backgroundGradientTo: '#F9D3C8', 
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, 
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      }}
      hideLegend={false}
    />
</View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

export default ProgressChartComponent;
