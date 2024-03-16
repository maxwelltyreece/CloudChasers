// React Imports
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
	View, Text, StyleSheet, Animated, Pressable, ScrollView
} from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useReminders } from '../../contexts/RemindersContext';
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
	// -------Goal Progress Bar-------//
	progressBarComponentContainer: {
		// flex: 1,
		justifyContent: 'center',
		// backgroundColor: '#F2F2F2',
		// padding: 15,
		marginTop: '1%',
		// marginBottom: '1%',
		borderRadius: 15,
		width: '100%',
		height: '40%',
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 1 },
		// shadowOpacity: 0.22,
		// shadowRadius: 2.22,
		// elevation: 3,
		// backgroundColor: 'red',
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
		fontSize: 16,
		fontWeight: 'bold',
	},
	swiperContainer: {
		// height: 'auto',
	},
	slideContainer: {
		// flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		paddingBottom: 10,
		// backgroundColor: 'green',
	},
	firstSlideContainer: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingHorizontal: 20,
		height: '100%',
		paddingBottom: 10,
	},
	firstLabel: {
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
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
		alignSelf: 'center',
	},
	remindersScrolView: {
		width: '100%',
		height: '62%',
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
		// height: '20%',
		height: 'auto',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	reminderInfoSection: {
		marginTop: 4,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignContent: 'center',
		alignItems: 'center',
		width: '100%',
		// backgroundColor: 'pink',
	},
	reminderDescriptionText: {
		fontSize: 16,
		fontWeight: 'bold',
		// backgroundColor: 'yellow',
	},
	reminderInfoTitle: {
		fontSize: 12.5,
		fontWeight: '600',
	},
	reminderInfoText: {
		fontSize: 12.5,
		fontWeight: '400',
		marginRight: 14,
	},
	seeAllRemindersButton: {
		width: '100%',
		height: 35,
		backgroundColor: '#F0F0F0', // Example color
		padding: 10,
		borderRadius: 15,
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
	seeAllRemindersButtonText: {
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
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
	},
	emptyRemindersText: {
		fontSize: 14,
		fontWeight: '400',
		textAlign: 'center',
	},
});

// ProgressBar component
const ProgressBar = ({ label, progress, max }) => {

	const [containerWidth, setContainerWidth] = useState(0);
	const animatedWidth = useRef(new Animated.Value(0)).current;

	const progressBarStyle = label === 'Calories' ? styles.calorieProgressBarItem
		: label === 'Water' ? styles.waterProgressBarItem
			: styles.progressBarItem; // Default style

	const labelStyle = label === 'Calories' ? styles.firstLabel
		: label === 'Water' ? styles.firstLabel
			: styles.label; // Default style

	// Function to measure the width of the container
	const measureContainer = (event) => {
		const { width } = event.nativeEvent.layout;
		setContainerWidth(width);
	};


	useEffect(() => {
		const finalWidth = (progress / max) * containerWidth;

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
				<Text style={labelStyle}>{`${progress} / ${max}`}</Text>
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
};


// Single Reminder Component
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

// Main component
function GoalProgressBar({ todayStats }) {
	const { reminders, setReminders } = useReminders();
	const navigation = useNavigation();
	const [sortedReminders, setSortedReminders] = useState(reminders);

	const getNextReminderDate = (reminder) => {
		const today = new Date();
		const timeParts = reminder.time.split(':');
		const reminderHour = parseInt(timeParts[0], 10);
		const reminderMinutes = parseInt(timeParts[1], 10);

		if (reminder.frequency === 'daily') {
			const nextOccurrence = new Date();
			nextOccurrence.setHours(reminderHour, reminderMinutes, 0, 0);
			// If the reminder time for today has already passed, set it for the next day
			if (nextOccurrence <= today) {
				nextOccurrence.setDate(today.getDate() + 1);
			}
			return nextOccurrence;
		} else if (reminder.frequency === 'weekly') {
			// Find next Monday
			const nextMonday = new Date();
			nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7)); // 1 is Monday
			nextMonday.setHours(reminderHour, reminderMinutes, 0, 0);
			// If today is Monday and the time hasn't passed, set the reminder for today
			if (today.getDay() === 1 && today < nextMonday) {
				nextMonday.setDate(today.getDate());
			}
			return nextMonday;
		}
	};

	useEffect(() => {
        // Calculate next occurrence for each reminder and sort them
        const remindersWithNextOccurrence = reminders.map(reminder => ({
            ...reminder,
            nextOccurrence: getNextReminderDate(reminder)
        })).sort((a, b) => a.nextOccurrence - b.nextOccurrence);

        setSortedReminders(remindersWithNextOccurrence);
    }, [reminders]);

	// useEffect(() => {
	// 	const fetchReminders = async () => {
	// 		const remindersData = await AsyncStorage.getItem('REMINDERS');
	// 		const remindersList = remindersData ? JSON.parse(remindersData) : [];

	// 		// Calculate next occurrence for each reminder and sort them
	// 		remindersList.forEach(reminder => {
	// 			reminder.nextOccurrence = getNextReminderDate(reminder);
	// 		});

	// 		remindersList.sort((a, b) => a.nextOccurrence - b.nextOccurrence);

	// 		setReminders(remindersList.slice(0, 3)); // Keep only the top 3 reminders
	// 	};

	// 	fetchReminders();
	// }, []);

	return (
		<View style={styles.progressBarComponentContainer}>
			<Swiper style={styles.swiperContainer} showsButtons={false} loop={false}>

				{/* Calories & Water slide */}
				<View style={styles.firstSlideContainer}>
					<Text style={styles.slideTitle}>Today</Text>
					<ProgressBar label="Calories" progress={todayStats.calories} max={100} />
					<ProgressBar label="Water" progress={todayStats.water} max={100} />
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
							</View>
						)}
					</ScrollView>
					<Pressable
						style={styles.seeAllRemindersButton}
						onPress={() => navigation.navigate('Reminders')}
					>
						<Text style={styles.seeAllRemindersButtonText}>See All Reminders</Text>
					</Pressable>
				</View>
			</Swiper>
		</View>
	);
}

GoalProgressBar.propTypes = {
	todayStats: PropTypes.object.isRequired,
};

export default GoalProgressBar;