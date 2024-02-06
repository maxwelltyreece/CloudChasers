// React Imports
import React from 'react';
import { View, Text } from 'react-native';

// Style Imports
import dashboardStyles from '../../styles/DashboardStyles';

const RecentMealLog = () => (
    <View style={dashboardStyles.recentLogContainer}>
      <View style={dashboardStyles.recentLogTitleContainer}>
        <Text style={dashboardStyles.recentLogTitle}>Last Meal Logged:</Text>
      </View>
      <View style={dashboardStyles.innerRecentLogContainer}>
        <Text style={dashboardStyles.recentLogDatetimeText}>06/02/2024, 14:26</Text>
        <Text style={dashboardStyles.recentLogMealTypeText}>Lunch</Text>
      </View>
    </View>
);

export default RecentMealLog;
