/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// React Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CurrentStreak from './CurrentStreak';
import PropTypes from 'prop-types'; // Import PropTypes


const styles = StyleSheet.create({
	recentLogContainer: {
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
		height: '95%',
		width: '94%',
		right: '1.5%',
	},
	recentLogTitleContainer: {
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		flexDirection: 'row',
		paddingLeft: 8,
		paddingBottom: 12,
		width: '100%',
		height: '40%',
	},
	innerRecentLogContainer: {
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
		fontFamily: 'Montserrat_700Bold',
		fontSize: 20,
		fontWeight: 'bold',
	},
	recentLogMealTypeText: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 17,
		fontWeight: 'bold',
		marginBottom: 7,
		marginLeft: 4,
	},
	logItemInfoText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 17,
		fontWeight: '500',
		marginLeft: 4,
		marginBottom: 4,
	},
	recentLogCaloriesText: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
		fontWeight: 'bold',
		marginLeft: 4,
	},
	logInfoText: {
		fontSize: 1,
		fontFamily: 'Montserrat_500Medium',
		fontWeight: '500',
		marginLeft: 4,
	},
	logInfoMeasurementText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 16,
		fontWeight: '500',
		marginTop: 3.2,
		left: 2,
		marginLeft: 4,
	},
	noLogText: {
		textAlign: 'center', 
		left: '18%',
		fontSize: 14,
		fontFamily: 'Montserrat_500Medium',
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

					{(latestUserDayMeal && latestUserDayMeal.name) ?
						(
							<Text style={styles.recentLogMealTypeText}>
								{latestUserDayMeal.name.charAt(0).toUpperCase() + latestUserDayMeal.name.slice(1)}
							</Text>

						) : (

							<Text numberOfLines={2} style={styles.noLogText}>
								No log details{'\n'}available yet.
							</Text>
						)
					}


					{(macros && macros.calories) ? (
						<View>
							<Text style={styles.recentLogCaloriesText}>Calories:{' '}</Text>
							<Text style={styles.logInfoMeasurementText}>{macros.calories.toFixed(0) ?? 0} kcal</Text>
						</View>
					) : null}

				</View>
			) : (
				<View style={styles.innerRecentLogContainer}>
					<Text numberOfLines={2} style={styles.noLogText}>
						No log details{'\n'}available yet.
					</Text>
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
