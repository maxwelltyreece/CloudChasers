// React Imports
import React from 'react';
import { View, Text } from 'react-native';

// Style Imports
import { dashboardStyles } from '../../styles'; // Adjust the path as necessary

const WelcomeBar = ({ name }) => (
    <View style={dashboardStyles.welcomeContainer}> {/* Make sure you define welcomeContainer in your styles */}
      <Text style={dashboardStyles.welcomeText}>Welcome, {name}!</Text>
    </View>
);

export default WelcomeBar;
