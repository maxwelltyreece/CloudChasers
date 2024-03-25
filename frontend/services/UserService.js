import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';

export const fetchUserDetails = async (token) => {
	try {
		const response = await axios.get(`http://${LocalIP}:3000/userDetails`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
		console.log(error.config);
		return null;
	}
};

export const editUserDetails = async (newValues) => {
	console.log("STARTING Server Side");
	console.log(newValues);
	try {
		const token = await AsyncStorage.getItem('token');
		console.log("Token", token);
		const response = await axios.put(`http://${LocalIP}:3000/updateProfile`, newValues, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};