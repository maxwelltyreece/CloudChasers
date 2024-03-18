/* eslint-disable no-unused-vars */
// React Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CurrentStreak from './CurrentStreak';
import PropTypes from 'prop-types'; // Import PropTypes


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
		paddingLeft: 8,
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

function RecentLog({ streak, userLogStats }) {
	// const { lastLogDate, lastLogMealType, calories, protein, carbs, fat, fiber, water, sugar, sodium } = userLogStats;
	const {
		lastLogDate = 'N/A',
		lastLogMealType = 'N/A',
		calories = 0,
		protein = 0,
		carbs = 0,
		fat = 0,
		fiber = 0,
		water = 0,
		sugar = 0,
		sodium = 0,
	} = userLogStats || {};

	return (
		<View style={styles.recentLogContainer}>
			<View style={styles.recentLogTitleContainer}>
				<Text style={styles.recentLogTitle}>Last Log:</Text>
				<CurrentStreak streak={streak} />
			</View>
			{userLogStats ? (
				<View style={styles.innerRecentLogContainer}>
					<Text style={styles.recentLogDatetimeText}>{userLogStats.lastLogDate}</Text>
					{/* Additional details from userLogStats */}
					<Text style={styles.logInfoText}>Calories:
						<Text style={styles.logInfoMeasurementText}> {userLogStats.calories} kcal</Text>
					</Text>
					{/* Display other details similarly */}
				</View>
			) : (
				<View style={styles.innerRecentLogContainer}>
					<Text numberOfLines={2} style={{textAlign: 'center'}}>No log details available yet.</Text>
				</View>
			)}
		</View>
	);
}

export default RecentLog;

RecentLog.propTypes = {
	streak: PropTypes.number,
	userLogStats: PropTypes.shape({
		lastLogDate: PropTypes.string,
		lastLogMealType: PropTypes.string,
		calories: PropTypes.number,
		protein: PropTypes.number,
		carbs: PropTypes.number,
		fat: PropTypes.number,
		fiber: PropTypes.number,
		water: PropTypes.number,
		sugar: PropTypes.number,
		sodium: PropTypes.number,
	}).isRequired,
};
