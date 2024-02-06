// React Imports
import React from 'react';
import { View, Text } from 'react-native';

// Style Imports
import dashboardStyles from '../../styles/DashboardStyles';

const CurrentStreak = ({ streak }) => (
    <View style={dashboardStyles.currentStreakContainer}>
      <Text style={dashboardStyles.streakTextTitle}>Current Streak:</Text>
      <Text style={dashboardStyles.currentStreakText}>{streak} days</Text>
    </View>
);

export default CurrentStreak;
