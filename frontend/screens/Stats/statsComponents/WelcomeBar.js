import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const WelcomeBar = () => (
    <View style={styles.welcomeContainer}>
      <Text style={styles.title}>Today&apos;s Statistics</Text>
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

  title: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 24,
		marginBottom: 10,
	}

});

export default WelcomeBar;