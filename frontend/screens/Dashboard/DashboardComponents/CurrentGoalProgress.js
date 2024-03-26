// React Imports
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	View, Text, StyleSheet, Animated, Pressable, ScrollView, Platform
} from 'react-native';
import Swiper from 'react-native-swiper';
import { useReminders } from '../../../contexts/RemindersContext';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';


const styles = StyleSheet.create({
	progressBarComponentContainer: {
		justifyContent: 'center',
		marginTop: '0.8%',
		borderRadius: 15,
		width: '100%',
		height: '40%',
	},
	progressBarContainer: {
		flexDirection: 'row',
		marginTop: '1%',
		backgroundColor: '#F0F0F0',
		borderRadius: 32,
		overflow: 'hidden',
		width: '100%',
		height: 20,
	},
	filledProgressBar: {
		backgroundColor: '#FF815E',
		height: 20,
		borderRadius: 32,
	},
	progressBarItem: {
		marginBottom: 5,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: 'white',
		borderRadius: 12,
		width: '100%',
		height: '25%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	labelContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 4,
	},
	label: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
		fontWeight: 'bold',
	},
	slideContainer: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingHorizontal: 20,
	},
	firstSlideContainer: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		height: '100%',
		paddingBottom: 10,
	},
	firstLabel: {
		fontFamily: 'Montserrat_700Bold',
		top: 2,
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 7,
	},
	calorieProgressBarItem: {
		marginBottom: 5,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: 'white',
		borderRadius: 12,
		width: '100%',
		height: '30%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	waterProgressBarItem: {
		marginTop: 10,
		marginBottom: 20,
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: 'white',
		borderRadius: 12,
		width: '100%',
		height: '30%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	slideTitle: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		alignSelf: 'center',
	},
	remindersScrolView: {
		width: '100%',
		height: Platform.OS === 'android' ? '55%' : '59%',
		marginBottom: 4,
	},
	reminderItem: {
		marginBottom: '2%',
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		paddingVertical: '2%',
		backgroundColor: 'white',
		borderRadius: 12,
		width: '100%',
		height: 'auto',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	reminderInfoSection: {
		marginTop: 6,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	reminderDescriptionText: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
		fontWeight: 'bold',
	},
	reminderInfoTitle: {
		fontFamily: 'Montserrat_600SemiBold',
		fontSize: 12.5,
		fontWeight: '600',
	},
	reminderInfoText: {
		fontFamily: 'Montserrat_400Regular',
		fontSize: 12.5,
		fontWeight: '400',
		marginRight: 14,
	},
	seeAllRemindersButton: {
		width: '100%',
		height: 35,
		backgroundColor: '#F0F0F0',
		padding: 10,
		borderRadius: 15,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	seeAllRemindersButtonText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 12.5,
		fontWeight: '500',
		textTransform: 'uppercase',
	},
	emptyRemindersSection: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginVertical: 15,
		width: '90%',
		padding: 25,
		backgroundColor: 'white',
		borderRadius: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	emptyRemindersTitle: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
	},
	emptyRemindersText: {
		fontFamily: 'Montserrat_400Regular',
		fontSize: 14,
		fontWeight: '400',
		textAlign: 'center',
		marginBottom: 15,
	},
});

// ProgressBar component
const ProgressBar = ({ label, progress, max, unit }) => {

	const [containerWidth, setContainerWidth] = useState(0);
	const animatedWidth = useRef(new Animated.Value(0)).current;

	const progressBarStyle = label === 'Calories' ? styles.calorieProgressBarItem
		: label === 'Water' ? styles.waterProgressBarItem
			: styles.progressBarItem;

	const labelStyle = label === 'Calories' ? styles.firstLabel
		: label === 'Water' ? styles.firstLabel
			: styles.label;

	const measureContainer = (event) => {
		const { width } = event.nativeEvent.layout;
		setContainerWidth(width);
	};


	useEffect(() => {
		const safeDivision = (numerator, denominator, containerWidth) => {
			if (denominator > 0) {
				return (numerator / denominator) * containerWidth;
			} else {
				return 0;
			}
		};

		let finalWidth = 0;

		{
			(progress != undefined && progress != null && max != undefined && max != null && containerWidth != undefined && containerWidth != null) ?
				finalWidth = safeDivision(progress, max, containerWidth) : finalWidth = 0
		}


		Animated.timing(animatedWidth, {
			toValue: finalWidth,
			duration: 1000,
			useNativeDriver: false,
		}).start();
	}, [progress, max, containerWidth]);

	return (
		<View style={progressBarStyle}>
			<View style={styles.labelContainer}>
				<Text style={labelStyle}>{label}</Text>
				<Text style={labelStyle}>{`${progress ?? 0} / ${max} ${unit}`}</Text>
			</View>
			<View style={styles.progressBarContainer} onLayout={measureContainer}>
				<Animated.View style={[styles.filledProgressBar, { width: animatedWidth }]} />
			</View>
		</View>
	);
};

ProgressBar.propTypes = {
	label: PropTypes.string.isRequired,
	progress: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	unit: PropTypes.string,
};

ProgressBar.defaultProps = {
	progress: 0,
	unit: '',
};


