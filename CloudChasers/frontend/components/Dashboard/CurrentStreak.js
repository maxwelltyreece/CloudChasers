// React Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const CurrentStreak = ({ streak }) => (
    <View style={styles.currentStreakContainer}>
      <Text style={styles.streakTextTitle}>Current Streak:</Text>
      <Text style={styles.currentStreakText}>{streak} days</Text>
    </View>
);

const styles = StyleSheet.create({
  //-------Current Streak-------//
  currentStreakContainer: {
    flex: 1,
    backgroundColor: '#EC6641',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 15,
    padding: 20,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 10,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 15,
  },
  streakTextTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // fontFamily: 'Montserrat_700Bold',
  },
  currentStreakText: {  
      fontSize: 20,
      fontWeight: 'medium',
      // fontFamily: 'Montserrat_700Bold',
  },

});

export default CurrentStreak;
