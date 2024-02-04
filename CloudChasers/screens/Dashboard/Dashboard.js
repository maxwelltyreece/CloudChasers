
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
import { WelcomeBar } from '../../../components/Dashboard/WelcomeBar.js';
// import WelcomeBar from '../../../components/Dashboard/WelcomeBar';
import { PastWeekLogs } from '../../../components/Dashboard/PastWeekLogs.js';
import { CurrentStreak } from '../../../components/Dashboard/CurrentStreak.js';



// Fake database
const fakeDB = {
  recentMeals: [
    { id: 1, name: 'Breakfast Burrito', timestamp: new Date().setDate(new Date().getDate() - 1) },
    { id: 2, name: 'Chicken Salad', timestamp: new Date().setDate(new Date().getDate() - 2) },
  ],
  currentStreak: 5, // Example streak
};


// Dashboard screen
const Dashboard = () => {
  const [meals, setMeals] = useState(fakeDB.recentMeals);
  const [streak, setStreak] = useState(fakeDB.currentStreak);

  return (
    <ScrollView contentContainerStyle={dashboardStyles.container}>
      <View style={dashboardStyles.welcomeContainer}>
        <WelcomeBar name="Lorenzo"/> {/* Replace with actual user name */}
      </View>
      <View style={dashboardStyles.pastWeekContainer}>
        <PastWeekLogs meals={meals} />
      </View>
      <View style={dashboardStyles.currentStreakContainer}>
        <CurrentStreak streak={streak} />
      </View>
      
      {/* add more components... */}

    </ScrollView>
  );
};

export default Dashboard;








