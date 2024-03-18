import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useStats } from '../../contexts/StatsContext';
import { useGoals } from '../../contexts/GoalsContext';

import globalStyles from '../../styles/global';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../../screens/IPIndex';
import WelcomeBar from './statsComponents/WelcomeBar';
import CircularProgressComponent from './statsComponents/CircularProgress.js';
import NutritionProgress from './statsComponents/NutritionProgress.js';



const Stats = () => {

  //const { todayStats, updateTodayStats } = useStats();
  //const { streaks, dailyCaloricIntake, dailyWaterIntake, dailyProteinIntake, dailyCarbIntake, dailyFatIntake, dailySugarIntake, dailySodiumIntake, dailyFibreIntake } = useStats();
  
  // const { todaysStats, updateTodaysStats } = useStats();
  // //const { goals, fetchGoals } = useGoals();

  // console.log('todaysStats:', todaysStats);
  // //console.log('goals:', goals);

  // console.log('streaks:', streaks);
  // console.log('dailyCaloricIntake:', dailyCaloricIntake);

  // useEffect(() => {
  //   const getStats = async () => {
  //     const data = await fetchStats();
  //     setStats(data);
  //   };

  //   getStats();
  // }, []);

  // Dummy Data
  const nutrientValues = {
    sugar: 25, // Example value
    fat: 30, // Example value
    carbs: 50, // Example value
    sodium: 10, // Example value
  };

  const weeklyIntake = [
    { day: 'Mon', protein: 20, carbs: 50, calories: 1200 },
    { day: 'Tue', protein: 25, carbs: 45, calories: 1900 },
    { day: 'Wed', protein: 30, carbs: 35, calories: 1000 },
    { day: 'Thu', protein: 22, carbs: 48, calories: 1200 },
    { day: 'Fri', protein: 27, carbs: 40, calories: 3000 },
    { day: 'Sat', protein: 29, carbs: 33, calories: 3000 },
    { day: 'Sun', protein: 18, carbs: 55, calories: 1000 },
  ];

  // Dummy goals for protein, carbs, and calories
  const macrogoals = {
    protein: 100, 
    carbs: 60, 
    calories: 1200 
  };
  
  const prepareChartData = (nutrient) => {
    return weeklyIntake.map(day => ({
      day: day.day,
      amount: day[nutrient],
    }));
  };

  return (
    <SafeAreaView style={styles.statsContainer}>
      
      <View style={styles.statsHeader}>
        <WelcomeBar name="Emily" />
      </View>
      
      <View style={styles.ringComp}>
        <CircularProgressComponent value={75} maxValue={100}  />
       
      </View>

      <View style={styles.progressBarContainer}>
        <NutritionProgress label="Carbs" value={nutrientValues.carbs} maxValue={100}  />
        <NutritionProgress label="Sugar" value={nutrientValues.sugar} maxValue={100}  />
        <NutritionProgress label="Fat" value={nutrientValues.fat} maxValue={100} />
        <NutritionProgress label="Sodium" value={nutrientValues.sodium} maxValue={100} />
      </View>
    </SafeAreaView>
  );
}; 



const styles = StyleSheet.create({
  statsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    backgroundColor: '#f2f2f2'
    
  },
  progressBarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
   
    paddingBottom:10,

  },
  statsHeader: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    
  },
  ringComp: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
 
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Stats; 