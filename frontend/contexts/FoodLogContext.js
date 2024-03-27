import React, {
	createContext, useState, useContext, useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as foodLogService from '../services/FoodLogService';
import PropTypes from 'prop-types';

const FoodLogContext = createContext();

export function FoodLogProvider({ children }) {
  const [latestLoggedFood, setLatestLoggedFood] = useState(null);

  /**
   * Retrieves the latest food item logged by the user.
   * Requires authentication token to be stored in AsyncStorage.
   */
  const getLatestLoggedFood = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.error("Token not available");
      return;
    }
    const food = await foodLogService.getLatestLoggedFood();
    setLatestLoggedFood(food.data);
    console.log("Latest logged food:", food.data);
  };

  /**
   * Logs a food item into the database.
   * @param {Object} data - Data for the food item to be logged.
   */
  const logDatabaseFood = async (data) => {
    console.log("Logging food CONTEXT:", data);
    await foodLogService.logDatabaseFood(data);
    console.log("Food logged response given");
  };

/**
 * Creates a new recipe by user.
 * @param {Object} data - The data for the new recipe.
 */
const createNewRecipeByUser = async (data) => {
	await foodLogService.createNewRecipeByUser(data);
};

/**
 * Logs recipe food.
 * @param {Object} data - The data for the recipe food.
 */
const logRecipeFood = async (data) => {
	await foodLogService.logRecipeFood(data);
};

/**
 * Duplicates a recipe to user.
 * @param {Object} data - The data for the recipe to duplicate.
 */
const duplicateRecipeToUser = async (data) => {
	await foodLogService.duplicateRecipeToUser(data);
};

/**
 * Gets food.
 * @returns {Promise} The response from the food log service.
 */
const getFood = async () => {
	const response = await foodLogService.getFood();
	return response;
};

/**
 * Searches foods.
 * @param {Object} [params={}] - The search parameters.
 * @returns {Promise} The response from the food log service.
 */
const searchFoods = async (params = {}) => {
	return await foodLogService.searchFoods(params);
};

/**
 * Gets a recipe.
 */
const getRecipe = async () => {
	await foodLogService.getRecipe();
};

/**
 * Gets a recipe weight.
 */
const getRecipeWeight = async () => {
	await foodLogService.getRecipeWeight();
};

/**
 * Gets a recipe macro.
 */
const getRecipeMacro = async () => {
	await foodLogService.getRecipeMacro();
};

/**
 * Gets all user recipes.
 * @returns {Promise} The data from the food log service.
 */
const getAllUserRecipes = async () => {
	const response = await foodLogService.getAllUserRecipes();
	return response.data.data;
};

/**
 * Gets recipe ingredients.
 * @param {string} id - The ID of the recipe.
 * @returns {Promise} The data from the food log service.
 */
const getRecipeIngredients = async (id) => {
	const response = await foodLogService.getRecipeIngredients(id);
	return response.data.data;
};

/**
 * Gets community recipes.
 */
const getCommunityRecipes = async () => {
	await foodLogService.getCommunityRecipes();
};

/**
 * Adds an item to a recipe.
 * @param {Object} data - The data for the item to add.
 */
const addItemToRecipe = async (data) => {
	await foodLogService.addItemToRecipe(data);
};

/**
 * Deletes an ingredient from a recipe.
 * @param {Object} data - The data for the ingredient to delete.
 */
const deleteIngredientFromRecipe = async (data) => {
	await foodLogService.deleteIngredientFromRecipe(data);
};

/**
 * Gets a picture URL.
 * @param {Object} data - The data for the picture.
 * @returns {Promise} The URL from the food log service.
 */
const getPictureURL = async (data) => {
	return await foodLogService.getPictureURL(data);
};

/**
 * Logs water.
 * @param {Object} data - The data for the water to log.
 */
const logWater = async (data) => {
	await foodLogService.logWater(data);
};

/**
 * Logs manual macro.
 * @param {Object} data - The data for the manual macro to log.
 */
const logManualMacro = async (data) => {
	await foodLogService.logManualMacro(data);
};
  const value = useMemo(
    () => ({
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
      getPictureURL,
      logWater,
      logManualMacro,
    }),
    [
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
      getPictureURL,
      logWater,
      logManualMacro,
    ]
  );

  return (
    <FoodLogContext.Provider value={value}>{children}</FoodLogContext.Provider>
  );
}

export const useFoodLog = () => useContext(FoodLogContext);

FoodLogProvider.PropTypes = {
	children: PropTypes.node.isRequired,
};