// FoodContext.js
import React, {
    createContext, useState, useContext, useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as foodLogService from '../services/FoodLogService';
import PropTypes from 'prop-types';

const FoodLogContext = createContext();

export function FoodLogProvider({ children }) {

    const [latestLoggedFood, setLatestLoggedFood] = useState(null);

    const getLatestLoggedFood = async () => {

        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.error('Token not available');
            return;
        }
        const food = await foodLogService.getLatestLoggedFood();
        setLatestLoggedFood(food.data);
        console.log('Latest logged food:', food.data);
    }

    const logDatabaseFood = async (data) => {
        console.log('Logging food CONTEXT:', data);
        await foodLogService.logDatabaseFood(data);
        console.log('Food logged response given');
    }

    const createNewRecipeByUser = async (data) => {
        await foodLogService.createNewRecipeByUser(data);
    }

    const logRecipeFood = async (data) => {
        await foodLogService.logRecipeFood(data);
    }

    const duplicateRecipeToUser = async (data) => {
        await foodLogService.duplicateRecipeToUser(data);
    }

    const getFood = async () => {
        const response = await foodLogService.getFood();
        return response;
    }

    const searchFoods = async (params = {}) => {
        return await foodLogService.searchFoods(params);
    }

    const getRecipe = async () => {
        await foodLogService.getRecipe();
    }

    const getRecipeWeight = async () => {
        await foodLogService.getRecipeWeight();
    }

    const getRecipeMacro = async () => {
        await foodLogService.getRecipeMacro();
    }

    const getAllUserRecipes = async () => {
        const response = await foodLogService.getAllUserRecipes();
        return response.data.data;
    }

    const getRecipeIngredients = async () => {
        await foodLogService.getRecipeIngredients();
    }

    const getCommunityRecipes = async () => {
        await foodLogService.getCommunityRecipes();
    }

    const addItemToRecipe = async (data) => {
        await foodLogService.addItemToRecipe(data);
    }

    const deleteIngredientFromRecipe = async (data) => {
        await foodLogService.deleteIngredientFromRecipe(data);
    }

    const value = useMemo(() => ({
        latestLoggedFood,
        getLatestLoggedFood,
        logDatabaseFood,
        createNewRecipeByUser,
        logRecipeFood,
        duplicateRecipeToUser,
        getFood,
        searchFoods,
        getRecipe,
        getRecipeWeight,
        getRecipeMacro,
        getAllUserRecipes,
        getRecipeIngredients,
        getCommunityRecipes,
        addItemToRecipe,
        deleteIngredientFromRecipe,
    }), [latestLoggedFood, getLatestLoggedFood, logDatabaseFood, createNewRecipeByUser, logRecipeFood, duplicateRecipeToUser, getFood, searchFoods, getRecipe, getRecipeWeight, getRecipeMacro, getAllUserRecipes, getRecipeIngredients, getCommunityRecipes, addItemToRecipe, deleteIngredientFromRecipe]);

    return (
        <FoodLogContext.Provider value={value}>
            {children}
        </FoodLogContext.Provider>
    );

}

export const useFoodLog = () => useContext(FoodLogContext);

FoodLogProvider.propTypes = {
    children: PropTypes.node.isRequired,
};