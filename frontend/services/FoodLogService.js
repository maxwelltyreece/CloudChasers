import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';

const getLatestLoggedFood = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://${LocalIP}:3000/food/getLatestLoggedFood`, { 
            headers: { Authorization: `Bearer ${token}` } 
        });
        return response;
    } catch (error) { 
        // Check if the error is due to a 404 status code
        if (error.response && error.response.status === 404) {
            return {}; // Return an empty object for a 404 error
        }
        console.error('Error fetching latest logged food SERVICE:', error);
        throw error; // For any other errors, re-throw them to be handled elsewhere
    }
}

export default {
    getLatestLoggedFood,
};