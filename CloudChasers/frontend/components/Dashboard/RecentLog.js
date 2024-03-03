// React Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	// -------Recent Meal Log-------//
	recentLogContainer: {
		// backgroundColor: '#EC6641',
		backgroundColor: '#FF815E',
		justifyContent: 'flex-start',
		alignContent: 'center',
		borderRadius: 15,
		// marginLeft: 5,
		// marginRight: 10,
		left: '1%',
		padding: 8,
		width: '98%',
		height: '100%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	recentLogTitleContainer: {
		// backgroundColor: '#EC6641',
		backgroundColor: '#FF815E',
		padding: 7,
	},
	innerRecentLogContainer: {
		backgroundColor: '#F0F0F0',
		borderRadius: 8,
		padding: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	recentLogTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	recentLogDatetimeText: {
		fontSize: 12,
		fontWeight: 'medium',
	},
	recentLogMealTypeText: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	logInfoText: {
		fontSize: 15,
		fontWeight: 600,
	},

});

function RecentLog() {
	return (
		<View style={styles.recentLogContainer}>
			<View style={styles.recentLogTitleContainer}>
				<Text style={styles.recentLogTitle}>Last Log:</Text>
			</View>
			<View style={styles.innerRecentLogContainer}>
				<Text style={styles.recentLogDatetimeText}>06/02/2024, 14:26</Text>
				<Text style={styles.recentLogMealTypeText}>Lunch</Text>
				<Text style={styles.logInfoText}>Calories: 500 kcal</Text>
				<Text style={styles.logInfoText}>Protein: 30g</Text>
				<Text style={styles.logInfoText}>Carbs: 60g</Text>
				<Text style={styles.logInfoText}>Fat: 20g</Text>
				<Text style={styles.logInfoText}>Fiber: 5g</Text>
				<Text style={styles.logInfoText}>Water: 1000ml</Text>
			</View>
		</View>
	);
}

export default RecentLog;
