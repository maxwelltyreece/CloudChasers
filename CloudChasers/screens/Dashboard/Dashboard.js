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
 * Dashboard is a component that renders a welcome message in the center of the screen.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered screen.
 */
const Dashboard = () => (
  <View style={[globalStyles.container, styles.container]}>
    <Text style={globalStyles.globalFont}>Welcome to the Dashboard!</Text>
  </View>
);

export default Dashboard;