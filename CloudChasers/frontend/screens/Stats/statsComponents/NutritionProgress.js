import React, { useEffect, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


const NutritionProgress = ({ label, value, maxValue = 100, unit = 'g', backgroundColor = '#F0F0F0', progressColor = '#FF815E', height = 20 }) => {
  const animation = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(animation, {
          toValue: value,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      });
    }, [value])
  );

  const progressWidth = animation.interpolate({
    inputRange: [0, maxValue],
    outputRange: ['0%', '100%'],
  });

  const valueText = `${value}/${maxValue}${unit}`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.progressContainer, {height}]}>
        <View style={[styles.progressBarBackground, { backgroundColor, borderRadius: 32 }]}>
          <Animated.View style={[styles.progressBar, { backgroundColor: progressColor, width: progressWidth, borderRadius: 32 }]} />
        </View>
      </View>
      <Text style={styles.valueText}>{valueText}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    width: '90%',
    paddingHorizontal: 18,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    marginTop: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 32,
    overflow: 'hidden',
    width: '100%',
    height: 20,
  },
  progressBarBackground: {
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: 20,
  },
  valueText: {
    position: 'absolute',
    padding: 8,
    right: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NutritionProgress;




