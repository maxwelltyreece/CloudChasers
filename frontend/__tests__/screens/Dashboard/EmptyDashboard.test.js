/* eslint-disable no-undef */
import React from 'react';
import { render, waitFor, act, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboard from '../../../screens/Dashboard/Dashboard';


// Mock the contexts
jest.mock('../../../contexts/UserContext', () => ({
	useUser: () => ({
		userDetails: { forename: 'Test' },
		updateUserDetails: jest.fn()
	}),
}));

jest.mock('../../../contexts/CommunityContext', () => ({
	useCommunity: () => ({
		userCommunities: [],
		getUserCommunities: jest.fn()
	}),
}));

jest.mock('../../../contexts/StatsContext', () => ({
	useStats: () => ({
		todayStats: {},
		streak: 1,
		updateTodayStats: jest.fn()
	}),
}));

jest.mock('../../../contexts/GoalsContext', () => ({
	useGoals: () => ({
		goals: [],
		fetchGoals: jest.fn()
	}),
}));

jest.mock('../../../contexts/FoodLogContext', () => ({
	useFoodLog: () => ({
		latestLoggedFood: {},
		getLatestLoggedFood: jest.fn()
	}),
}));

jest.mock('../../../contexts/AwardsContext', () => ({
	useAwards: () => ({
		userAwards: [],
		awards: [],
		fetchUserAwards: jest.fn(),
		fetchAwards: jest.fn(),
		fetchAwardsToBeIssued: jest.fn()
	}),
}));

jest.mock('../../../contexts/RemindersContext', () => ({
	useReminders: () => ({
		reminders: [],
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

describe('Empty Dashboard', () => {

	it('renders correctly with empty data', async () => {

		const { getByText } = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Dashboard" component={Dashboard} />
				</Stack.Navigator>
			</NavigationContainer>
		);

		await act(async () => {
			await waitFor(() => expect(getByText('Welcome Test!')).toBeTruthy());
			await waitFor(() => expect(getByText('Today')).toBeTruthy());
			await waitFor(() => expect(getByText('Calories')).toBeTruthy());
			await waitFor(() => expect(getByText('0 / 2000 kcal')).toBeTruthy());
			await waitFor(() => expect(getByText('Water')).toBeTruthy());
			await waitFor(() => expect(getByText('0 / 3700 ml')).toBeTruthy());
			await waitFor(() => expect(getByText('Reminders')).toBeTruthy());
			await waitFor(() => expect(getByText('No reminders.')).toBeTruthy());
			await waitFor(() => expect(getByText('Go to the reminders page to add some!')).toBeTruthy());
			await waitFor(() => expect(getByText('Communities')).toBeTruthy());
			await waitFor(() => expect(getByText('No communities')).toBeTruthy());
			await waitFor(() => expect(getByText('Awards')).toBeTruthy());
			await waitFor(() => expect(getByText("Let's get started!")).toBeTruthy());
			await waitFor(() => expect(getByText('1')).toBeTruthy());
			await waitFor(() => expect(getByText('Last Log:')).toBeTruthy());
			await waitFor(() => expect(getByText('No log details available yet.')).toBeTruthy());
		});

	});

	it('shows loading indicator while fetching data', async () => {
		const { getByTestId } = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Dashboard" component={Dashboard} />
				</Stack.Navigator>
			</NavigationContainer>
		);

		await act(async () => {
			await waitFor(() => {
				expect(getByTestId('loading-indicator')).toBeTruthy();
			});
		});
	});

	it('hides loading indicator after data is fetched', async () => {
		AsyncStorage.getItem.mockResolvedValue('mocked-token');

		const { queryByTestId } = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Dashboard" component={Dashboard} />
				</Stack.Navigator>
			</NavigationContainer>
		);
		await act(async () => {
			await waitFor(() => {
				expect(queryByTestId('loading-indicator')).toBeNull();
			});
		});
	});

	it('matches the empty dashboard snapshot', async () => {
		const Stack = createStackNavigator();
		const tree = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Dashboard" component={Dashboard} />
				</Stack.Navigator>
			</NavigationContainer>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

	describe('GoalProgressBar Navigation', () => {


		it('navigates to the Reminders page when "Add Reminders" button is pressed', async () => {


			const { getByTestId } = render(
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Dashboard" component={Dashboard} />
					</Stack.Navigator>
				</NavigationContainer>
			);


			let button;
			await act(async () => {
				await waitFor(() => {
					button = getByTestId('add-reminders-button')
					expect(button).toBeTruthy();
				});
				fireEvent.press(button);
			});

			expect(useNavigation().navigate).toHaveBeenCalledWith('User', { screen: 'Reminders' });
		});

	});

});