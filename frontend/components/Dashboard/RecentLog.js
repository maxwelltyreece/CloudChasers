// React Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CurrentStreak from './CurrentStreak';

const styles = StyleSheet.create({
	// -------Recent Meal Log-------//
	recentLogContainer: {
		// // backgroundColor: '#EC6641',
		// backgroundColor: '#FF815E',
		// justifyContent: 'flex-start',
		// alignContent: 'center',
		// borderRadius: 15,
		// // marginLeft: 5,
		// // marginRight: 10,
		// left: '1%',
		// padding: 8,
		// width: '98%',
		// height: '100%',
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 1 },
		// shadowOpacity: 0.22,
		// shadowRadius: 2.22,
		// elevation: 3,
		alignItems: 'flex-start',
		justifyContent: 'center',
		padding: 5,
		backgroundColor: 'white',
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		// top: '5%',
		height: '95%',
		width: '94%',
		right: '1.5%',
	},
	recentLogTitleContainer: {
		// backgroundColor: '#EC6641',
		// backgroundColor: '#FF815E',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		flexDirection: 'row',
		paddingLeft	: 8,
		paddingBottom: 12,
		width: '100%',
		height: '40%',
	},
	innerRecentLogContainer: {
		// backgroundColor: '#F0F0F0',
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: '#F5F5F5',
		borderRadius: 8,
		padding: 8,
		width: '92%',
		height: '50%',
		alignSelf: 'center',
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
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	recentLogMealTypeText: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	logInfoText: {
		fontSize: 14,
		fontWeight: '500',
	},
	logInfoMeasurementText: {
		// marginTop: 5,
		fontSize: 14,
		fontWeight: '500',
	},
});

function RecentLog() {
	return (
		<View style={styles.recentLogContainer}>
			<View style={styles.recentLogTitleContainer}>
				<Text style={styles.recentLogTitle}>Last Log:</Text>

				<CurrentStreak streak={5} />

			</View>
			<View style={styles.innerRecentLogContainer}>
				<Text style={styles.recentLogDatetimeText}>06/02/2024, 14:26</Text>
				{/* <Text style={styles.recentLogMealTypeText}>Lunch</Text> */}
				<Text style={styles.logInfoText}>Calories: 
					<Text style={styles.logInfoMeasurementText}> </Text>500 kcal
				</Text>
				{/* <Text style={styles.logInfoText}>Protein: 30g</Text>
				<Text style={styles.logInfoText}>Carbs: 60g</Text>
				<Text style={styles.logInfoText}>Fat: 20g</Text>
				<Text style={styles.logInfoText}>Fiber: 5g</Text>
				<Text style={styles.logInfoText}>Water: 1000ml</Text> */}
			</View>
		</View>
	);
}

export default RecentLog;
