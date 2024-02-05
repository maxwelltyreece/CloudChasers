import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
* Stats is a screen component designed for displaying user statistics.
* It uses styles from both the global styles and its own styles.
*
* @returns {React.Element} The rendered Stats screen.
*/
const Stats = () => (
  <View style={styles.container}>
    <Text style={globalStyles.medium}>Placeholder for stats</Text>
  </View>
);

export default Stats;