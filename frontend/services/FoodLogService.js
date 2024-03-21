import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';

export const logDatabaseFood = async (data) => {
    const token = await AsyncStorage.getItem('token');
    console.log('Logging food SERVICE:', data);
    return await axios.post(`http://${LocalIP}:3000/food/logDatabaseFood`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const createNewRecipeByUser = async (data) => {
    const token = await AsyncStorage.getItem('token');
    return await axios.post(`http://${LocalIP}:3000/food/createNewRecipeByUser`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const logRecipeFood = async (data) => {
    const token = await AsyncStorage.getItem('token');
    return await axios.post(`http://${LocalIP}:3000/food/logRecipeFood`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const duplicateRecipeToUser = async (data) => {
    const token = await AsyncStorage.getItem('token');
    return await axios.post(`http://${LocalIP}:3000/food/duplicateRecipe`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const getFood = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://${LocalIP}:3000/food/getFood`, { headers: { Authorization: `Bearer ${token}` } });
        return response;
    } catch (error) {
        console.error('Error fetching food:', error);
        throw error; // re-throw the error if you want to handle it further up the call stack
    }
}

export const searchFoods = async (params) => {
    const token = await AsyncStorage.getItem('token');
    return await axios.get(`http://${LocalIP}:3000/food/searchFoods`, { 
        headers: { Authorization: `Bearer ${token}` },
        params: params
    });
}

export const getRecipe = async () => {
    const token = await AsyncStorage.getItem('token');
    return await axios.get(`http://${LocalIP}:3000/food/getRecipe`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getRecipeWeight = async () => {
    const token = await AsyncStorage.getItem('token');
    return await axios.get(`http://${LocalIP}:3000/food/getRecipeWeight`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getRecipeMacro = async () => {
    const token = await AsyncStorage.getItem('token');
    return await axios.get(`http://${LocalIP}:3000/food/getRecipeMacro`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getAllUserRecipes = async () => {
    const token = await AsyncStorage.getItem('token');
    return await axios.get(`http://${LocalIP}:3000/food/getUserRecipes`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getRecipeIngredients = async () => {
    const token = await AsyncStorage.getItem('token');
    return await axios.get(`http://${LocalIP}:3000/food/getRecipeIngredients`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getCommunityRecipes = async () => {
    const token = await AsyncStorage.getItem('token');
    return await axios.get(`http://${LocalIP}:3000/food/getCommunityRecipes`, { headers: { Authorization: `Bearer ${token}` } });
}

export const getLatestLoggedFood = async () => {
    const token = await AsyncStorage.getItem('token');
    return await axios.get(`http://${LocalIP}:3000/food/getLatestLoggedFood`, { headers: { Authorization: `Bearer ${token}` } });
}

export const addItemToRecipe = async (data) => {
    const token = await AsyncStorage.getItem('token');
    return await axios.put(`http://${LocalIP}:3000/food/addItemToRecipe`, data, { headers: { Authorization: `Bearer ${token}` } });
}

export const deleteIngredientFromRecipe = async (data) => {
    const token = await AsyncStorage.getItem('token');
    return await axios.delete(`http://${LocalIP}:3000/food/deleteItemFromRecipe`, data, { headers: { Authorization: `Bearer ${token}` } });
}