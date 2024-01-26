import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserProfileButton from '../../components/UserProfileButton';
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
    <UserProfileButton />
  </View>
);

export default Dashboard;