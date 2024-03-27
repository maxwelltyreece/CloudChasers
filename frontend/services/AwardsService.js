import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Create a new award with the provided data.
 * @param {Object} awardData The data for the new award.
 * @returns {Promise} Axios Response Promise with the created award.
 */
const createAward = async (awardData) => {
	const token = await AsyncStorage.getItem('token');
	return axios.post(`http://api.gobl-up.me:80/awards/createAward`, awardData, {
		headers: { Authorization: `Bearer ${token}` }
	});
};

/**
 * Retrieves all awards.
 * @returns {Promise} Axios Response Promise with all awards.
 */
const getAllAwards = async () => {
	const token = await AsyncStorage.getItem('token');
	return axios.get(`http://api.gobl-up.me:80/awards/getAllAwards`, {
		headers: { Authorization: `Bearer ${token}` }
	});
};

/**
 * Retrieves a single award by its ID.
 * @param {String} awardId The ID of the award to retrieve.
 * @returns {Promise} Axios Response Promise with the requested award.
 */
const getAward = async (awardId) => {
	const token = await AsyncStorage.getItem('token');
	return axios.get(`http://api.gobl-up.me:80/awards/getAward`, {
		headers: { Authorization: `Bearer ${token}` },
		params: { awardId }
	});
};

/**
 * Awards a user.
 * @param {Object} awardData Data containing award ID and user ID.
 * @returns {Promise} Axios Response Promise after awarding the user.
 */
const awardUser = async (awardData) => {
	const token = await AsyncStorage.getItem('token');
	return axios.post(`http://api.gobl-up.me:80/awards/awardUser`, awardData, {
		headers: { Authorization: `Bearer ${token}` }
	});
};

/**
 * Retrieves awards given to a user.
 * @returns {Promise} Axios Response Promise with the user's awards.
 */
const getUserAwards = async () => {
	const token = await AsyncStorage.getItem('token');
	return axios.get(`http://api.gobl-up.me:80/awards/getUserAwards`, {
		headers: { Authorization: `Bearer ${token}` }
	});
};

/**
 * Retrieves awards that are ready to be issued to users based on certain criteria.
 * @returns {Promise} Axios Response Promise with awards to be issued.
 */
const getAwardsToBeIssued = async () => {
	const token = await AsyncStorage.getItem('token');
	return axios.get(`http://api.gobl-up.me:80/awards/getAwardsToBeIssued`, {
		headers: { Authorization: `Bearer ${token}` }
	});
};

/**
 * Retrieves the number of completed awards by a user and the total awards.
 * @returns {Promise} Axios Response Promise with completed awards and total awards.
 */
const getNumberOfCompletedAwards = async () => {
	const token = await AsyncStorage.getItem('token');
	return axios.get(`http://api.gobl-up.me:80/awards/getNumberOfCompletedAwards`, {
		headers: { Authorization: `Bearer ${token}` }
	});
};

export default {
	createAward,
	getAllAwards,
	getAward,
	awardUser,
	getUserAwards,
	getAwardsToBeIssued,
	getNumberOfCompletedAwards,
};
