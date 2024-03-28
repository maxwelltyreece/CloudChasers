import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

/**
 * About is a screen component designed for displaying information about the app and welcoming the user.
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
