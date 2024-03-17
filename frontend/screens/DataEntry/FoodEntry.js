import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles/global';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

/**
 * DataEntry is a screen component designed for user food entry.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered DataEntry screen.
 */
function FoodEntry() {
	return (
		<View style={styles.container}>
			<Text style={globalStyles.medium}>Placeholder for Food Entry</Text>
		</View>
	);
}

export default FoodEntry;
