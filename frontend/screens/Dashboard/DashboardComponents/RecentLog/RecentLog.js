import React from 'react';
import { View, Text } from 'react-native';
import CurrentStreak from '../CurrentStreak/CurrentStreak';
import PropTypes from 'prop-types';
import { styles } from './styles';

/**
 * RecentLog component
 * @param {Object} props - The properties passed to the component
 * @param {number} props.streak - The current streak
 * @param {Object} props.userLogStats - The user's log statistics
 * @param {Object} props.userLogStats.latestUserDayMeal - The latest meal of the user
 * @param {Object} props.userLogStats.macros - The macros of the user's meal
 * @param {Array} props.userLogStats.mealItems - The items of the user's meal
 * @returns {JSX.Element} The RecentLog component
 */
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
							<Text style={styles.recentLogMealTypeText} numberOfLines={1}>
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

export default React.memo(RecentLog);

RecentLog.PropTypes = {
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
