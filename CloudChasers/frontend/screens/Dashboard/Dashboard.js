// React related imports
import React, { useState, useEffect } from 'react';
import {
	View, StyleSheet, SafeAreaView, ActivityIndicator, Text, Dimensions
} from 'react-native';

// Component imports
import {
	WelcomeBar, PastWeekLogs, CurrentStreak, RecentLog,
	LearnMore, CommunityStatus, CurrentGoalProgress, AchievementsFeature,
} from '../../components/Dashboard';

// Context imports
import { useUser } from '../../contexts/UserContext';
import { useCommunity } from '../../contexts/CommunityContext';
import { useFoodStats } from '../../contexts/foodStatsContext';

// Other imports
const { width } = Dimensions.get('window');
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LocalIP } from '../../screens/IPIndex';



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
		top: '5%',
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
		paddingBottom: '4%',
		width: '50%',
		height: '100%',
	},
	rightComponentContainer: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: '1%',
		paddingBottom: '4%',
		width: '50%',
		height: '100%',
	},
	// topRightComponentContainer: {
	// 	justifyContent: 'center',
	// 	alignItems: 'flex-end',
	// 	width: '100%',
	// 	height: '25%',
	// },
	// bottomRightComponentContainer: {
	// 	justifyContent: 'flex-start',
	// 	alignItems: 'center',
	// 	width: '100%',
	// 	height: '75%',
	// 	backgroundColor: 'purple',
	// },
	bottomDashboardContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		// marginVertical: 10,
		// backgroundColor: '#F0F0F0',
		width: '100%',
		height: '25%',
		marginBottom: '15%',
		
	},
	semiCircle: {
		width: width * 2, // Make the circle large enough
		height: width * 2, // Square shape to ensure a perfect circle
		borderRadius: width, // Half of the width and height to ensure the rounded edges form a circle
		position: 'absolute',
		top: -width, // Positioning at the top with negative offset to show half
		left: -width / 2, // Center the circle horizontally
		backgroundColor: '#FF815E', // Your choice of color
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
	const navigation = useNavigation();
	const [meals] = useState(fakeDB.recentMeals);
    const [loading, setLoading] = useState(true);
	const { userDetails, updateUserDetails } = useUser();
	const { userCommunities, getUserCommunities } = useCommunity([]);
	const { foodStats, updateFoodStats } = useFoodStats();
	console.log({ foodStats, updateFoodStats });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    console.error("No token found");
                    navigation.navigate('Login'); // Redirect to login if no token
                    return;
                }
                const response = await axios.get(`http://${LocalIP}:3000/userDetails`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
				console.log("RESPONSE:", response.data.data)
				console.log("RESPONSE:", response.data.data.forename)
                updateUserDetails(response.data.data);
                setLoading(false);
				console.log("USER DETAILS:", userDetails)
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

	useEffect(() => {
        async function loadInitialData() {
            setLoading(true);
			console.log("GETTING USER COMMUNITIES")
			console.log("USER COMMUNITIES:", userCommunities)
            await getUserCommunities();
			console.log("USER COMMUNITIES:", userCommunities)
            setLoading(false);
        }

        loadInitialData();
    }, []);

	// useEffect(() => {
	// 	const fetchFoodStats = async () => {
	// 		try {
	// 			const token = await AsyncStorage.getItem('token');
	// 			if (!token) {
	// 				console.error("No token found");
	// 				navigation.navigate('Login');
	// 				return;
	// 			}
	// 			const response = await axios.get(`http://${LocalIP}:3000/foodStats`, {
	// 				headers: {
	// 					'Authorization': `Bearer ${token}`
	// 				}
	// 			});
	// 			console.log("FOOD STATS:", response.data.data)
	// 			updateFoodStats(response.data.data);
	// 			setLoading(false);
	// 			console.log("USER FOOD STATS:", foodStats)
	// 		}
	// 		catch (error) {
	// 			console.error("Error fetching user food stats:", error);
	// 		}
	// 	};

	// 	fetchFoodStats();
	// }, []);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

	return (
		<SafeAreaView style={styles.dashboardContainer}>
		
			<View style={styles.semiCircle} />

			<View style={styles.dashboardHeader}>
				<WelcomeBar name={userDetails?.data?.forename} />
			</View>

			<CurrentGoalProgress foodStats={foodStats} />

			<CommunityStatus communities={userCommunities}/>

			<View style={styles.bottomDashboardContainer}>
				<View style={styles.leftComponentContainer}>
					<AchievementsFeature />
				</View>

				<View style={styles.rightComponentContainer}>
					<RecentLog />
				</View>
			</View>

			{/* <PastWeekLogs meals={meals} /> */}

			{/* <RecentLog /> */}
			
			{/* <View style={styles.middleDashboardContainer}>
				<View style={styles.leftComponentContainer}>
					<CurrentStreak streak={userDetails?.data?.streak} />
					<LearnMore />
				</View>

				<View style={styles.rightComponentContainer}>
					<RecentLog />
				</View>
			</View> */}


		</SafeAreaView>
	);
}

export default Dashboard;
