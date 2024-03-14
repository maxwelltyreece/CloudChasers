// React related imports
import React, { useState, useEffect } from 'react';
import {
	View, StyleSheet, SafeAreaView, ActivityIndicator
} from 'react-native';

// Component imports
import {
	WelcomeBar, PastWeekLogs, CurrentStreak, RecentLog,
	LearnMore, CommunityStatus, CurrentGoalProgress,
} from '../../components/Dashboard';

// Other imports
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LocalIP } from '../../screens/IPIndex';



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
	const navigation = useNavigation();
	const [meals] = useState(fakeDB.recentMeals);
	const [streak] = useState(fakeDB.currentStreak);
	const { userDetails, updateUserDetails } = useUser();
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

	return (
		<SafeAreaView style={styles.dashboardContainer}>
			<View style={styles.dashboardHeader}>
				{/* Assuming userDetails might be null or undefined */}
				<WelcomeBar name={userDetails?.data?.forename} />
			</View>

			<CurrentGoalProgress goal={120} current={80} />

			<CommunityStatus />

			<PastWeekLogs meals={meals} />

			<View style={styles.middleDashboardContainer}>
				<View style={styles.leftComponentContainer}>
					<CurrentStreak streak={userDetails?.data?.streak} />
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
