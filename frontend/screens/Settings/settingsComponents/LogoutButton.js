// LogoutButton.js
import React, { useRef } from 'react';
import {
	Text, Animated, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';
import globalStyles from '../../../styles/global';

const styles = StyleSheet.create({
	logoutButton: {
		borderRadius: 100,
		marginTop: 30,
		padding: 16,
		backgroundColor: '#FF815E', // Change this to your preferred color
		alignItems: 'center',
		alignSelf: 'center', // Add this to center the button horizontally
		width: '90%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3, // Increase the vertical offset
		},
		shadowOpacity: 0.2, // Decrease the opacity
		shadowRadius: 0, // Decrease the radius
		elevation: 1, // Decrease the elevation
	},
	logoutButtonText: {
		color: '#FFFFFF', // Change this to your preferred color
		fontSize: 18,
	},
});

function LogoutButton({ onPress }) {
	const buttonY = useRef(new Animated.Value(0)).current;

	const onPressIn = () => {
		Animated.timing(buttonY, {
			toValue: 1,
			duration: 50,
			useNativeDriver: true,
		}).start();
	};

	const onPressOut = () => {
		Animated.timing(buttonY, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true,
		}).start();
	};

	const buttonStyle = {
		transform: [
			{
				translateY: buttonY.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 3], // Adjust this to control the amount of vertical movement
				}),
			},
		],
		shadowOpacity: buttonY.interpolate({
			inputRange: [0, 1],
			outputRange: [0.2, 0], // Adjust this to control the shadow opacity
		}),
	};

	return (
		<TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
			<Animated.View style={[styles.logoutButton, buttonStyle]}>
				<Text style={[styles.logoutButtonText, globalStyles.bold]}>Logout</Text>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
}

export default LogoutButton;
