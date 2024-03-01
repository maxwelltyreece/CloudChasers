// userService.js
import axios from 'axios';
import { LocalIP } from '../screens/IPIndex'; // adjust the path as needed

const getUserDetails = async (token) => {
	try {
		const response = await axios.get(`http://${LocalIP}:3000/userDetails`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data.data;
	} catch (error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
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

const updateUserDetails = async (userId, newDetails) => {
	const response = await axios.put(`http://${LocalIP}:3000/users/${userId}`, newDetails);
	return response.data;
};

// Add other user-related functions, like login and register

export default {
	getUserDetails,
	updateUserDetails,
};
