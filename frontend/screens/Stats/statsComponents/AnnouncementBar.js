import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const messages = {
  good: [
    'Doing great this week, keep it up!',
    'Fantastic progress, stay on track!',
    'Impressive streak, you’re doing amazing!',
  ],
  great: [
    'Keep the momentum going, great job!',
    'Your dedication is inspiring, well done!',
    'Remarkable effort, keep pushing forward!',
  ],
  outstanding: [
    'Outstanding work, let’s keep the streak alive!',
    'Sky is the limit, and you’re breaking through!',
    'You’re on fire, keep up the incredible work!',
  ],
};

const AnnouncementBar = ({ streak, progressData }) => {
  const averageProgress = progressData.data.reduce((acc, curr) => acc + curr, 0) / progressData.data.length;

  let progressLevel;
  if (averageProgress < 0.5) {
    progressLevel = 'good';
  } else if (averageProgress < 0.8) {
    progressLevel = 'great';
  } else {
    progressLevel = 'outstanding';
  }

  // Function to select a random message based on progress
  const getMessage = (progressLevel) => {
    const index = Math.floor(Math.random() * messages[progressLevel].length);
    return messages[progressLevel][index];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{getMessage(progressLevel)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EC6641',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    width: '95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default AnnouncementBar;