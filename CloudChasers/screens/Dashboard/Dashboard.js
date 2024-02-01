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
 * Dashboard is a screen component that renders a centered view.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered Dashboard screen.
 */
const Dashboard = () => (
  <View style={[globalStyles.container, styles.container]}>
    <Text style={globalStyles.medium}>Placeholder for dashboard</Text>
  </View>
);

export default Dashboard;