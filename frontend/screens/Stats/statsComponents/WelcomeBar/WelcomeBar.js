import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

/**
 * WelcomeBar component
 * This component displays a welcome message with today's statistics.
 */
const WelcomeBar = () => (
	<View style={styles.welcomeContainer}>
		<Text style={styles.title}>Today&apos;s Statistics</Text>
	</View>
);
export default WelcomeBar;