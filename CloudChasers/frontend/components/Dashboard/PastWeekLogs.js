// React Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const getLastSevenDays = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      dayName: days[date.getDay()],
      logged: false,
    };
  }).reverse();
};

const DailyCheckmark = ({ logged, dayName }) => (
  <View style={styles.dayContainer}>
    <Text style={styles.dayName}>{dayName}</Text>
    <View style={styles.dailyCheckmarkContainer}>
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
    <View style={styles.wholePastLogsContainer}>
      <Text style={styles.weeklyLogTitle}>Weekly Log:</Text>
      <View style={styles.weekContainer}>
        <View style={styles.weeklyLogDaysContainer}>
          {lastSevenDays.map((day, index) => (
            <DailyCheckmark key={index} logged={day.logged} dayName={day.dayName} />
          ))}
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  wholePastLogsContainer: {
    padding: 20,
    backgroundColor: '#EC6641', 
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 15,
    width: '95%'
  },
  weeklyLogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    padding: 8,

  },
  weeklyLogDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
    padding: 10,
  },
  dayName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  dailyCheckmarkContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});


export default PastWeekLogs;