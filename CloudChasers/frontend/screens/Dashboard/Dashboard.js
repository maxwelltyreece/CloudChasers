
// React related imports
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';

// Dashboard related imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

// Style related imports
import globalStyles from '../../styles/global';
import dashboardStyles from '../../styles/DashboardStyles';



// Component imports
// import WelcomeBar from '../../components/Dashboard/WelcomeBar';
// import { PastWeekLogs } from '../../../components/Dashboard/PastWeekLogs.js';
import { WelcomeBar, PastWeekLogs, CurrentStreak, RecentMealLog, LearnMore, CurrentGoalProgress} from '../../components/Dashboard';



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
  
    <SafeAreaView style={dashboardStyles.dashboardContainer}>

      <View style={dashboardStyles.dashboardHeader}>
        <WelcomeBar name="Lorenzo" />
      </View>

      <PastWeekLogs meals={meals} />

      <View style={dashboardStyles.middleDashboardContainer}>

        <View style={dashboardStyles.leftComponentContainer}>
          <CurrentStreak streak={streak} />
          <LearnMore />
        </View>
      
        <View style={dashboardStyles.rightComponentContainer}>
          <RecentMealLog />
        </View>

      </View>

      <CurrentGoalProgress goal={120} current={80} />
      
    
    </SafeAreaView>

  );
};

export default Dashboard;









