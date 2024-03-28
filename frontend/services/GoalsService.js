import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';

/**
 * Creates a new goal with the provided data.
 * @param {Object} goalData The data for the new goal.
 * @returns {Promise} Axios Response Promise with the created goal.
 */
const createGoal = async (goalData) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.post(`http://${LocalIP}:3000/goals/createGoal`, goalData, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error creating goal:', error);
		throw error;
	}
};

/**
 * Retrieves all goals associated with the user.
 * @returns {Promise} Axios Response Promise with the user's goals.
 */
const getAllGoalsOfUser = async () => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://${LocalIP}:3000/goals/getAllGoalsOfUser`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching all goals of user:', error);
		throw error;
	}
};

/**
 * Retrieves a single goal item by its ID.
 * @param {String} goalId The ID of the goal to retrieve.
 * @returns {Promise} Axios Response Promise with the requested goal item.
 */
const getSingleGoalItem = async (goalId) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://${LocalIP}:3000/getSingleGoalItem?goalId=${goalId}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching single goal item:', error);
		throw error;
	}
};

/**
 * Deletes a goal by its ID.
 * @param {String} goalId The ID of the goal to delete.
 * @returns {Promise} Axios Response Promise after deleting the goal.
 */
const deleteGoal = async (goalId) => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://${LocalIP}:3000/deleteGoal?goalId=${goalId}`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error deleting goal:', error);
		throw error;
	}
};

/**
 * Updates a goal by its ID with the provided update data.
 * @param {String} goalId The ID of the goal to update.
 * @param {Object} updateData The data to update the goal with.
 * @returns {Promise} Axios Response Promise with the updated goal.
 */
const updateGoal = async (goalId, updateData) => {
	try {
		const token = await AsyncStorage.getItem('token');
		const payload = {
			goalID: goalId,
			...updateData
		};
		return await axios.post(`http://${LocalIP}:3000/goals/updateGoal`, payload, {
			headers: { Authorization: `Bearer ${token}` }
		});
	} catch (error) {
		console.error('Error updating goal SERVICE:', error);
		throw error;
	}
};


/**
 * Retrieves the macro goal for the user.
 * @returns {Promise} Axios Response Promise with the macro goal.
 */
const getMacroGoals = async () => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://${LocalIP}:3000/goals/getMacroGoal`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching macro goal:', error);
		throw error;
	}
};

/**
 * Updates a specific macro goal for the user.
 * @param {Object} macroGoalData The data for the macro goal to update.
 * @returns {Promise} Axios Response Promise with the updated macro goal.
 */
const updateMacroGoals = async (nutrient) => {
	try {
		const token = await AsyncStorage.getItem('token');
		const payload = {
			macro: nutrient.nutrient,
			newMinValue: 0, // Min value is always 0
			newMaxValue: nutrient.value
		};
		return await axios.post(`http://${LocalIP}:3000/goals/changeGoalMacroValue`, payload, {
			headers: { Authorization: `Bearer ${token}` }
		});
	} catch (error) {
		console.error('Error updating macro goal:', error);
		throw error;
	}
};



/**
 * Retrieves untracked macro goals for the user.
 * @returns {Promise} Axios Response Promise with untracked macro goals.
 */
const getUntrackedMacroGoals = async () => {
	try {
		const token = await AsyncStorage.getItem('token');
		return await axios.get(`http://${LocalIP}:3000/getUntrackedMacroGoals`, { headers: { Authorization: `Bearer ${token}` } });
	} catch (error) {
		console.error('Error fetching untracked macro goals:', error);
		throw error;
	}
};

export default {
	createGoal,
	getAllGoalsOfUser,
	getSingleGoalItem,
	deleteGoal,
	updateGoal,
	getMacroGoals,
	getUntrackedMacroGoals,
	updateMacroGoals,
};
