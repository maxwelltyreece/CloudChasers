// React Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// -------Weclome Bar-------//
	welcomeContainer: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		borderRadius: 15,
		paddingTop: 20,
		padding: 5,
	},
	welcomeText: {
		fontSize: 35,
		fontWeight: 'bold',
		color: '#333',
		left: '4%',
		// fontFamily: 'Montserrat_700Bold',
	},

});

function WelcomeBar({ name }) {
	return (
		<View style={styles.welcomeContainer}>
			<Text style={styles.welcomeText}>
				Welcome,
				{name}
				!
			</Text>
		</View>
	);
}

export default WelcomeBar;
