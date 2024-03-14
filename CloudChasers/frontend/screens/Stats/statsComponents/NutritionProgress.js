import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NutritionProgress = ({ label, value, maxValue = 100, backgroundColor = '#e0e0e0', progressColor = '#03A9F4', height = 20 }) => {
  const progressWidth = (value / maxValue) * 100 + '%';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.progressBarBackground, { backgroundColor, height }]}>
        <View style={[styles.progressBar, { backgroundColor: progressColor, width: progressWidth, height }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '85%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Montserrat_700Bold',
  },
  progressBarBackground: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    borderRadius: 10,
  },
});

export default NutritionProgress;
