// LogoutButton.js
import React, { useRef } from 'react';
import {
	Text, Animated, TouchableWithoutFeedback,
} from 'react-native';
import globalStyles from '../../../styles/global';
import PropTypes from 'prop-types';
import { styles } from './styles';

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
					outputRange: [0, 3],
				}),
			},
		],
		shadowOpacity: buttonY.interpolate({
			inputRange: [0, 1],
			outputRange: [0.2, 0],
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
LogoutButton.propTypes = {
	onPress: PropTypes.func.isRequired,
};