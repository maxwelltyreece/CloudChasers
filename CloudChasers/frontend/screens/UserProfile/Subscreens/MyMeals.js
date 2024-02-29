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
 * My Meals is a screen component designed for displaying and managing the users created meals.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered MyMeals screen.
 */
function MyMeals() {
	return (
		<View style={styles.container}>
			<Text style={globalStyles.medium}>Placeholder for MyMeals</Text>
		</View>
	);
}

export default MyMeals;
