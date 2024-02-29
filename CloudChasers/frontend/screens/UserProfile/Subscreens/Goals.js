import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../../../styles/global';

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		flex: 1,
		alignItems: 'center',
	},
});

/**
 * Goals is a screen component designed for displaying and managing the users goals.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered Goals screen.
 */
function Goals() {
	return (
		<View style={styles.container}>
			<Text style={globalStyles.medium}>Placeholder for Goals</Text>
		</View>
	);
}

export default Goals;