/* eslint-disable no-undef */
import goalsService from '../../services/GoalsService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(),
}));

// Mock Axios
jest.mock('axios');

describe('goalsService', () => {
	const token = 'test-token';
	const goalId = 'test-goal-id';
	const goalData = { goal: 'Run 5km daily' };

	beforeEach(() => {
		AsyncStorage.getItem.mockResolvedValue(token);
		axios.get.mockClear();
		axios.post.mockClear();
	});

	describe('createGoal', () => {

		it('should create a goal successfully', async () => {
			const mockResponse = { data: { success: true, message: 'Goal created successfully' } };
			axios.post.mockResolvedValue(mockResponse);

			const result = await goalsService.createGoal(goalData);

			expect(axios.post).toHaveBeenCalledWith(`http://api.gobl-up.me:80/goals/createGoal`, goalData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockResponse.data);
		});

		it('should handle errors when creating a goal fails', async () => {
			const errorMessage = 'Error creating goal';
			axios.post.mockRejectedValue(new Error(errorMessage));

			await expect(goalsService.createGoal(goalData)).rejects.toThrow(errorMessage);
		});
	});

	describe('getAllGoalsOfUser', () => {
		it('should retrieve all goals of user successfully', async () => {
			const mockGoalsData = [{ id: '1', goal: 'Run 5km daily' }];
			axios.get.mockResolvedValue({ data: mockGoalsData });

			const result = await goalsService.getAllGoalsOfUser();

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/goals/getAllGoalsOfUser`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockGoalsData);
		});

		it('should handle errors when fetching all goals of user fails', async () => {
			const errorMessage = 'Error fetching all goals of user';
			axios.get.mockRejectedValue(new Error(errorMessage));

			await expect(goalsService.getAllGoalsOfUser()).rejects.toThrow(errorMessage);
		});
	});

	describe('getSingleGoalItem', () => {
		it('should retrieve a single goal item successfully', async () => {
			const mockGoalData = { id: goalId, goal: 'Run 5km daily' };
			axios.get.mockResolvedValue({ data: mockGoalData });

			const result = await goalsService.getSingleGoalItem(goalId);

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/getSingleGoalItem?goalId=${goalId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockGoalData);
		});

		it('should handle errors when fetching a single goal item fails', async () => {
			const errorMessage = 'Error fetching single goal item';
			axios.get.mockRejectedValue(new Error(errorMessage));

			await expect(goalsService.getSingleGoalItem(goalId)).rejects.toThrow(errorMessage);
		});
	});

	describe('deleteGoal', () => {
		it('should delete a goal successfully', async () => {
			axios.get.mockResolvedValue({ data: { success: true, message: 'Goal deleted successfully' } });

			const result = await goalsService.deleteGoal(goalId);

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/deleteGoal?goalId=${goalId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data.success).toBe(true);
		});

		it('should handle errors when deleting a goal fails', async () => {
			const errorMessage = 'Error deleting goal';
			axios.get.mockRejectedValue(new Error(errorMessage));

			await expect(goalsService.deleteGoal(goalId)).rejects.toThrow(errorMessage);
		});
	});

	describe('updateGoal', () => {
		const updateData = { maxTargetValue: 2000 }; // Define updateData here if it's the same for both tests
    
		it('should update a goal successfully', async () => {
			axios.post.mockResolvedValue({ data: { success: true, message: 'Goal updated successfully' } });
    
			const result = await goalsService.updateGoal(goalId, updateData);
    
			expect(axios.post).toHaveBeenCalledWith(`http://api.gobl-up.me:80/goals/updateGoal`, {
				goalID: goalId,
				...updateData,
			}, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual({ success: true, message: 'Goal updated successfully' });
		});
    
		it('should handle errors when updating a goal fails', async () => {
			const errorMessage = 'Error updating goal';
			axios.post.mockRejectedValue(new Error(errorMessage));
    
			await expect(goalsService.updateGoal(goalId, updateData)).rejects.toThrow(errorMessage);
		});
	});
    

	describe('getMacroGoals', () => {
		it('should retrieve macro goals successfully', async () => {
			const mockMacroGoalsData = { calories: 2000, protein: 150 };
			axios.get.mockResolvedValue({ data: mockMacroGoalsData });

			const result = await goalsService.getMacroGoals();

			expect(axios.get).toHaveBeenCalledWith(`http://api.gobl-up.me:80/goals/getMacroGoal`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			expect(result.data).toEqual(mockMacroGoalsData);
		});

		it('should handle errors when fetching macro goals fails', async () => {
			const errorMessage = 'Error fetching macro goal';
			axios.get.mockRejectedValue(new Error(errorMessage));

			await expect(goalsService.getMacroGoals()).rejects.toThrow(errorMessage);
		});
	});

	describe('updateMacroGoals', () => {
		it('should handle errors when updating macro goals fails', async () => {
			const errorMessage = 'Error updating macro goal';
			const nutrient = { nutrient: 'protein', value: 150 };
			axios.post.mockRejectedValue(new Error(errorMessage));
    
			await expect(goalsService.updateMacroGoals(nutrient)).rejects.toThrow(errorMessage);
		});
	});
    
	describe('getUntrackedMacroGoals', () => {
		it('should handle errors when fetching untracked macro goals fails', async () => {
			const errorMessage = 'Error fetching untracked macro goals';
			axios.get.mockRejectedValue(new Error(errorMessage));
    
			await expect(goalsService.getUntrackedMacroGoals()).rejects.toThrow(errorMessage);
		});
	});
});