const ReminderItem = ({ reminder }) => {
	return (
		<View style={styles.reminderItem}>
			<Text style={styles.reminderDescriptionText} numberOfLines={1}>{reminder.description}</Text>
			<View style={styles.reminderInfoSection}>
				<Text style={styles.reminderInfoTitle}>Time: </Text>
				<Text style={styles.reminderInfoText}>{reminder.time}</Text>
				<Text style={styles.reminderInfoTitle}>Frequency: </Text>
				<Text style={styles.reminderInfoText}>{reminder.frequency}</Text>

			</View>
		</View>
	);
};
ReminderItem.propTypes = {
	reminder: PropTypes.object.isRequired,
};

ReminderItem.defaultProps = {
	reminder: {},
};


// Main component
function GoalProgressBar({ todayStats, goals }) {
	const { reminders } = useReminders();
	const navigation = useNavigation();

	let initialMacroValues = {
		calories: 0,
		water: 0,
		fat: 0,
		sodium: 0,
		carbs: 0,
		protein: 0,
		sugar: 0,
		fibre: 0,
	};

	let currentMacroValues = { ...initialMacroValues };

	Object.keys(todayStats).forEach(key => {
		if (todayStats[key] !== null && todayStats[key] !== undefined) {
			currentMacroValues[key] = todayStats[key];
		}
	});

	Object.keys(currentMacroValues).forEach(key => {
		currentMacroValues[key] = parseInt(currentMacroValues[key].toFixed(0));
	});

	// Pre-filled with default nutrient goals based on recommended daily amount for each nutrient.
	let nutrientGoals = {
		calories: 2000,
		fat: 70,
		sodium: 2300,
		carbs: 300,
		water: 3700,
		protein: 50,
		sugar: 25,
		fibre: 30,
	};

	if (goals && goals.goals) {
		goals.goals.forEach(goal => {
			if (goal.measurement in nutrientGoals) {
				nutrientGoals[goal.measurement] = goal.maxTargetMass;
			}
		});
	}


	function getClosestDate(reminder) {
		let now = moment();
		let reminderTime = moment(reminder.time, "hh:mm A");

		let closestDate = now.clone().hour(reminderTime.hour()).minute(reminderTime.minute());

		if (reminder.frequency === 'daily') {
			if (now.isAfter(closestDate)) {
				closestDate.add(1, 'days');
			}
		} else if (reminder.frequency === 'weekly') {
			let nextMonday = new Date(closestDate);
			nextMonday.setDate(closestDate.getDate() + ((1 + 7 - closestDate.getDay()) % 7));
			if (now > closestDate) {
				nextMonday.setDate(nextMonday.getDate() + 7);
			}
			closestDate = nextMonday;
		}

		return {
			date: closestDate,
			isDaily: reminder.frequency.toLowerCase() === 'daily'
		};
	}

	let sortedReminders = reminders.sort((a, b) => {
		let aClosest = getClosestDate(a);
		let bClosest = getClosestDate(b);

		let now = new Date();
		let isMondaySoon = now.getDay() === 0 || now.getDay() === 1; // today is Sunday or Monday

		if (!isMondaySoon && aClosest.isDaily !== bClosest.isDaily) {
			return aClosest.isDaily ? -1 : 1;
		} else if (aClosest.isDaily === bClosest.isDaily || isMondaySoon) {
			return aClosest.date - bClosest.date;
		}
	});

	return (
		<View style={styles.progressBarComponentContainer}>
			<Swiper
				showsButtons={false}
				loop={false}
				// dotColor="white"
				activeDotColor="white" 
			>

				{/* Calories & Water slide */}
				<View style={styles.firstSlideContainer}>
					<Text style={styles.slideTitle}>Today</Text>
					<ProgressBar label="Calories" progress={currentMacroValues.calories} max={nutrientGoals.calories} unit="kcal" />
					<ProgressBar label="Water" progress={currentMacroValues.water} max={nutrientGoals.water} unit="ml" />
				</View>

				{/* Reminders slide */}
				<View style={styles.slideContainer}>
					<Text style={styles.slideTitle}>Reminders</Text>
					<ScrollView style={styles.remindersScrolView}>
						{sortedReminders.length > 0 ? (
							sortedReminders.map((reminder, index) => (
								<ReminderItem key={index} reminder={reminder} />
							))
						) : (
							<View style={styles.emptyRemindersSection}>
								<Text style={styles.emptyRemindersTitle}>No reminders. </Text>
								<Text style={styles.emptyRemindersText}>Go to the reminders page to add some!</Text>
								<Pressable
									style={styles.seeAllRemindersButton}
									onPress={() => navigation.navigate('User', { screen: 'Reminders' })}
									testID='add-reminders-button'
								>
									<Text style={styles.seeAllRemindersButtonText}>Add Reminders</Text>
								</Pressable>
							</View>
						)}
					</ScrollView>
					{reminders.length > 0 ? (
						<Pressable
							style={styles.seeAllRemindersButton}
							onPress={() => navigation.navigate('User', { screen: 'Reminders' })}
							testID='see-all-reminders-button'
						>
							<Text style={styles.seeAllRemindersButtonText}>See All Reminders</Text>
						</Pressable>
					) : null}
				</View>


			</Swiper>
		</View>
	);
}

GoalProgressBar.propTypes = {
	todayStats: PropTypes.object.isRequired,
	goals: PropTypes.any.isRequired,
};

export default GoalProgressBar;