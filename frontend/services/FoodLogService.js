import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const logDatabaseFood = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.post(`http://api.gobl-up.me:80/food/logDatabaseFood`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const createNewRecipeByUser = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.post(`http://api.gobl-up.me:80/food/createNewRecipeByUser`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const logRecipeFood = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.post(`http://api.gobl-up.me:80/food/logRecipeFood`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const duplicateRecipeToUser = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.post(`http://api.gobl-up.me:80/food/duplicateRecipe`, data, { headers: { Authorization: `Bearer ${token}` } });
}

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

export const searchFoods = async (params) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/searchFoods`, { 
		headers: { Authorization: `Bearer ${token}` },
		params: params
	});
}

export const getRecipe = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getRecipe`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getRecipeWeight = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getRecipeWeight`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getRecipeMacro = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getRecipeMacro`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getAllUserRecipes = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getUserRecipes`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getRecipeIngredients = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getRecipeIngredients`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getCommunityRecipes = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getCommunityRecipes`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getLatestLoggedFood = async () => {
	const token = await AsyncStorage.getItem('token');
	return await axios.get(`http://api.gobl-up.me:80/food/getLatestLoggedFood`, { headers: { Authorization: `Bearer ${token}` } });
}

export const addItemToRecipe = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.put(`http://api.gobl-up.me:80/food/addItemToRecipe`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const deleteIngredientFromRecipe = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.delete(`http://api.gobl-up.me:80/food/deleteItemFromRecipe`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const logWater = async (data) => {
	const token = await AsyncStorage.getItem('token');
	return await axios.post(`http://api.gobl-up.me:80/food/logWater`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const getPictureURL = async (RecipeId) => {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.get(`http://api.gobl-up.me:80/image/getPictureURL?id=${RecipeId}&folderName=Recipe_Pictures`, { headers: { Authorization: `Bearer ${token}` } });
	const url =  response.data.url;
	return url;
}