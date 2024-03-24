import React, { useState, useCallback, useEffect } from 'react';
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
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';


// Dashboard screen
function Dashboard() {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const { userDetails, updateUserDetails } = useUser();
	const { userCommunities, getUserCommunities } = useCommunity([]);
	const { todayStats, streak, updateTodayStats } = useStats();
	const { goals, fetchGoals } = useGoals();
	const { latestLoggedFood, getLatestLoggedFood } = useFoodLog();
	const { userAwards, awards, fetchUserAwards, fetchAwards, fetchAwardsToBeIssued } = useAwards();

	const checkUserLogin = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
            console.log('Token:', token);
			if (!token) {
				console.error("No token found");
				navigation.navigate('Login');
				return;
			}
			return token;
		} catch (error) {
			console.error("Error accessing AsyncStorage:", error);
			navigation.navigate('Login');
		}
	};

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				await checkUserLogin();

				await Promise.all([
					updateUserDetails(),
					updateTodayStats(),
					getUserCommunities(),
					getLatestLoggedFood(),
					fetchGoals(),
					fetchUserAwards(),
					fetchAwards(),
					// fetchAwardsToBeIssued()
				]);
			} catch (error) {
				if (latestLoggedFood != undefined) {
					console.error("Error fetching data for dashboard:", error);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const updateDashboardData = async () => {
        console.log(userDetails)
		try {
			await checkUserLogin();

			await Promise.all([
				updateUserDetails(),
				updateTodayStats(),
				getUserCommunities(),
				getLatestLoggedFood(),
				fetchGoals(),
				fetchUserAwards(),
				fetchAwards(),
				// fetchAwardsToBeIssued()
			]);
		} catch (error) {
			if (latestLoggedFood != undefined) {
				console.error("Error updating data for dashboard:", error);
			}
		}
	};

	useFocusEffect(
		useCallback(() => {
			updateDashboardData();
		}, [])
	);


	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator testID="loading-indicator" size="large" />
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