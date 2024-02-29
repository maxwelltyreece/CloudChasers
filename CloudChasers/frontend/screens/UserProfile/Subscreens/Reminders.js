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
 * Reminders is a screen component designed for displaying and managing the users created reminders.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered Reminders screen.
 */
function Reminders() {
	return (
		<View style={styles.container}>
			<Text style={globalStyles.medium}>Placeholder for Reminders</Text>
		</View>
	);
}

export default Reminders;
