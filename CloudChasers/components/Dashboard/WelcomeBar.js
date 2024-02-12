// React Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const WelcomeBar = ({ name }) => (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeText}>Welcome, {name}!</Text>
    </View>
);


const styles = StyleSheet.create({
   //-------Weclome Bar-------//
   welcomeContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 15,
    padding: 20,
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#333',
    // fontFamily: 'Montserrat_700Bold',
  },

});

export default WelcomeBar;
