import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * Log a food item from the database.
 * @param {Object} data - The data of the food item to log.
 * @returns {Promise} Axios Response Promise with the log operation result.
 */
export const logDatabaseFood = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.post(`http://api.gobl-up.me:80/food/logDatabaseFood`, data, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Create a new recipe by the user.
 * @param {Object} data - The data of the new recipe.
 * @returns {Promise} Axios Response Promise with the create operation result.
 */
export const createNewRecipeByUser = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.post(`http://api.gobl-up.me:80/food/createNewRecipeByUser`, data, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Log a food item from a recipe.
 * @param {Object} data - The data of the food item to log.
 * @returns {Promise} Axios Response Promise with the log operation result.
 */
export const logRecipeFood = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.post(`http://api.gobl-up.me:80/food/logRecipeFood`, data, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Duplicate a recipe to the user's recipes.
 * @param {Object} data - The data of the recipe to duplicate.
 * @returns {Promise} Axios Response Promise with the duplicate operation result.
 */
export const duplicateRecipeToUser = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.post(`http://api.gobl-up.me:80/food/duplicateRecipe`, data, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Get all food items.
 * @returns {Promise} Axios Response Promise with all food items.
 */
export const getFood = async () => {
	try {
		const token = await AsyncStorage.getItem('token');
		const response = await axios.get(`http://api.gobl-up.me:80/food/getFood`, { headers: { Authorization: `Bearer ${token}` } });
		return response;
	} catch (error) {
		console.error('Error fetching food:', error);
		throw error;
	}
}

/**
 * Search for food items.
 * @param {Object} params - The search parameters.
 * @returns {Promise} Axios Response Promise with the search results.
 */
export const searchFoods = async (params) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/searchFoods`, { 
		headers: { Authorization: `Bearer ${token}` },
		params: params
	});
}

/**
 * Get a recipe.
 * @returns {Promise} Axios Response Promise with the recipe.
 */
export const getRecipe = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getRecipe`, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Get the weight of a recipe.
 * @returns {Promise} Axios Response Promise with the recipe weight.
 */
export const getRecipeWeight = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getRecipeWeight`, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Get the macro of a recipe.
 * @returns {Promise} Axios Response Promise with the recipe macro.
 */
export const getRecipeMacro = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getRecipeMacro`, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Get all user's recipes.
 * @returns {Promise} Axios Response Promise with all user's recipes.
 */
export const getAllUserRecipes = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getUserRecipes`, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Get the ingredients of a recipe.
 * @returns {Promise} Axios Response Promise with the recipe ingredients.
 */
export const getRecipeIngredients = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getRecipeIngredients`, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Get all community recipes.
 * @returns {Promise} Axios Response Promise with all community recipes.
 */
export const getCommunityRecipes = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getCommunityRecipes`, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Get the latest logged food item.
 * @returns {Promise} Axios Response Promise with the latest logged food item.
 */
export const getLatestLoggedFood = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getLatestLoggedFood`, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Add an item to a recipe.
 * @param {Object} data - The data of the item to add.
 * @returns {Promise} Axios Response Promise with the add operation result.
 */
export const addItemToRecipe = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.put(`http://api.gobl-up.me:80/food/addItemToRecipe`, data, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Delete an ingredient from a recipe.
 * @param {Object} data - The data of the ingredient to delete.
 * @returns {Promise} Axios Response Promise with the delete operation result.
 */
export const deleteIngredientFromRecipe = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.delete(`http://api.gobl-up.me:80/food/deleteItemFromRecipe`, data, { headers: { Authorization: `Bearer ${token}` } });
}

/**
 * Log a water intake.
 * @param {Object} data - The data of the water intake to log.
 * @returns {Promise} Axios Response Promise with the log operation result.
 */
export const logWater = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.post(`http://api.gobl-up.me:80/food/logWater`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const getPictureURL = async (RecipeId) => {
	console.log('RecipeID:' + RecipeId);
	const token = await AsyncStorage.getItem('token');
	const response = await axios.get(`http://api.gobl-up.me:80/image/getPictureURL?id=${RecipeId}&folderName=Recipe_Pictures`, { headers: { Authorization: `Bearer ${token}` } });
	const url =  response.data.url;
	return url;
}

export const logManualMacro = async (data) => {
	try {
		const token = await AsyncStorage.getItem('token');
		const response = await axios.post(`http://api.gobl-up.me:80/food/logManualMacro`, data, { headers: { Authorization: `Bearer ${token}` } });
		return response;
	} catch (error) {
		console.error('Error logging manual macro:', error);
		throw error; // re-throw the error so it can be handled by the calling function
	}
}