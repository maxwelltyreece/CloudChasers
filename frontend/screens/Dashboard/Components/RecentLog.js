/* eslint-disable react/prop-types */
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
	recentLogMealTypeText: {
		fontSize: 17,
		fontWeight: 'bold',
		marginBottom: 7,
		marginLeft: 4,
	},
	logItemInfoText: {
		fontSize: 17,
		fontWeight: '500',
		marginLeft: 4,
		marginBottom: 4,
	},
	recentLogCaloriesText: {
		fontSize: 16,
		fontWeight: 'bold',
		marginLeft: 4,
	},
	logInfoText: {
		fontSize: 1,
		fontWeight: '500',
		marginLeft: 4,
	},
	logInfoMeasurementText: {
		// marginTop: 5,
		fontSize: 16,
		fontWeight: '500',
		marginLeft: 4,
	},
});

function RecentLog({ streak, userLogStats }) {

	const {
		latestUserDayMeal = {},
		macros = {},
		mealItems = [{}],
	} = userLogStats || {};

	return (
		<View style={styles.recentLogContainer}>
			<View style={styles.recentLogTitleContainer}>
				<Text style={styles.recentLogTitle}>Last Log:</Text>
				<CurrentStreak streak={streak} />
			</View>
			{userLogStats ? (
				<View style={styles.innerRecentLogContainer}>

					<Text style={styles.recentLogMealTypeText}>
						{(latestUserDayMeal.name.charAt(0).toUpperCase() + latestUserDayMeal.name.slice(1)) ?? 'N/A'}
					</Text>


					{/* <Text style={styles.logItemInfoText}>
						{mealItems[0].name ?? 'N/A'}
					</Text> */}

					<Text style={styles.recentLogCaloriesText}>Calories:{' '}
						<Text style={styles.logInfoMeasurementText}>
							{macros.calories ?? 0} kcal
						</Text>
					</Text>
				</View>
			) : (
				<View style={styles.innerRecentLogContainer}>
					<Text numberOfLines={2} style={{ textAlign: 'center' }}>No log details available yet.</Text>
				</View>
			)}
		</View>
	);
}

export default RecentLog;

RecentLog.propTypes = {
	streak: PropTypes.number,
	userLogStats: PropTypes.shape({
		latestUserDayMeal: PropTypes.shape({
			__v: PropTypes.number,
			_id: PropTypes.string,
			name: PropTypes.string,
			order: PropTypes.number,
			userDayID: PropTypes.string,
		}),
		macros: PropTypes.shape({
			calories: PropTypes.number,
			carbs: PropTypes.number,
			fat: PropTypes.number,
			protein: PropTypes.number,
		}),
		mealItems: PropTypes.arrayOf(PropTypes.shape({
			__v: PropTypes.number,
			_id: PropTypes.string,
			foodItemID: PropTypes.string,
			name: PropTypes.string,
			userDayMealID: PropTypes.string,
		})),
	}),
};

RecentLog.defaultProps = {
	streak: 0,
	userLogStats: {},
	latestUserDayMeal: {},
	macros: {},
	mealItems: [{}],
};
