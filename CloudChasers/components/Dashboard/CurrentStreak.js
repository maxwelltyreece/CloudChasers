// React Imports
import React from 'react';
import { View, Text } from 'react-native';

// Style Imports
import dashboardStyles from '../../styles/DashboardStyles';

const CurrentStreak = ({ streak }) => (
    <View style={dashboardStyles.streakContainer}>
      <Text style={dashboardStyles.streakText}>Current Streak:</Text>
      <Text style={dashboardStyles.streakText}>{streak} days</Text>
    </View>
);

export default CurrentStreak;
