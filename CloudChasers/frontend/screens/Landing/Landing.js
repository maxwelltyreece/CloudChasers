import React from 'react';
import {
	View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import globalStyles from '../../styles/global';

const styles = StyleSheet.create({
	header: {
		fontSize: 32,
		marginBottom: 10,
		textAlign: 'center',
		color: '#FF815E', // This makes the title the same color as the buttons
	},
	description: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: 'center',
	},
	container: {
		padding: 20,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 70,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		borderRadius: 25,
		paddingVertical: 10,
		paddingHorizontal: 20,
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50, // Set a fixed height
		width: 160, // Set a fixed width
	},
	loginButton: {
		backgroundColor: '#FF815E', // This sets the color of the Login button
	},
	registerButton: {
		backgroundColor: '#A9A9A9', // This sets the color of the Register button
	},
	buttonText: {
		color: '#fff',
	},
});

function Landing({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={[styles.header, globalStyles.bold]}>Nourish Your Joy, Log Your Goodness</Text>
			<Text style={[styles.description, globalStyles.medium]}>
                Discover wellness through simple logging. Your journey,
                your goodness, one bite at a time.
			</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[styles.button, styles.loginButton]}
					onPress={() => navigation.navigate('Login')}
				>
					<Text style={[styles.buttonText, globalStyles.bold]}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.registerButton]}
					onPress={() => navigation.navigate('Register')}
				>
					<Text style={[styles.buttonText, globalStyles.bold]}>Register</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

export default Landing;
