import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Fetch user details from the server.
 * @param {string} token - The user's authentication token.
 * @returns {Promise<Object>} Promise that resolves to the user's details.
 */
export const fetchUserDetails = async (token) => {
	try {
		const response = await axios.get(`http://api.gobl-up.me:80/userDetails`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		if (error.response) {
			console.error(error.response.data);
		} else if (error.request) {
			console.error(error.request);
		} else {
			console.error('Error', error.message);
		}
		return null;
	}
};

/**
 * Edit user details on the server.
 * @param {Object} newValues - The new values for the user's details.
 * @returns {Promise<Object>} Promise that resolves to the updated user's details.
 */
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