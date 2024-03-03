// React Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// -------Current Streak-------//
	currentStreakContainer: {
		flex: 1,
		// backgroundColor: '#EC6641',
		backgroundColor: 'white',
		justifyContent: 'center',
		alignContent: 'center',
		borderRadius: 15,
		padding: 20,
		// marginLeft: 10,
		// marginRight: 5,
		right: '1%',
		marginBottom: '7%',
		width: '98%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	streakTextTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	currentStreakText: {
		fontSize: 20,
		fontWeight: 'medium',
		marginTop: 5,
	},

});

function CurrentStreak({ streak }) {
	return (
		<View style={styles.currentStreakContainer}>
			<Text style={styles.streakTextTitle}>Current Streak:</Text>
			<Text style={styles.currentStreakText}>
				{streak}
				{' '}
  days
			</Text>
		</View>
	);
}

export default CurrentStreak;
