import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';

const getLatestLoggedFood = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return await axios.get(`${LocalIP}/food/getLatestLoggedFood`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
        console.error('Error fetching latest logged food:', error);
        throw error;
    }
}

export default {
    getLatestLoggedFood,
};