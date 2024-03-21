import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';

export async function getUser() {
    try {
        console.log('getUserDetails function called');
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://${LocalIP}:3000/users`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status !== 200) {
            console.error(`HTTP error! status: ${response.status}`);
            return false;
        }

        const jsonResponse = response.data;
        if (jsonResponse.success) {
            console.log(jsonResponse.message);
            return jsonResponse;
        }
        console.error(jsonResponse.message);
        return false;
    } catch (error) {
        console.error('There was a problem with the axios operation: ', error);
        return false;
    }
}

export async function getUserDetails() {
    try {
        console.log('getUserDetails function called');
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://${LocalIP}:3000/userDetails`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status !== 200) {
            console.error(`HTTP error! status: ${response.status}`);
            return false;
        }

        const jsonResponse = response;
        console.log(jsonResponse); // log the jsonResponse object

        if (jsonResponse.success) {
            console.log(jsonResponse.message);
            return jsonResponse.data;
        }
        console.error(jsonResponse.message);
        return false;
    } catch (error) {
        console.error('There was a problem with the axios operation: ', error);
        return false;
    }
}

export async function getUserDays() {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://${LocalIP}:3000/userDays`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status !== 200) {
            console.error(`HTTP error! status: ${response.status}`);
            return false;
        }

        const jsonResponse = response.data;
        if (jsonResponse.success) {
            console.log(jsonResponse.message);
            return jsonResponse;
        }
        console.error(jsonResponse.message);
        return false;
    } catch (error) {
        console.error('There was a problem with the axios operation: ', error);
        return false;
    }
}

// Add other functions for login, getUsers, getUserDetail, updateProfile, getUserDays