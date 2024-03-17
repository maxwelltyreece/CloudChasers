// React related imports
import React, { useState, useEffect } from 'react';
import {
	View, StyleSheet, SafeAreaView, ActivityIndicator, Dimensions
} from 'react-native';

// Component imports
import {
	WelcomeBar, RecentLog, CommunityStatus, CurrentGoalProgress, AchievementsFeature,
} from '../../components/Dashboard';

// Context imports
import { useUser } from '../../contexts/UserContext';
import { useCommunity } from '../../contexts/CommunityContext'; 
import { useStats } from '../../contexts/StatsContext';
import { useGoals } from '../../contexts/GoalsContext';
import { useFoodLog } from '../../contexts/FoodLogContext';


// Other imports
const { width } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';



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

// Fake database
// const fakeDB = {
// 	recentMeals: [
// 		{ id: 1, name: 'Breakfast Burrito', timestamp: new Date().setDate(new Date().getDate() - 1) },
// 		{ id: 2, name: 'Chicken Salad', timestamp: new Date().setDate(new Date().getDate() - 2) },
// 	],
// 	currentStreak: 5, // Example streak
// };

// Dashboard screen
function Dashboard() {
	const navigation = useNavigation();
	// const [meals] = useState(fakeDB.recentMeals);
	const [loading, setLoading] = useState(false);
	const { userDetails, updateUserDetails } = useUser();
	const { userCommunities, getUserCommunities } = useCommunity([]);
	const { todayStats, updateTodayStats } = useStats();
	const { macroGoals, fetchMacroGoals } = useGoals(); 
	const { latestLoggedFood, setLatestLoggedFood } = useFoodLog();
	console.log({ userDetails });
	// console.log(userDetails.data.forename);
	// console.log(userDetails.data.streak);
	console.log({ userCommunities });
	console.log({ todayStats });
	console.log({ latestLoggedFood });
	console.log({ macroGoals });
	// console.log({ 'COMMUNITIES': userCommunities });

	const checkUserLogin = async () => {
		try {
			const token = await AsyncStorage.getItem('token');
			if (!token) {
				console.error("No token found");
				navigation.navigate('Login'); // Redirect to login if no token
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