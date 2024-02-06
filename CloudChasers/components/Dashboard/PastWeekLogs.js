// React Imports
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

//Style Imports
import dashboardStyles from '../../styles/DashboardStyles';


const getLastSevenDays = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      dayName: days[date.getDay()],
      logged: false, // Placeholder value
    };
  }).reverse();
};

const DailyCheckmark = ({ logged, dayName }) => (
  <View style={dashboardStyles.dayContainer}>
    <Text style={dashboardStyles.dayName}>{dayName}</Text>
    <View style={dashboardStyles.dailyCheckmarkContainer}>
      <Text>{logged ? '✅' : '❌'}</Text>
    </View>
  </View>
);

export const PastWeekLogs = ({ meals }) => {
  const [lastSevenDays, setLastSevenDays] = useState(getLastSevenDays());

  useEffect(() => {
    // Implement logic to determine if meals were logged each day
    const updatedDays = lastSevenDays.map(day => ({
      ...day,
      logged: Math.random() < 0.5 // This should be replaced with actual logic
    }));
    setLastSevenDays(updatedDays);
  }, [meals]);

  return (
    <View style={dashboardStyles.pastWeekContainer}>
      <Text style={dashboardStyles.weeklyLogTitle}>Weekly Log:</Text>
      <View style={dashboardStyles.weeklyLogDaysContainer}>
        {lastSevenDays.map((day, index) => (
          <DailyCheckmark key={index} logged={day.logged} dayName={day.dayName} />
        ))}
      </View>
    </View>
  );
};

export default PastWeekLogs;