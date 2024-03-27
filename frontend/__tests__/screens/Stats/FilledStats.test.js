/* eslint-disable no-undef */
import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Stats from '../../../screens/Stats/Stats';

// Mock the contexts
jest.mock('../../../contexts/StatsContext', () => ({
	useStats: () => ({
		todayStats: { calories: 2800, water: 1000, fat: 12, protein: 28, carbs: 120, sodium: 20, fibre: 8, sugar: 14},
		streak: 3,
		updateTodayStats: jest.fn()
	}),
}));

jest.mock('../../../contexts/GoalsContext', () => ({
	useGoals: () => ({
		goals: {"goals": [
			{"__v": 0, "_id": "65f77dedeac5ceac00743d39", "maxTargetMass": 2300, "measurement": "sodium", "minTargetMass": 0, "name": "Daily sodium"}, 
			{"__v": 0, "_id": "65f77dedeac5ceac00743d43", "maxTargetMass": 50, "measurement": "sugar", "minTargetMass": 0, "name": "Daily sugar"}, 
			{"__v": 0, "_id": "65f77dedeac5ceac00743d45", "maxTargetMass": 2500, "measurement": "calories", "minTargetMass": 0, "name": "Daily calories"}, 
			{"__v": 0, "_id": "65f77dedeac5ceac00743d3b", "maxTargetMass": 2000, "measurement": "water", "minTargetMass": 0, "name": "Daily water"}, 
			{"__v": 0, "_id": "65f77dedeac5ceac00743d3d", "maxTargetMass": 275, "measurement": "carbs", "minTargetMass": 0, "name": "Daily carbs"}, 
			{"__v": 0, "_id": "65f77dedeac5ceac00743d3f", "maxTargetMass": 77, "measurement": "fat", "minTargetMass": 0, "name": "Daily fat"}, 
			{"__v": 0, "_id": "65f77dedeac5ceac00743d41", "maxTargetMass": 50, "measurement": "protein", "minTargetMass": 0, "name": "Daily protein"}, 
			{"__v": 0, "_id": "65f8b09a24ff674e5e4d0521", "maxTargetMass": 28, "measurement": "fibre", "minTargetMass": 0, "name": "Daily fibre"}
		]},
		fetchGoals: jest.fn()
	}),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(() => Promise.resolve('token')), // Simulate a token present
}));

// Mock navigation
const Stack = createStackNavigator();

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => {

	const navigate = jest.fn();

	return {
		...jest.requireActual('@react-navigation/native'),
		useNavigation: () => ({
			navigate,
		}),
	};
});


describe('Stats', () => {

	it('renders correctly with empty data', async () => {

		const { getByText } = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Stats" component={Stats} />
				</Stack.Navigator>
			</NavigationContainer>
		);
        
		// Render again to simulate ring component updating
		render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Stats" component={Stats} />
				</Stack.Navigator>
			</NavigationContainer>
		);

		await act(async () => {
			await waitFor(() => expect(getByText("Today's Statistics")).toBeTruthy());
			await waitFor(() => expect(getByText("Calories: 100%")).toBeTruthy());
			await waitFor(() => expect(getByText("Water: 50%")).toBeTruthy());
			await waitFor(() => expect(getByText("Protein: 56%")).toBeTruthy());
			await waitFor(() => expect(getByText("Carbs")).toBeTruthy());
			await waitFor(() => expect(getByText("120 / 275 g")).toBeTruthy());
			await waitFor(() => expect(getByText("Fat")).toBeTruthy());
			await waitFor(() => expect(getByText("12 / 77 g")).toBeTruthy());
			await waitFor(() => expect(getByText("Sodium")).toBeTruthy());
			await waitFor(() => expect(getByText("20 / 2300 mg")).toBeTruthy());
			await waitFor(() => expect(getByText("Fibre")).toBeTruthy());
			await waitFor(() => expect(getByText("8 / 28 g")).toBeTruthy());
			await waitFor(() => expect(getByText("Sugar")).toBeTruthy());
			await waitFor(() => expect(getByText("14 / 50 g")).toBeTruthy());
		});

	});

	it('shows loading indicator while fetching data', async () => {
		const { getByTestId } = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Stats" component={Stats} />
				</Stack.Navigator>
			</NavigationContainer>
		);

		// Expect the loading indicator to be present initially
		expect(getByTestId('loading-indicator')).toBeTruthy();
	});

	it('hides loading indicator and displays data after fetching', async () => {
		AsyncStorage.getItem.mockResolvedValue('mocked-token');

		const { queryByTestId, getByText } = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Stats" component={Stats} />
				</Stack.Navigator>
			</NavigationContainer>
		);

		await waitFor(() => {
			expect(queryByTestId('loading-indicator')).toBeNull();
		});
		expect(getByText("Today's Statistics")).toBeTruthy();

	});

	it('matches the snapshot', async () => {
		const Stack = createStackNavigator();
		const tree = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Stats" component={Stats} />
				</Stack.Navigator>
			</NavigationContainer>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

	describe('Stats Page if user is not logged in', () => {

		beforeEach(() => {
			jest.clearAllMocks();
			AsyncStorage.getItem.mockResolvedValue(null);
		});

		it('should check user login status and redirect to Login if not logged in', async () => {
			AsyncStorage.getItem.mockResolvedValue(null);

			render(
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Stats" component={Stats} />
					</Stack.Navigator>
				</NavigationContainer>
			);

			await act(async () => {
				await waitFor(() => {
					expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
					expect(useNavigation().navigate).toHaveBeenCalledWith('Login');
				});
			});
		});

	});
});
