import React, { useState, useEffect } from 'react';
import {
	View, SafeAreaView, ActivityIndicator
} from 'react-native';

import {
	WelcomeBar, RecentLog, CommunityStatus, CurrentGoalProgress, AchievementsFeature,
} from '../../components/Dashboard';

import { useUser } from '../../contexts/UserContext';
import { useCommunity } from '../../contexts/CommunityContext'; 
import { useStats } from '../../contexts/StatsContext';
import { useGoals } from '../../contexts/GoalsContext';
import { useFoodLog } from '../../contexts/FoodLogContext';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';


function Dashboard() {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const { userDetails, updateUserDetails } = useUser();
	const { userCommunities, getUserCommunities } = useCommunity([]);
	const { todayStats, updateTodayStats } = useStats();
	const { macroGoals, fetchMacroGoals } = useGoals(); 
	const { latestLoggedFood, setLatestLoggedFood } = useFoodLog();
	
    console.log({ userDetails });
	console.log({ userCommunities });
	console.log({ todayStats });
	console.log({ latestLoggedFood });
	console.log({ macroGoals });

    
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
				await checkUserLogin();
	
				// // Fetch all necessary data in parallel
				// await Promise.all([
				// 	userDetails ? Promise.resolve() : updateUserDetails(),
				// 	// Add conditions to fetch todayStats and userCommunities only if they haven't been fetched yet
				// 	todayStats ? Promise.resolve() : updateTodayStats(),
					
				// 	userCommunities.length > 0 ? Promise.resolve() : getUserCommunities(),
				// 	latestLoggedFood ? Promise.resolve() : setLatestLoggedFood()
				// ]);
 
				// Fetch all necessary data in parallel
				await Promise.all([
                    updateUserDetails(),
                    updateTodayStats(),
                    getUserCommunities(),
                    setLatestLoggedFood(),
                    fetchMacroGoals()
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
			<View style={styles.dashboardContainer}>
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
						<WelcomeBar name={userDetails?.data?.forename} />
					</View>

					<CurrentGoalProgress todayStats={todayStats} nutrientGoals={macroGoals}/>

					<CommunityStatus communities={userCommunities} /> 

					<View style={styles.bottomDashboardContainer}>
						<View style={styles.leftComponentContainer}>
							<AchievementsFeature />
						</View>

						<View style={styles.rightComponentContainer}>
							<RecentLog streak={userDetails?.data?.streak} userLogStats={setLatestLoggedFood} />
						</View>
					</View>

				</>
			)}

		</SafeAreaView>
	);
}

export default Dashboard;