import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const WelcomeBar = ({ name }) => (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeText}>Today's Statistics</Text>
    </View>
);


const styles = StyleSheet.create({
   welcomeContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5, 
    borderRadius: 15,
    padding: 10,
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#333',
  },

});

export default WelcomeBar;
