/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Goals from '../../../../../screens/UserProfile/Subscreens/Goals/Goals';


// Mock the GoalsContext

const mockCreateGoal = jest.fn();
const mockUpdateGoal = jest.fn();
const mockFetchGoals = jest.fn();

jest.mock('../../../../../contexts/GoalsContext', () => ({
	useGoals: () => ({
		goals: { goals: [] },
		updateGoal: mockUpdateGoal,
		createGoal: mockCreateGoal,
		fetchGoals: mockFetchGoals,
	}),
}));


// Mock useFocusEffect
jest.mock('@react-navigation/native', () => {
	const actualNav = jest.requireActual('@react-navigation/native');
	return {
		...actualNav,
		useFocusEffect: jest.fn((callback) => callback()),
	};
});

// Mock useNavigation just in case you use it in the component
jest.mock('@react-navigation/core', () => ({
	...jest.requireActual('@react-navigation/core'),
	useNavigation: () => ({
		navigate: jest.fn(),
	}),
}));

describe('Goals Screen', () => {
	const Stack = createStackNavigator();

	const renderComponent = () =>
		render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Goals" component={Goals} />
				</Stack.Navigator>
			</NavigationContainer>
		);

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the initialize goals button when there are no goals', async () => {
		const { findByText } = renderComponent();

		await act(async () => {
			const initButton = await findByText('Initialize Goals to Begin');
			expect(initButton).toBeTruthy();
		});
	});

	it('calls createGoal on initialize goals button press', async () => {
		const { getByText } = renderComponent();

		mockFetchGoals.mockImplementation(() => {
			return {
				goals: []
			};
		});

		let initButton;
		await act(async () => {
			await waitFor(() => {
				initButton = getByText('Initialize Goals to Begin');
			});
		});
		fireEvent.press(initButton);

		const nutrientTypes = ['protein', 'carbs', 'water', 'fat', 'sugar', 'sodium', 'calories', 'fibre'];

		await act(async () => {
			expect(mockCreateGoal).toHaveBeenCalledTimes(nutrientTypes.length);
		});

	});

	it('renders fetched goals correctly', async () => {
		mockFetchGoals.mockImplementation(() => {
			return {
				goals: [
					{ _id: 1, measurement: 'protein', maxTargetMass: 50 },
					{ _id: 2, measurement: 'carbs', maxTargetMass: 300 },
				]
			};
		});

		const { findByText } = renderComponent();

		await act(async () => {
			await waitFor(() => { expect(findByText('Protein: 50g')).toBeTruthy(); });
			await waitFor(() => { expect(findByText('Carbs: 300g')).toBeTruthy(); });
		});

	});

});
