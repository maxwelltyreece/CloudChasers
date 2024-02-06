
// React related imports
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';

// Dashboard related imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

// Style related imports
import globalStyles from '../../styles/global';
import dashboardStyles from '../../styles/DashboardStyles';



// Component imports
// import WelcomeBar from '../../components/Dashboard/WelcomeBar';
// import { PastWeekLogs } from '../../../components/Dashboard/PastWeekLogs.js';
import { WelcomeBar, PastWeekLogs, CurrentStreak } from '../../components/Dashboard';



// Fake database
const fakeDB = {
  recentMeals: [
    { id: 1, name: 'Breakfast Burrito', timestamp: new Date().setDate(new Date().getDate() - 1) },
    { id: 2, name: 'Chicken Salad', timestamp: new Date().setDate(new Date().getDate() - 2) },
  ],
  currentStreak: 5, // Example streak
};


// const CurrentStreak = ({ streak }) => (
//   <View style={dashboardStyles.currentStreakContainer}>
//     <Text style={dashboardStyles.streakText}>Current Streak:</Text>
//     <Text style={dashboardStyles.streakText}>{streak} days</Text>
//   </View>
// );


// Dashboard screen
const Dashboard = () => {
  const [meals, setMeals] = useState(fakeDB.recentMeals);
  const [streak, setStreak] = useState(fakeDB.currentStreak);

  return (
    <ScrollView style={dashboardStyles.container}>
    
    <View>
      <WelcomeBar name="Lorenzo" />
    </View>
    <View>
      <PastWeekLogs meals={meals} /> 
    </View>
    <View style={dashboardStyles.componentContainer}>
      <CurrentStreak streak={streak} />
    </View>
    <View>
      
    </View>
    

    </ScrollView>
  );
};

export default Dashboard;









