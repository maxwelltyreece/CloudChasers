// React Imports
import React from 'react';
import { View, Text } from 'react-native';

// Style Imports
import dashboardStyles from '../../styles/DashboardStyles'; // Adjust the path as necessary

const WelcomeBar = ({ name }) => (
    <View style={dashboardStyles.welcomeContainer}>
      <Text style={dashboardStyles.welcomeText}>Welcome, {name}!</Text>
    </View>
);

export default WelcomeBar;
