// React Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	// -------Current Streak-------//
	// currentStreakContainer: {
	// 	flex: 1,
	// 	// backgroundColor: '#EC6641',
	// 	backgroundColor: 'white',
	// 	justifyContent: 'center',
	// 	alignContent: 'center',
	// 	borderRadius: 15,
	// 	padding: 20,
	// 	// marginLeft: 10,
	// 	// marginRight: 5,
	// 	right: '1%',
	// 	marginBottom: '7%',
	// 	width: '98%',
	// 	shadowColor: '#000',
	// 	shadowOffset: { width: 0, height: 1 },
	// 	shadowOpacity: 0.22,
	// 	shadowRadius: 2.22,
	// 	elevation: 3,
	// },
	// streakTextTitle: {
	// 	fontSize: 18,
	// 	fontWeight: 'bold',
	// },
	// currentStreakText: {
	// 	fontSize: 20,
	// 	fontWeight: 'medium',
	// 	marginTop: 5,
	// },
	currentStreakContainer: {
		// Make the container smaller and badge-like
		// paddingVertical: '6.5%',
		// paddingHorizontal: '10%',
		width: '25%',
		height: '75%',
		backgroundColor: '#FF4500', // A fiery color
		borderRadius: 15, // Rounded edges
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.3,
		shadowRadius: 2,
		right: '14%',
		bottom: '9%',
	},
	streakText: {
		color: 'white', // Text color that stands out
		fontSize: 18,
		fontWeight: 'bold',
	},
	// Optional: Add styles for a flame icon if using an image
});

function CurrentStreak({ streak }) {
	return (
		<View style={styles.currentStreakContainer}>
			{/* Optional: Include a flame icon with <Image /> if you have an asset */}
			<Text style={styles.streakText}>
				{streak}
			</Text>
		</View>
	);
  }
  

CurrentStreak.propTypes = {
	streak: PropTypes.number.isRequired,
};

export default CurrentStreak;
