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
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
		marginLeft: 4,
	},
	logItemInfoText : {
		fontSize: 16,
		fontWeight: '500',
		marginLeft: 4,
		marginBottom: 4,
	},
	recentLogCaloriesText: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 4,
	},
	logInfoText: {
		fontSize: 16,
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
	
	// const {
	// 	lastLogDate = 'N/A',
	// 	lastLogMealType = 'N/A',
	// 	calories = 0,
	// 	protein = 0,
	// 	carbs = 0,
	// 	fat = 0,
	// 	fibre = 0,
	// 	water = 0,
	// 	sugar = 0,
	// 	sodium = 0,
	// } = userLogStats || {};

	const {
		latestUserDayMeal = {},
		macros = {},
		mealItems = [{}],
	} = userLogStats || {};

//	console.log('userLogStats: RECENT LOG', userLogStats);

//	console.log('LATEST USER DAY MEAL: RECENT LOG', latestUserDayMeal.name);

//	console.log('MACROS: RECENT LOG', macros);

	console.log('MEAL ITEMS: RECENT LOG', mealItems[0].name);

	return (
		<View style={styles.recentLogContainer}>
			<View style={styles.recentLogTitleContainer}>
				<Text style={styles.recentLogTitle}>Last Log:</Text>
				<CurrentStreak streak={streak} />
			</View>
			{userLogStats ? (
				<View style={styles.innerRecentLogContainer}>

						<Text style={styles.recentLogMealTypeText}>
							{ (latestUserDayMeal.name.charAt(0).toUpperCase() + latestUserDayMeal.name.slice(1)) ?? 'N/A' }
						</Text>
						
			
					<Text style={styles.logItemInfoText}>
							{mealItems[0].name ?? 'N/A'}
						</Text>

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
		lastLogDate: PropTypes.string,
		lastLogMealType: PropTypes.string,
		calories: PropTypes.number,
		protein: PropTypes.number,
		carbs: PropTypes.number,
		fat: PropTypes.number,
		fibre: PropTypes.number,
		water: PropTypes.number,
		sugar: PropTypes.number,
		sodium: PropTypes.number,
	}).isRequired,
};

RecentLog.defaultProps = {
	streak: 0,
	userLogStats: {},
	macros: {},
	mealItems: [{}],
};
