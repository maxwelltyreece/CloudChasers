import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';

const getStreaks = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.post(`${LocalIP}/streak`, {}, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching streaks:', error);
        throw error; // Re-throw the error if you want calling code to handle it
    }
};

const getDailyCaloricIntake = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`${LocalIP}/dailyCaloricIntake`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily caloric intake:', error);
        throw error;
    }
};

const getDailyWaterIntake = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`${LocalIP}/dailyWaterIntake`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily water intake:', error);
        throw error;
    }
};

const getDailyProteinIntake = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`${LocalIP}/dailyProteinIntake`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily protein intake:', error);
        throw error;
    }
};

const getDailyCarbIntake = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`${LocalIP}/dailyCarbIntake`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily carb intake:', error);
        throw error;
    }
};

const getDailyFatIntake = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`${LocalIP}/dailyFatIntake`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily fat intake:', error);
        throw error;
    }
};

const getDailySugarIntake = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`${LocalIP}/dailySugarIntake`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily sugar intake:', error);
        throw error;
    }
};

const getDailySodiumIntake = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`${LocalIP}/dailySodiumIntake`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily sodium intake:', error);
        throw error;
    }
};

const getDailyFibreIntake = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`${LocalIP}/dailyFibreIntake`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching daily fibre intake:', error);
        throw error;
    }
};

export default {
    getStreaks,
    getDailyCaloricIntake,
    getDailyWaterIntake,
    getDailyProteinIntake,
    getDailyCarbIntake,
    getDailyFatIntake,
    getDailySugarIntake,
    getDailySodiumIntake,
    getDailyFibreIntake,
};
