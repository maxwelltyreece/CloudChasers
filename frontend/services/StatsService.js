import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';

/**
 * Get the user's streaks.
 * @param {string} date - The date to get the streaks for.
 * @returns {Promise} Axios Response Promise with the streaks data.
 */
const getStreaks = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		const response = await axios.post(`http:${LocalIP}:3000/stats/streak`, { today: date }, {
			headers: { Authorization: `Bearer ${token}` }
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching streak data:', error);
		throw error;
	}
};

/**
 * Get the user's daily caloric intake.
 * @param {string} date - The date to get the caloric intake for.
 * @returns {Promise} Axios Response Promise with the daily caloric intake data.
 */
const getDailyCaloricIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http:${LocalIP}:3000/stats/dailyCaloricIntake?date=${date}`, { 
			headers: { Authorization: `Bearer ${token}` } 
		});
	} catch (error) {
		console.error('Error fetching daily caloric intake SERVICE:', error);
		throw error;
	}
};

/**
 * Get the user's daily water intake.
 * @param {string} date - The date to get the water intake for.
 * @returns {Promise} Axios Response Promise with the daily water intake data.
 */
const getDailyWaterIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http:${LocalIP}:3000/stats/dailyWaterIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily water intake:', error);
		throw error;
	}
};

/**
 * Get the user's daily protein intake.
 * @param {string} date - The date to get the protein intake for.
 * @returns {Promise} Axios Response Promise with the daily protein intake data.
 */
const getDailyProteinIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http:${LocalIP}:3000/stats/dailyProteinIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily protein intake:', error);
		throw error;
	}
};

/**
 * Get the user's daily carb intake.
 * @param {string} date - The date to get the carb intake for.
 * @returns {Promise} Axios Response Promise with the daily carb intake data.
 */
const getDailyCarbIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http:${LocalIP}:3000/stats/dailyCarbIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily carb intake:', error);
		throw error;
	}
};

/**
 * Get the user's daily fat intake.
 * @param {string} date - The date to get the fat intake for.
 * @returns {Promise} Axios Response Promise with the daily fat intake data.
 */
const getDailyFatIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http:${LocalIP}:3000/stats/dailyFatIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily fat intake:', error);
		throw error;
	}
};

/**
 * Get the user's daily sugar intake.
 * @param {string} date - The date to get the sugar intake for.
 * @returns {Promise} Axios Response Promise with the daily sugar intake data.
 */
const getDailySugarIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http:${LocalIP}:3000/stats/dailySugarIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily sugar intake:', error);
		throw error;
	}
};

/**
 * Get the user's daily sodium intake.
 * @param {string} date - The date to get the sodium intake for.
 * @returns {Promise} Axios Response Promise with the daily sodium intake data.
 */
const getDailySodiumIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http:${LocalIP}:3000/stats/dailySodiumIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily sodium intake:', error);
		throw error;
	}
};

/**
 * Get the user's daily fibre intake.
 * @param {string} date - The date to get the fibre intake for.
 * @returns {Promise} Axios Response Promise with the daily fibre intake data.
 */
const getDailyFibreIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http:${LocalIP}:3000/stats/dailyFibreIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
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
