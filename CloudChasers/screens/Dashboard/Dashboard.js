import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

// Dashboard related imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

// Component imports
import { WelcomeBar, NotificationBadge, PastWeekLogs, CurrentStreak, RecentLog, LearnMore, CommunityStatus, CurrentGoalProgress } from '../../components/Dashboard';

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
}
//   return (
//     <SafeAreaView style={styles.dashboardContainer}>
//       <View style={styles.dashboardHeader}>
//         <WelcomeBar name="Lorenzo" />
//         <View style={styles.notificationBadgeContainer}>
//           <NotificationBadge count={3} />
//         </View>
//       </View>

//       <PastWeekLogs meals={meals} />

//       <View style={styles.middleDashboardContainer}>
//         <View style={styles.leftComponentContainer}>
//           <CurrentStreak streak={streak} />
//           <LearnMore />
//         </View>
      
//         <View style={styles.rightComponentContainer}>
//           <RecentLog />
//         </View>
//       </View>

//       <CommunityStatus />

//       <CurrentGoalProgress goal={120} current={80} />


//     </SafeAreaView>
//   );
// };

const styles = StyleSheet.create({
  dashboardHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  notificationBadgeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  dashboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    flexWrap: 'wrap',
    backgroundColor: '#F9D3C8',
  },
  middleDashboardContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    marginVertical: 10,
    backgroundColor: '#F9D3C8',
  },
  leftComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomDashboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    backgroundColor: '#F12A2A',
  },
});

export default Dashboard;