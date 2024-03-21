import React from 'react';
import {
	View, Text, TouchableOpacity,
} from 'react-native';
import globalStyles from '../../styles/global';
import PropTypes from 'prop-types';
import { styles } from './styles';

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

Landing.propTypes = {
	navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};