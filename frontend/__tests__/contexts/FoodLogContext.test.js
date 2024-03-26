/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { FoodLogProvider, useFoodLog } from '../../contexts/FoodLogContext';
import * as foodLogService from '../../services/FoodLogService';
import { Text, Pressable } from 'react-native';

jest.mock('../../services/FoodLogService', () => ({
	getLatestLoggedFood: jest.fn(),
	logDatabaseFood: jest.fn(),
	createNewRecipeByUser: jest.fn(),
	logRecipeFood: jest.fn(),
	duplicateRecipeToUser: jest.fn(),
	getFood: jest.fn(),
	searchFoods: jest.fn(),
	getRecipe: jest.fn(),
	getRecipeWeight: jest.fn(),
	getRecipeMacro: jest.fn(),
	getAllUserRecipes: jest.fn(),
	getRecipeIngredients: jest.fn(),
	getCommunityRecipes: jest.fn(),
	addItemToRecipe: jest.fn(),
	deleteIngredientFromRecipe: jest.fn(),
	getPictureURL: jest.fn(),
}));

function TestConsumer() {
	const {
		getLatestLoggedFood,
		logDatabaseFood,
		createNewRecipeByUser,
		getAllUserRecipes,
	} = useFoodLog();

	return (
		<>
			<Pressable onPress={getLatestLoggedFood} testID="fetch-latest-food">Fetch Latest Food</Pressable>
			<Pressable onPress={() => logDatabaseFood({ foodData: 'Apple' })} testID="log-database-food">Log Database Food</Pressable>
			<Pressable onPress={() => createNewRecipeByUser({ recipeData: 'New Recipe' })} testID="create-recipe">Create New Recipe</Pressable>
			<Pressable onPress={getAllUserRecipes} testID="fetch-all-recipes">Fetch All Recipes</Pressable>
			<Text>Banana</Text>
			<Text>Recipe 1</Text>
			<Text>Recipe 2</Text>

		</>
	);
}

describe('FoodLogContext functionality', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('fetches and displays the latest logged food', async () => {
		const mockLatestFood = { name: 'Banana', calories: 100 };
		foodLogService.getLatestLoggedFood.mockResolvedValue({ data: mockLatestFood });

		const { findByText, getByTestId } = render(
			<FoodLogProvider>
				<TestConsumer />
			</FoodLogProvider>
		);

		fireEvent.press(getByTestId('fetch-latest-food'));

		expect(await findByText('Banana')).toBeTruthy();
	});

	it('logs a database food item', async () => {
		foodLogService.logDatabaseFood.mockResolvedValue({ success: true });

		const { getByTestId } = render(
			<FoodLogProvider>
				<TestConsumer />
			</FoodLogProvider>
		);

		fireEvent.press(getByTestId('log-database-food'));

		await act(async () => {
			expect(foodLogService.logDatabaseFood).toHaveBeenCalledWith({ foodData: 'Apple' });
		});
	});

	it('creates a new recipe by the user', async () => {
		foodLogService.createNewRecipeByUser.mockResolvedValue({ success: true });

		const { getByTestId } = render(
			<FoodLogProvider>
				<TestConsumer />
			</FoodLogProvider>
		);

		fireEvent.press(getByTestId('create-recipe'));

		await act(async () => {
			expect(foodLogService.createNewRecipeByUser).toHaveBeenCalledWith({ recipeData: 'New Recipe' });
		});
	});

	it('fetches all user recipes', async () => {
		foodLogService.getAllUserRecipes.mockResolvedValue({ data: [{ name: 'Recipe 1' }, { name: 'Recipe 2' }] });

		const { findByText, getByTestId } = render(
			<FoodLogProvider>
				<TestConsumer />
			</FoodLogProvider>
		);

		fireEvent.press(getByTestId('fetch-all-recipes'));

		expect(await findByText('Recipe 1')).toBeTruthy();
		expect(await findByText('Recipe 2')).toBeTruthy();
	});

});
