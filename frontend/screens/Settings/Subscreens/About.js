import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: '7%',

	},
	aboutContainer: {
		paddingVertical: 22, 
		paddingHorizontal: 32,
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: 'white',
		width: '90%',
		height: 'auto',
		borderRadius: 12,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	text: {
		fontFamily: 'Montserrat_600SemiBold',
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
		marginVertical: 10,
		color: '#333',
	},
	upperText: {
		fontFamily: 'Montserrat_600SemiBold',
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
		marginTop: 10,
		color: '#333',
	},
	lowerText: {
		fontFamily: 'Montserrat_600SemiBold',
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 10,
		color: '#333',
	},
	specialTitleText: {
		fontFamily: 'Montserrat_800ExtraBold',
		fontSize: 22,
		textAlign: 'center',
		marginVertical: 10,
		color: '#FF815E',
	},
	specialText: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
		textAlign: 'center',
		marginVertical: 10,
		color: '#FF815E',
	},
});


/**
 * About is a screen component designed for displaying information about the app.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered About screen.
 */
function About() {
	return (
		<View style={styles.container}>
			<View style={styles.aboutContainer}>
				<Text style={styles.specialTitleText}>Welcome to Gobl!</Text>
				<Text style={styles.text}>You&apos;re officially a Gobler, Congrats!</Text>
				<Text style={styles.text}>Gobl is a Food Logger app with the freedom to make it what you want.</Text>
				<Text style={styles.upperText}>Want to simply visualize your daily nutrient stats? </Text>
				<Text style={styles.lowerText}>Perfect! The Stats Page is for you.</Text>
				<Text style={styles.upperText}>Want to track your recipes and ingredients?</Text>
				<Text style={styles.lowerText}>Great! The Recipes Page is for you.</Text>
				<Text style={styles.upperText}>Want to explore different types of foodie communities?</Text>
				<Text style={styles.lowerText}> Fantastic! The Groups Page is for you.</Text>
				<Text style={styles.upperText}>Want to do all of the above?</Text>
				<Text style={styles.lowerText}> Amazing! Gobl is for you.</Text>
				<Text style={styles.text}>We hope you enjoy using it as much as we enjoyed making it.</Text>
				<Text style={styles.specialText}>Happy Gobling!</Text>
				<Text style={styles.text}>- Sincerely, The Gobl Team</Text>
			</View>
		</View>
	);
}


export default About;
