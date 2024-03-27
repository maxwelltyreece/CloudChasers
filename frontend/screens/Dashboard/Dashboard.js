import React, { useState, useCallback } from 'react';
import {
    View, SafeAreaView, ActivityIndicator
} from 'react-native';

import {
    WelcomeBar, RecentLog, CommunityStatus, CurrentGoalProgress, AchievementsFeature,
} from './DashboardComponents';

import { useUser } from '../../contexts/UserContext';
import { useCommunity } from '../../contexts/CommunityContext';
import { useStats } from '../../contexts/StatsContext';
import { useGoals } from '../../contexts/GoalsContext';
import { useFoodLog } from '../../contexts/FoodLogContext';
import { useAwards } from '../../contexts/AwardsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';

/**
 * Dashboard component
 * @returns {JSX.Element} The Dashboard component
 */
function Dashboard() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { userDetails, updateUserDetails } = useUser();
    const { userCommunities, getUserCommunities } = useCommunity([]);
    const { todayStats, streak, updateTodayStats } = useStats();
    const { goals, fetchGoals } = useGoals();
    const { latestLoggedFood, getLatestLoggedFood } = useFoodLog();
    const { userAwards, awards, fetchUserAwards, fetchAwards, fetchAwardsToBeIssued } = useAwards();

    /**
     * Check if the user is logged in
     * @returns {Promise<string>} The token of the user
     */
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
            navigation.navigate('Login');
        }
    };

    /**
     * Update the data for the dashboard
     */
    const updateDashboardData = async () => {
        try {
            await checkUserLogin();

            await fetchAwardsToBeIssued();

            await Promise.all([
                updateUserDetails(),
                updateTodayStats(),
                getUserCommunities(),
                getLatestLoggedFood(),
                fetchGoals(),
                fetchAwards(),
                fetchUserAwards()
            ]);
        } catch (error) {
            if (latestLoggedFood != undefined) {
                console.error("Error updating data for dashboard:", error);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            console.log('DASHBOARD FOCUSED');
            setLoading(true);
            updateDashboardData().finally(() => setLoading(false));
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