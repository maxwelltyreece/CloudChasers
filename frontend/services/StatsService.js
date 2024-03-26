import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const getStreaks = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		const response = await axios.post(`http://api.gobl-up.me:80/stats/streak`, { today: date }, {
			headers: { Authorization: `Bearer ${token}` }
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching streak data:', error);
		throw error;
	}
};


const getDailyCaloricIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://api.gobl-up.me:80/stats/dailyCaloricIntake?date=${date}`, { 
			headers: { Authorization: `Bearer ${token}` } 
		});
	} catch (error) {
		console.error('Error fetching daily caloric intake SERVICE:', error);
		throw error;
	}
};

const getDailyWaterIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://api.gobl-up.me:80/stats/dailyWaterIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily water intake:', error);
		throw error;
	}
};

const getDailyProteinIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://api.gobl-up.me:80/stats/dailyProteinIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily protein intake:', error);
		throw error;
	}
};

const getDailyCarbIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://api.gobl-up.me:80/stats/dailyCarbIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily carb intake:', error);
		throw error;
	}
};

const getDailyFatIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://api.gobl-up.me:80/stats/dailyFatIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily fat intake:', error);
		throw error;
	}
};

const getDailySugarIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://api.gobl-up.me:80/stats/dailySugarIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily sugar intake:', error);
		throw error;
	}
};

const getDailySodiumIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://api.gobl-up.me:80/stats/dailySodiumIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching daily sodium intake:', error);
		throw error;
	}
};

const getDailyFibreIntake = async (date) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://api.gobl-up.me:80/stats/dailyFibreIntake?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
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
