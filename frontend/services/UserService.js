// userService.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';

const fetchUserDetails = async (token) => {
	try {
		const response = await axios.get(`http://${LocalIP}:3000/userDetails`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		return response.data;
	} catch (error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
		} else if (error.request) {
			// The request was made but no response was received
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
		console.log(error.config);
		return null;
	}
};

const editUserDetails = async (field, newValue) => {
	try {
		const token = await AsyncStorage.getItem('token');
		// const response = await axios.put(`http://${LocalIP}:3000/updateProfile`
		await axios.put(`http://${LocalIP}:3000/updateProfile`, {
			[field]: newValue,
		}, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		// console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};
// Add other user-related functions, like login and register

export default {
	fetchUserDetails,
	editUserDetails,
};
