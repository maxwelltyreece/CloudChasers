import React, { useState, useEffect, useCallback } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import WelcomeBar from './statsComponents/WelcomeBar/WelcomeBar.js';
import CircularProgressComponent from './statsComponents/CircularProgress/CircularProgress.js';
import NutritionProgress from './statsComponents/NutritionProgress/NutritionProgress.js';
import { useStats } from '../../contexts/StatsContext';
import { useGoals } from '../../contexts/GoalsContext';
import { styles } from './styles';

/**
 * Stats component
 * @returns {JSX.Element} The rendered Stats component
 */
const Stats = () => {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const { todayStats, updateTodayStats } = useStats();
	const { goals, fetchGoals } = useGoals();

    /**
     * Checks if the user is logged in by checking for a token in AsyncStorage
     * @returns {Promise<string>} The token, if it exists
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

	useEffect(() => {
		setLoading(true);
		const fetchData = async () => {
			try {
				await checkUserLogin();
				await Promise.all([
					updateTodayStats(),
					fetchGoals(),
				]);
			} catch (error) {
				console.error("Error fetching data for stat page:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

    /**
     * Updates the data for the stats page
     */
	const updateStatPageData = async () => {
		try {
			await checkUserLogin();

			await Promise.all([
				updateTodayStats(),
				fetchGoals(),
			]);
		} catch (error) {
			console.error("Error fetching data for state page:", error);
		}
	};

	useFocusEffect(
		useCallback(() => {
			updateStatPageData();
		}, [])
	);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator testID='loading-indicator' size="large" />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.statsContainer}>
			<View style={styles.statsHeader}>
				<WelcomeBar />
			</View>
			<View style={styles.ringCompContainer}>
				<View style={styles.ringComp}>
					<CircularProgressComponent todayStats={todayStats} goals={goals} />
				</View>
			</View>
			<View style={styles.progressBarContainer}>
				<NutritionProgress todayStats={todayStats} goals={goals} />
			</View>
		</SafeAreaView>
	);
};

export default Stats; 