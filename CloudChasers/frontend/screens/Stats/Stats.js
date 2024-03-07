import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import globalStyles from '../../styles/global';

import AnnouncementBar from './statsComponents/AnnouncementBar';
import WelcomeBar from './statsComponents/WelcomeBar';
import ProgressChartComponent from './statsComponents/ProgressChartComponent';
import GoalsBarChart from './statsComponents/GoalsBarChart';
import CommunityPanel from './statsComponents/CommunityPanel';




const Stats = () => {
  // Dummy Data 
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
  const goals = {
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
      <View style={styles.statsHeader}>
        <AnnouncementBar streak={3} progressData={{data: [0.4, 0.6, 0.8]}} />
      </View>

      <View style={{...styles.container, }}>
        <Text style={globalStyles.medium}></Text>
        <ProgressChartComponent/>
      </View>

      <View style={styles.swiperContainer}>
        <Swiper showsButtons loop={false}>
          {/* Protein Slide */}
          <View style={styles.slide}>
            <GoalsBarChart weeklyIntake={prepareChartData('protein')} goal={goals.protein} nutrient="Protein" />
          </View>

          {/* Carbs Slide */}
          <View style={styles.slide}>
            <GoalsBarChart weeklyIntake={prepareChartData('carbs')} goal={goals.carbs} nutrient="Carbs" />
          </View>

          {/* Calories Slide */}
          <View style={styles.slide}>
            <GoalsBarChart style={styles.barChart} barChart weeklyIntake={prepareChartData('calories')} goal={goals.calories} nutrient="Calories" />
          </View>
        </Swiper>
      </View>


      <View style={styles.communityPanel}>
        <CommunityPanel/>
      </View>
    </SafeAreaView>
  );
}; 



const styles = StyleSheet.create({
  statsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    backgroundColor: '#F9D3C8'
  },
  statsHeader: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  communityPanel: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingBottom : 20,
  },
  swiperContainer: {
    backgroundColor: '#EC6641',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '95%',
    height: 220,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Stats; 

