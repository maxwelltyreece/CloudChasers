import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * Stats is a component that renders a 'Welcome to the Stats!' message in the center of the screen.
 * It uses styles from its own StyleSheet.
 *
 * @returns {React.Element} The rendered stats screen.
 */
const Stats = () => (
  <View style={styles.container}>
    <Text>Welcome to the Stats!</Text>
  </View>
);

export default Stats;