import React, { useState, useEffect, useCallback } from 'react';
import { View, SafeAreaView, ActivityIndicator } from 'react-native';

// import globalStyles from '../../styles/global';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import WelcomeBar from './statsComponents/WelcomeBar';
import CircularProgressComponent from './statsComponents/CircularProgress.js';
import NutritionProgress from './statsComponents/NutritionProgress.js';

import { useStats } from '../../contexts/StatsContext';
import { useGoals } from '../../contexts/GoalsContext';

import { styles } from './styles';
import SettingsButton from '../../components/SettingsButton.js';


const Stats = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { todayStats, updateTodayStats } = useStats();
  const { goals, fetchGoals } = useGoals();

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

    const updateStatPageData = async () => {
        try {
            await checkUserLogin();

            await Promise.all([
                updateTodayStats(),
                fetchGoals(),
            ]);
        } catch (error) {
            console.error("Error fetching data for state page:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
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