/* eslint-disable no-undef */
import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Stats from '../../../screens/Stats/Stats';

// Mock the contexts
jest.mock('../../../contexts/StatsContext', () => ({
	useStats: () => ({
		todayStats: {},
		streak: 1,
		updateTodayStats: jest.fn()
	}),
}));

jest.mock('../../../contexts/GoalsContext', () => ({
	useGoals: () => ({
		goals: [{}],
		fetchGoals: jest.fn()
	}),
}));

// Mock useNavigation and useFocusEffect hooks
jest.mock('@react-navigation/native', () => {
	const actualNav = jest.requireActual('@react-navigation/native');
	return {
		...actualNav,
		useNavigation: () => ({
			navigate: jest.fn(),
			addListener: jest.fn((event, callback) => {
				if (event === 'focus') {
					// Trigger the focus effect callback immediately for testing
					callback();
				}
				return jest.fn(); // Return an unsubscribe function
			}),
		}),
		useFocusEffect: (callback) => callback(),
	};
});
  

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(() => Promise.resolve('token')), // Simulate a token present
}));

// Mock navigation
const Stack = createStackNavigator();


describe('Stats', () => {

	it('renders correctly with empty data', async () => {

		const { getByText } = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Stats" component={Stats} />
				</Stack.Navigator>
			</NavigationContainer>
		);

		await act(async () => {
			await waitFor(() => expect(getByText("Today's Statistics")).toBeTruthy());
           
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

});
