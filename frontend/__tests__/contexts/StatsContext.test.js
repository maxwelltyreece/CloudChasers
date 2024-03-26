/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { StatsProvider, useStats } from '../../contexts/StatsContext';
import statsService from '../../services/StatsService';
import { Text, Pressable } from 'react-native';

// Mock the statsService
jest.mock('../../services/StatsService', () => ({
	getStreaks: jest.fn(),
	getDailyCaloricIntake: jest.fn(),
	getDailyWaterIntake: jest.fn(),
	getDailyProteinIntake: jest.fn(),
	getDailyCarbIntake: jest.fn(),
	getDailyFatIntake: jest.fn(),
	getDailySugarIntake: jest.fn(),
	getDailySodiumIntake: jest.fn(),
	getDailyFibreIntake: jest.fn(),
}));


const nutrients = [
	{ name: 'calories', serviceFunction: 'getDailyCaloricIntake', totalKey: 'totalCalories', value: 2000 },
	{ name: 'water', serviceFunction: 'getDailyWaterIntake', totalKey: 'totalWater', value: 3000 },
	{ name: 'protein', serviceFunction: 'getDailyProteinIntake', totalKey: 'totalProtein', value: 150 },
	{ name: 'carbs', serviceFunction: 'getDailyCarbIntake', totalKey: 'totalCarbs', value: 200 },
	{ name: 'fat', serviceFunction: 'getDailyFatIntake', totalKey: 'totalFat', value: 100 },
	{ name: 'sugar', serviceFunction: 'getDailySugarIntake', totalKey: 'totalSugar', value: 50 },
	{ name: 'sodium', serviceFunction: 'getDailySodiumIntake', totalKey: 'totalSodium', value: 500 },
	{ name: 'fibre', serviceFunction: 'getDailyFibreIntake', totalKey: 'totalFibre', value: 25 },
];


function TestConsumer() {
	const {
		updateTodayStats,
		todayStats,
		streak,
		updateStreak,
	} = useStats();

	return (
		<>
			<Text testID="streak">Streak: {streak}</Text>
			{Object.keys(todayStats).map((key) => (
				<Text key={key} testID={`${key}-intake`}>
					{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${todayStats[key]}`}
				</Text>
			))}
			<Pressable onPress={updateTodayStats} testID="update-stats" />
			<Pressable onPress={() => updateStreak(new Date().toISOString().split('T')[0])} testID="update-streak" />
		</>
	);
}

describe('StatsContext', () => {

	let consoleErrorMock;

	beforeEach(() => {
		jest.resetAllMocks();
		consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
	});

	afterEach(() => {
		consoleErrorMock.mockRestore();
	});

	it('updates daily stats and streak', async () => {
		const mockDate = new Date().toISOString().split('T')[0];
		statsService.getStreaks.mockResolvedValue({ streak: 5 });
		statsService.getDailyCaloricIntake.mockResolvedValue({ data: { totalCalories: 2000 } });

		const { getByTestId, findByText } = render(
			<StatsProvider>
				<TestConsumer />
			</StatsProvider>
		);

		fireEvent.press(getByTestId('update-stats'));
		fireEvent.press(getByTestId('update-streak'));

		await waitFor(() => {
			expect(findByText('Streak: 5')).toBeTruthy();
			expect(findByText('Calories: 2000')).toBeTruthy();
		});

		expect(statsService.getStreaks).toHaveBeenCalledWith(mockDate);
		expect(statsService.getDailyCaloricIntake).toHaveBeenCalledWith(mockDate);
	});

	nutrients.forEach(({ name, serviceFunction, totalKey, value }) => {
		it(`updates daily ${name} intake`, async () => {
			const mockDate = new Date().toISOString().split('T')[0];
			statsService[serviceFunction].mockResolvedValue({ data: { [totalKey]: value } });

			const { getByTestId, findByText } = render(
				<StatsProvider>
					<TestConsumer />
				</StatsProvider>
			);

			fireEvent.press(getByTestId('update-stats'));

			await waitFor(() => {
				expect(findByText(`${name.charAt(0).toUpperCase() + name.slice(1)}: ${value}`)).toBeTruthy();
			});

			expect(statsService[serviceFunction]).toHaveBeenCalledWith(mockDate);
		});
	});


	it('handles errors gracefully when updating stats fails', async () => {
		const mockError = new Error('Failed to fetch');
		statsService.getDailyCaloricIntake.mockRejectedValue(mockError);

		const { getByTestId } = render(
			<StatsProvider>
				<TestConsumer />
			</StatsProvider>
		);

		fireEvent.press(getByTestId('update-stats'));

		await waitFor(() => {
			expect(console.error).toHaveBeenCalledWith(expect.anything(), mockError);
		});
	});


});
