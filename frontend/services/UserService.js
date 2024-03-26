import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchUserDetails = async (token) => {
	try {
		const response = await axios.get(`http://api.gobl-up.me:80/userDetails`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		if (error.response) {  } else if (error.request) {
			console.log(error.request);
		} else {
			console.log('Error', error.message);
		}
		console.log(error.config);
		return null;
	}
};

export const editUserDetails = async (newValues) => {
	try {
		const token = await AsyncStorage.getItem('token');
		const response = await axios.put(`http://api.gobl-up.me:80/updateProfile`, newValues, {
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