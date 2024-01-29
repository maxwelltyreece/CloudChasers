import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserProfileButton from '../../components/SettingsButton';
import globalStyles from '../../styles/global';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Dashboard = () => (
  <View style={[globalStyles.container, styles.container]}>
    <Text style={globalStyles.globalFont}>Welcome to the Dashboard!</Text>
  </View>
);

export default Dashboard;