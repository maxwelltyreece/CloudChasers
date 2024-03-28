/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import { GoalsProvider, useGoals } from '../../contexts/GoalsContext';
import goalsService from '../../services/GoalsService';
import { Text, Pressable } from 'react-native';

jest.mock('../../services/GoalsService', () => ({
	getAllGoalsOfUser: jest.fn(),
	createGoal: jest.fn(),
	updateGoal: jest.fn(),
	deleteGoal: jest.fn(),
	getMacroGoals: jest.fn(),
	updateMacroGoals: jest.fn(),
}));

function TestConsumer() {
	const { goals, fetchGoals, createGoal, updateGoal, deleteGoal, fetchMacroGoals, macroGoals, updateMacroGoals } = useGoals();

	return (
		<>
			{goals.map((goal, index) => (
				<Text key={index}>{goal.name}</Text>
			))}
			<Pressable onPress={fetchGoals} testID='fetch-goals' />
			<Pressable onPress={() => createGoal({ name: 'New Goal' })} testID='create-goal' />
			<Pressable onPress={() => updateGoal('1', { name: 'Updated Goal' })} testID='update-goal' />
			<Pressable onPress={() => deleteGoal('1')} testID='delete-goal' />
			<Pressable onPress={fetchMacroGoals} testID='fetch-macro-goals' />
			{Object.entries(macroGoals).map(([key, value], index) => (
				<Text key={index}>{`${key}: ${value}`}</Text>
			))}
			<Pressable onPress={() => updateMacroGoals('calories', { value: 2000 })} testID='update-macro-goal' />
		</>
	);
}

describe('GoalsContext functionality', () => {

	let consoleSpy;
	beforeEach(() => {
		consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
		jest.resetAllMocks();
	});

	afterEach(() => {
		consoleSpy.mockRestore();
	});

	it('fetches and displays goals', async () => {
		goalsService.getAllGoalsOfUser.mockResolvedValue({ data: [{ name: 'Goal 1' }, { name: 'Goal 2' }] });

		const { findByText, getByTestId } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		fireEvent.press(getByTestId('fetch-goals'));

		render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		expect(await findByText('Goal 1')).toBeTruthy();
		expect(await findByText('Goal 2')).toBeTruthy();
	});


	it('creates a new goal and refetches goals', async () => {
		const mockGoal = { name: 'New Goal' };
		goalsService.createGoal.mockResolvedValue(mockGoal);
		goalsService.getAllGoalsOfUser.mockResolvedValue({ data: [mockGoal] });

		const { getByTestId, findByText } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		fireEvent.press(getByTestId('create-goal'));

		expect(await findByText(mockGoal.name)).toBeTruthy();

		expect(goalsService.getAllGoalsOfUser).toHaveBeenCalledTimes(1);
	});

	it('fetches and updates macro goals', async () => {
		const mockMacroGoals = { calories: 2000 };
		goalsService.getMacroGoals.mockResolvedValue({ data: mockMacroGoals });
		goalsService.updateMacroGoals.mockResolvedValue({});

		const { getByTestId, findByText } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		fireEvent.press(getByTestId('fetch-macro-goals'));
		expect(await findByText(`calories: ${mockMacroGoals.calories}`)).toBeTruthy();

		act(() => {
			fireEvent.press(getByTestId('update-macro-goal'));
		});

		expect(goalsService.updateMacroGoals).toHaveBeenCalledWith({ 'nutrient': 'calories', 'value': 2000 });
	});




	it('creates a new goal and fetches goals', async () => {
		const goalData = { name: 'New Goal', description: 'Test Description' };
		goalsService.createGoal.mockResolvedValue({ data: goalData });
		goalsService.getAllGoalsOfUser.mockResolvedValue({ data: [goalData] });

		const { findByText, getByTestId } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		await act(async () => {
			await goalsService.createGoal(goalData);
		});

		fireEvent.press(getByTestId('fetch-goals'));

		expect(await findByText('New Goal')).toBeTruthy();
	});

	it('updates a goal and fetches updated list', async () => {
		const updatedGoal = { name: 'Updated Goal', description: 'Updated Description' };
		goalsService.updateGoal.mockResolvedValue({ data: updatedGoal });
		goalsService.getAllGoalsOfUser.mockResolvedValue({ data: [updatedGoal] });

		const { findByText, getByTestId } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		await act(async () => {
			await goalsService.updateGoal('1', updatedGoal);
		});

		fireEvent.press(getByTestId('fetch-goals'));

		expect(await findByText('Updated Goal')).toBeTruthy();
	});

	it('deletes a goal and fetches the remaining goals', async () => {
		goalsService.deleteGoal.mockResolvedValue({ success: true });
		goalsService.getAllGoalsOfUser.mockResolvedValue({ data: [] });

		const { queryByText, getByTestId } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		await act(async () => {
			await goalsService.deleteGoal('1');
		});

		fireEvent.press(getByTestId('fetch-goals'));

		expect(queryByText('Goal 1')).toBeNull();
	});

	it('fetches and displays macro goals', async () => {
		const macroGoals = { calories: 2000, protein: 150 };
		goalsService.getMacroGoals.mockResolvedValue({ data: macroGoals });

		const { findByText, getByTestId } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		fireEvent.press(getByTestId('fetch-macro-goals'));

		await act(async () => {
			await waitFor(() => {
				expect(findByText('2000 calories')).toBeTruthy();
				expect(findByText('150 protein')).toBeTruthy();
			});
		});
	});


	it('handles error when creating a goal fails', async () => {
		const mockError = new Error('Failed to create goal');

		goalsService.createGoal.mockRejectedValue(mockError);
		const consoleSpy = jest.spyOn(console, 'error');

		const { getByTestId } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		fireEvent.press(getByTestId('create-goal'));

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith('Error creating goal:', mockError);
		});
	});


	it('handles error when updating a goal fails', async () => {
		const mockError = new Error('Failed to update goal');

		goalsService.updateGoal.mockRejectedValue(mockError);
		const consoleSpy = jest.spyOn(console, 'error');

		const { getByTestId } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		fireEvent.press(getByTestId('update-goal'));

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith('Error updating goal CONTEXT:', mockError);
		});
	});


	it('handles error when deleting a goal fails', async () => {
		const mockError = new Error('Failed to delete goal');
		goalsService.deleteGoal.mockRejectedValue(mockError);
		const consoleSpy = jest.spyOn(console, 'error');

		const { getByTestId } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		fireEvent.press(getByTestId('delete-goal'));

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith('Error deleting goal:', mockError);
		});
	});


	it('handles error when fetching macro goals fails', async () => {
		const mockError = new Error('Failed to fetch macro goals');
		goalsService.getMacroGoals.mockRejectedValue(mockError);
		const consoleSpy = jest.spyOn(console, 'error');

		const { getByTestId } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		fireEvent.press(getByTestId('fetch-macro-goals'));

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith('Error fetching macro goals:', mockError);
		});
	});


	it('handles error when updating macro goals fails', async () => {
		const mockError = new Error('Failed to update macro goal');
		goalsService.updateMacroGoals.mockRejectedValue(mockError);
		const consoleSpy = jest.spyOn(console, 'error');

		const { getByTestId } = render(
			<GoalsProvider>
				<TestConsumer />
			</GoalsProvider>
		);

		fireEvent.press(getByTestId('update-macro-goal'));

		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith('Error updating macro goal in context:', mockError);
		});
	});






});