// React Imports
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const GoalProgressBar = ({ goal, current }) => {
  const progressPercent = Math.min((current / goal) * 100, 100);

  return (
    <View style={styles.progressBarComponentContainer}>
      
      {/* Title and Goal Info */}
      <View style={styles.topSection}>

        <Text style={styles.progressBarTitle}>Current Progress:</Text>

        <View style={styles.goalInfoSection}>

          <Text style={styles.currentGoalTitle}>(160g Protein / Day)</Text>

          <TouchableOpacity style={styles.selectGoalButton}>

            <Text style={styles.selectGoalButtonText}>Select Other Goal</Text>

          </TouchableOpacity>

        </View>

      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>

        <View style={[styles.filledProgressBar, { width: `${progressPercent}%` }]} />

      </View>

      <Text style={styles.currentProgressBarText}>{current}/{goal}</Text>

    </View>

    
  );
};

const styles = StyleSheet.create({
 //-------Goal Progress Bar-------//
 progressBarComponentContainer: {
  flex: 1,
  justifyContent: 'center',
  alignContent: 'center',
  backgroundColor: '#EC6641',
  padding: 20,
  marginBottom: 50,
  borderRadius: 15,
  width: '95%',
  height: 'auto',
  marginTop: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
  borderRadius: 15,

},
topSection: {
  flexDirection: 'row',
  justifyContent: 'sapce-between',
  alignItems: 'flex-start',
  marginTop: 4,
},
goalInfoSection: {
  alignItems: 'space-between',
  left: '100%',
},
progressBarTitle: {
  fontSize: 20,
  fontWeight: 'bold',
},
currentGoalTitle: {
  fontSize: 15,
  fontWeight: '600',
  left: 15,
},
selectGoalButton: {
  backgroundColor: '#FF815E',
  marginTop: 5,
  paddingVertical: 3,
  paddingHorizontal: 8,
  borderRadius: 10,
  left: 15,
},
selectGoalButtonText: {
  fontSize: 12,
},
progressBarContainer: {
  flexDirection: 'row',
  marginTop: 15,
  backgroundColor: '#F0F0F0',
  borderRadius: 32,
  overflow: 'hidden',
},
filledProgressBar: {
  backgroundColor: '#25A6EE',
  height: 20,
  borderRadius: 32,
},
currentProgressBarText: {
  fontSize: 15,
  fontWeight: 600,
  textAlign: 'left',
  marginTop: 5,
  paddingLeft: 8,
},
});

export default GoalProgressBar;

