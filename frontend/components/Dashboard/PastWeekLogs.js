// React Imports
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'; // Import PropTypes

const styles = StyleSheet.create({
	wholePastLogsContainer: {
		padding: 15,
		// backgroundColor: '#EC6641',
		backgroundColor: 'white',
		borderRadius: 15,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
		width: '95%',
		height: '19%',
		margingTop: '1%',
		marginBottom: '1%',
	},
	weeklyLogTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		// marginBottom: 15,
		color: '#000',
	},
	weekContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: '#F7F7F7',
		// borderWidth: 0.2,
		borderRadius: 8,
		padding: 8,
		marginVertical: 10,
		width: '100%',
		height: '70%',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.32,
		shadowRadius: 2.22,
		elevation: 3,

	},
	weeklyLogDaysContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	dayContainer: {
		alignItems: 'center',
		padding: 5,
	},
	dayName: {
		fontSize: 12,
		fontWeight: '700',
		color: '#333',
		marginBottom: 5,
		textTransform: 'uppercase',
	},
	dailyCheckmarkContainer: {
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 15,
		backgroundColor: '#FFF',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
});

const getLastSevenDays = () => {
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return Array.from({ length: 7 }).map((_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - i);
		return {
			dayName: days[date.getDay()],
			logged: false,
		};
	}).reverse();
};

function DailyCheckmark({ logged, dayName }) {
	return (
		<View style={styles.dayContainer}>
			<Text style={styles.dayName}>{dayName}</Text>
			<View style={styles.dailyCheckmarkContainer}>
				<Text>{logged ? '✅' : '❌'}</Text>
			</View>
		</View>
	);
}

export function PastWeekLogs({ meals }) {
	const [lastSevenDays, setLastSevenDays] = useState(getLastSevenDays());

	useEffect(() => {
		// Implement logic to determine if meals were logged each day
		const updatedDays = lastSevenDays.map((day) => ({
			...day,
			logged: Math.random() < 0.5, // This should be replaced with actual logic
		}));
		setLastSevenDays(updatedDays);
	}, [meals]);

	return (
		<View style={styles.wholePastLogsContainer}>
			<Text style={styles.weeklyLogTitle}>Weekly Log:</Text>
			<View style={styles.weekContainer}>
				<View style={styles.weeklyLogDaysContainer}>
					{lastSevenDays.map((day, index) => (
						<DailyCheckmark key={index} logged={day.logged} dayName={day.dayName} />
					))}
				</View>
			</View>
		</View>
	);
}

export default PastWeekLogs;

PastWeekLogs.propTypes = {
	meals: PropTypes.array.isRequired,
};

DailyCheckmark.propTypes = {
	logged: PropTypes.bool.isRequired,
	dayName: PropTypes.string.isRequired,
};