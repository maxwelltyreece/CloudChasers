import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LocalIP } from '../screens/IPIndex'; 

export async function fetchUserDetails() {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token);
        const response = await axios.get(`http://${LocalIP}:3000/userDetails`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('User details:', response.data.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}