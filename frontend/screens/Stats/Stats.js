import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
// import Swiper from 'react-native-swiper';
// import { StatsContext } from '../../contexts/StatsContext.js';
// import { fetchStats } from '../../services/StatsService.js';

// import globalStyles from '../../styles/global';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LocalIP } from '../../screens/IPIndex';

// import AnnouncementBar from './statsComponents/AnnouncementBar';
import WelcomeBar from './statsComponents/WelcomeBar';
// import ProgressChartComponent from './statsComponents/ProgressChartComponent';
// import GoalsBarChart from './statsComponents/GoalsBarChart';
// import CommunityPanel from './statsComponents/CommunityPanel';
import CircularProgressComponent from './statsComponents/CircularProgress.js';

const Stats = () => {

  // const { stats, setStats } = useContext(StatsContext);

  // useEffect(() => {
  //   const getStats = async () => {
  //     const data = await fetchStats();
  //     setStats(data);
  //   };

  //   getStats();
  // }, []);

  // Dummy Data 
  // const weeklyIntake = [
  //   { day: 'Mon', protein: 20, carbs: 50, calories: 1200 },
  //   { day: 'Tue', protein: 25, carbs: 45, calories: 1900 },
  //   { day: 'Wed', protein: 30, carbs: 35, calories: 1000 },
  //   { day: 'Thu', protein: 22, carbs: 48, calories: 1200 },
  //   { day: 'Fri', protein: 27, carbs: 40, calories: 3000 },
  //   { day: 'Sat', protein: 29, carbs: 33, calories: 3000 },
  //   { day: 'Sun', protein: 18, carbs: 55, calories: 1000 },
  // ];

  // Dummy goals for protein, carbs, and calories
  // const goals = {
  //   protein: 100, 
  //   carbs: 60, 
  //   calories: 1200 
  // };
  // const prepareChartData = (nutrient) => {
  //   return weeklyIntake.map(day => ({
  //     day: day.day,
  //     amount: day[nutrient],
  //   }));
  // };

  return (
    <SafeAreaView style={styles.statsContainer}>
      
      <View style={styles.statsHeader}>
        <WelcomeBar name="Emily" />
      </View>
      
      {/* <View style={styles.statsHeader}>
        <AnnouncementBar streak={3} progressData={{data: [0.4, 0.6, 0.8]}} />
      </View> */}
      
      <View style={styles.ringComp}>
        <CircularProgressComponent value={75} maxValue={100} />
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
  statsHeader: {
    // justifyContent: 'flex-start',
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