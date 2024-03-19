import React, { useState, useEffect } from 'react';
import {
	View, SafeAreaView, ActivityIndicator
} from 'react-native';

import {
	WelcomeBar, RecentLog, CommunityStatus, CurrentGoalProgress, AchievementsFeature,
} from './Components';

import { useUser } from '../../contexts/UserContext';
import { useCommunity } from '../../contexts/CommunityContext';
import { useStats } from '../../contexts/StatsContext';
import { useGoals } from '../../contexts/GoalsContext';
import { useFoodLog } from '../../contexts/FoodLogContext';
import { useAwards } from '../../contexts/AwardsContext';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';





const styles = StyleSheet.create({
	dashboardHeader: {
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: '10%',
		// backgroundColor: 'blue',
	},
	notificationBadgeContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 20,
	},
	dashboardContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		// flexWrap: 'nowrap',
		// backgroundColor: '#F0F0F0',
		top: '4%',
		// backgroundColor: 'purple',
		zIndex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	middleDashboardContainer: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexDirection: 'row',
		marginVertical: 10,
		// backgroundColor: '#F0F0F0',
		width: '95%',
		height: '30%',
		marginBottom: '14%',
	},
	leftComponentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: '1%',
		paddingBottom: '2%',
		width: '50%',
		height: '100%',
	},
	rightComponentContainer: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: '1%',
		paddingBottom: '2%',
		width: '50%',
		height: '100%',
	},
	bottomDashboardContainer: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		// marginVertical: 10,
		// backgroundColor: '#F0F0F0',
		width: '100%',
		height: '25%',
		bottom: '5%',
		// marginBottom: '15%',

	},
	semiCircle: {
		width: width * 2,
		height: width * 2,
		borderRadius: width,
		position: 'absolute',
		top: -width,
		left: -width / 2,
		backgroundColor: '#FF815E',
	},
});


// Dashboard screen
function Dashboard() {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const { userDetails, updateUserDetails } = useUser();
	const { userCommunities, getUserCommunities } = useCommunity([]);
	const { todayStats, streak, updateTodayStats } = useStats();
	const { goals, fetchGoals } = useGoals();
	const { latestLoggedFood, getLatestLoggedFood } = useFoodLog();
	const { userAwards, awards, fetchUserAwards, fetchAwards } = useAwards();

	//console.log({ userDetails });
	// console.log(userDetails.data.forename);
	// console.log(userDetails.data.streak);
	// console.log({ userCommunities });
	// console.log({ todayStats });
	// console.log({ latestLoggedFood });
	// console.log({ goals });
	// console.log({ userAwards });
	// console.log({ 'COMMUNITIES': userCommunities });

	// console.log('STREAKS DASHBOARD:', streak);

	const checkUserLogin = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (!token) {
				console.error("No token found");
				navigation.navigate('Login');
				return;
			}
			return token;
		} catch (error) {
			console.error("Error accessing AsyncStorage:", error);
			navigation.navigate('Login'); // Redirect to login if error
		}
	};
 
	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				await checkUserLogin(); // Check if user is logged in

				// Fetch all necessary data in parallel
				await Promise.all([
					updateUserDetails(),
					updateTodayStats(),
					getUserCommunities(),
					getLatestLoggedFood(),
					fetchGoals(),
					fetchUserAwards(),
					fetchAwards()
				]);
			} catch (error) {
				console.error("Error fetching data for dashboard:", error);
				// Handle error appropriately
			} finally {
				setLoading(false); // Ensure loading is set to false after operations complete
			}
		};

		fetchData();
	}, []); 


	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.dashboardContainer}>

			{loading ? (
				<ActivityIndicator size="large" />
			) : ( 
				<>
					<View style={styles.semiCircle} />
					<View style={styles.dashboardHeader}>
						<WelcomeBar name={userDetails?.forename} />
					</View>

					<CurrentGoalProgress todayStats={todayStats} goals={goals} />

					<CommunityStatus communities={userCommunities} />

					<View style={styles.bottomDashboardContainer}>
						<View style={styles.leftComponentContainer}>
							<AchievementsFeature userAwards={userAwards} allAwards={awards} />
						</View>

						<View style={styles.rightComponentContainer}>
							<RecentLog streak={streak} userLogStats={latestLoggedFood} />
						</View>
					</View>

				</>
			)}

		</SafeAreaView>
	);
}

export default Dashboard;