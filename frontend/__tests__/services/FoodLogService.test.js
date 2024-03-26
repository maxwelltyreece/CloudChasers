/* eslint-disable no-undef */
import * as FoodLogService from '../../services/FoodLogService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(),
}));

jest.mock('axios');

describe('FoodLogService', () => {
	const token = 'test-token';
	const data = { key: 'value' };
	const params = { search: 'query' };

	beforeEach(() => {
		AsyncStorage.getItem.mockResolvedValue(token);
		axios.get.mockClear();
		axios.post.mockClear();
		axios.put.mockClear();
		axios.delete.mockClear();
	});

	describe('logDatabaseFood', () => {
		it('should log food to the database successfully', async () => {
			const mockResponse = { data: { success: true, message: 'Food logged successfully' } };
			axios.post.mockResolvedValue(mockResponse);

			const result = await FoodLogService.logDatabaseFood(data);

			expect(axios.post).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/logDatabaseFood`, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockResponse.data);
		});
	});

	describe('createNewRecipeByUser', () => {
		it('should create a new recipe by the user successfully', async () => {
			const mockResponse = { data: { success: true, message: 'Recipe created successfully' } };
			axios.post.mockResolvedValue(mockResponse);

			const result = await FoodLogService.createNewRecipeByUser(data);

			expect(axios.post).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/createNewRecipeByUser`, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockResponse.data);
		});
	});

	describe('searchFoods', () => {
		it('should search foods successfully', async () => {
			const mockResponse = { data: [{ id: '1', name: 'Apple' }] };
			axios.get.mockResolvedValue(mockResponse);

			const result = await FoodLogService.searchFoods(params);

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/searchFoods`, {
				headers: { Authorization: `Bearer ${token}` },
				params: params,
			});
			expect(result.data).toEqual(mockResponse.data);
		});
	});

	describe('logRecipeFood', () => {
		it('should log recipe food successfully', async () => {
			axios.post.mockResolvedValue({ data: { success: true, message: 'Recipe food logged successfully' } });
			const result = await FoodLogService.logRecipeFood(data);
			expect(axios.post).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/logRecipeFood`, data, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data.success).toBe(true);
		});

		it('should handle errors when logging recipe food fails', async () => {
			axios.post.mockRejectedValue(new Error('Failed to log recipe food'));
			await expect(FoodLogService.logRecipeFood(data)).rejects.toThrow('Failed to log recipe food');
		});

		describe('duplicateRecipeToUser', () => {
			it('should duplicate recipe for user successfully', async () => {
				axios.post.mockResolvedValue({ data: { success: true, message: 'Recipe duplicated successfully' } });
				const result = await FoodLogService.duplicateRecipeToUser(data);
				expect(axios.post).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/duplicateRecipe`, data, {
					headers: { Authorization: `Bearer ${token}` },
				});
				expect(result.data.success).toBe(true);
			});

			it('should handle errors when duplicating recipe fails', async () => {
				axios.post.mockRejectedValue(new Error('Failed to duplicate recipe'));
				await expect(FoodLogService.duplicateRecipeToUser(data)).rejects.toThrow('Failed to duplicate recipe');
			});
		});


		describe('getFood', () => {
			it('should fetch food successfully', async () => {
				axios.get.mockResolvedValue({ data: [{ id: '1', name: 'Apple' }] });
				const result = await FoodLogService.getFood();
				expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/getFood`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				expect(result.data.length).toBeGreaterThan(0);
			});

			it('should handle errors when fetching food fails', async () => {
				axios.get.mockRejectedValue(new Error('Failed to fetch food'));
				await expect(FoodLogService.getFood()).rejects.toThrow('Failed to fetch food');
			});
		});
	});

	describe('getRecipe', () => {
		it('should fetch a recipe successfully', async () => {
			const mockResponse = { data: { id: '1', name: 'Tomato Soup' } };
			axios.get.mockResolvedValue(mockResponse);

			const result = await FoodLogService.getRecipe();

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/getRecipe`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockResponse.data);
		});

		it('should handle errors when fetching a recipe fails', async () => {
			axios.get.mockRejectedValue(new Error('Failed to fetch recipe'));
			await expect(FoodLogService.getRecipe()).rejects.toThrow('Failed to fetch recipe');
		});
	});


	describe('getRecipeIngredients', () => {
		it('should fetch recipe ingredients successfully', async () => {
			const mockIngredients = [{ id: '1', name: 'Tomato', amount: '2 cups' }];
			axios.get.mockResolvedValue({ data: mockIngredients });

			const result = await FoodLogService.getRecipeIngredients();

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/getRecipeIngredients`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockIngredients);
		});
	});

	describe('getAllUserRecipes', () => {
		it('should fetch all user recipes successfully', async () => {
			const mockRecipes = [{ id: '1', name: 'Tomato Soup' }];
			axios.get.mockResolvedValue({ data: mockRecipes });

			const result = await FoodLogService.getAllUserRecipes();

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/getUserRecipes`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockRecipes);
		});
	});


	describe('getLatestLoggedFood', () => {
		it('should fetch the latest logged food successfully', async () => {
			const mockLoggedFood = [{ id: '1', name: 'Apple Pie', dateLogged: '2024-03-23' }];
			axios.get.mockResolvedValue({ data: mockLoggedFood });

			const result = await FoodLogService.getLatestLoggedFood();

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/getLatestLoggedFood`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockLoggedFood);
		});
	});

	describe('getCommunityRecipes', () => {
		it('should fetch the community recipes successfully', async () => {
			const mockRecipes = [{ id: '1', name: 'Community Tomato Soup' }];
			axios.get.mockResolvedValue({ data: mockRecipes });

			const result = await FoodLogService.getCommunityRecipes();

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/getCommunityRecipes`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockRecipes);
		});
	});

	describe('getRecipeWeight', () => {
		it('should fetch the recipe weight successfully', async () => {
			const mockWeight = { totalWeight: '500 grams' };
			axios.get.mockResolvedValue({ data: mockWeight });

			const result = await FoodLogService.getRecipeWeight();

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/getRecipeWeight`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockWeight);
		});
	});

	describe('getRecipeMacro', () => {
		it('should fetch the recipe macro successfully', async () => {
			const mockMacro = { calories: 300, protein: '20g', carbs: '30g', fats: '10g' };
			axios.get.mockResolvedValue({ data: mockMacro });

			const result = await FoodLogService.getRecipeMacro();

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/food/getRecipeMacro`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockMacro);
		})
	});
});
