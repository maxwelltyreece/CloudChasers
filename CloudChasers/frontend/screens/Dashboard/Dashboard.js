// React related imports
import React, { useState } from 'react';
import {
	View, StyleSheet, SafeAreaView,
} from 'react-native';

// Component imports
import {
	WelcomeBar, NotificationBadge, PastWeekLogs, CurrentStreak, RecentLog,
	LearnMore, CommunityStatus, CurrentGoalProgress,
} from '../../components/Dashboard';

const styles = StyleSheet.create({
	dashboardHeader: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	notificationBadgeContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 20,
	},
	dashboardContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		backgroundColor: '#F0F0F0',
		top: '5%',
	},
	middleDashboardContainer: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexDirection: 'row',
		marginVertical: 10,
		backgroundColor: '#F0F0F0',
		width: '95%',
		height: '30%',
		marginBottom: '14%',
	},
	leftComponentContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rightComponentContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomDashboardContainer: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		width: '100%',
		backgroundColor: '#F12A2A',
	},
});

// Fake database
const fakeDB = {
	recentMeals: [
		{ id: 1, name: 'Breakfast Burrito', timestamp: new Date().setDate(new Date().getDate() - 1) },
		{ id: 2, name: 'Chicken Salad', timestamp: new Date().setDate(new Date().getDate() - 2) },
	],
	currentStreak: 5, // Example streak
};

// Dashboard screen
function Dashboard() {
	const [meals] = useState(fakeDB.recentMeals);
	const [streak] = useState(fakeDB.currentStreak);

	return (
		<SafeAreaView style={styles.dashboardContainer}>
			<View style={styles.dashboardHeader}>
				<WelcomeBar name="Lorenzo" />
				{/* <View style={styles.notificationBadgeContainer}>
					<NotificationBadge count={3} />
				</View> */}
			</View>

			<CurrentGoalProgress goal={120} current={80} />

			<CommunityStatus />

			<PastWeekLogs meals={meals} />

			<View style={styles.middleDashboardContainer}>
				<View style={styles.leftComponentContainer}>
					<CurrentStreak streak={streak} />
					<LearnMore />
				</View>

				<View style={styles.rightComponentContainer}>
					<RecentLog />
				</View>
			</View>

		</SafeAreaView>
	);
}

export default Dashboard;
