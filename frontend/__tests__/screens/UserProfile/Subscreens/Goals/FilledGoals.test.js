/* eslint-disable no-undef */
import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Goals from '../../../../../screens/UserProfile/Subscreens/Goals/Goals';


// Mock the GoalsContext

const mockCreateGoal = jest.fn();
const mockUpdateGoal = jest.fn();
const mockFetchGoals = jest.fn();

jest.mock('../../../../../contexts/GoalsContext', () => ({
	useGoals: () => ({
		goals: { goals: [
			{ _id: 1, measurement: 'protein', maxTargetMass: 50 },
			{ _id: 2, measurement: 'carbs', maxTargetMass: 300 },
			{ _id: 3, measurement: 'water', maxTargetMass: 2000 },
			{ _id: 4, measurement: 'fat', maxTargetMass: 70 },
			{ _id: 5, measurement: 'sugar', maxTargetMass: 50 },
			{ _id: 6, measurement: 'sodium', maxTargetMass: 2300 },
			{ _id: 7, measurement: 'calories', maxTargetMass: 2000 },
			{ _id: 8, measurement: 'fibre', maxTargetMass: 25 },
		] },
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

	it('renders fetched goals correctly', async () => {
        

		const { findByText } = renderComponent();

		await act(async () => {
			await waitFor(() => { expect(findByText('Protein: 50g')).toBeTruthy(); });
			await waitFor(() => { expect(findByText('Carbs: 300g')).toBeTruthy(); });
			await waitFor(() => { expect(findByText('Water: 2000ml')).toBeTruthy(); });
			await waitFor(() => { expect(findByText('Fat: 70g')).toBeTruthy(); });
			await waitFor(() => { expect(findByText('Sugar: 50g')).toBeTruthy(); });
			await waitFor(() => { expect(findByText('Sodium: 2300mg')).toBeTruthy(); });
			await waitFor(() => { expect(findByText('Calories: 2000kcal')).toBeTruthy(); });
			await waitFor(() => { expect(findByText('Fibre: 25g')).toBeTruthy(); });
		});

	});

	it('renders each nutrient goal with the correct unit displayed', async () => {
		const { findByText } = renderComponent();
    
		// Define expected values and units for each nutrient
		const expectedGoals = [
			{ measurement: 'Protein', value: 50, unit: 'g' },
			{ measurement: 'Carbs', value: 300, unit: 'g' },
			{ measurement: 'Water', value: 2000, unit: 'ml' },
			{ measurement: 'Fat', value: 70, unit: 'g' },
			{ measurement: 'Sugar', value: 50, unit: 'g' },
			{ measurement: 'Sodium', value: 2300, unit: 'mg' },
			{ measurement: 'Calories', value: 2000, unit: 'kcal' },
			{ measurement: 'Fibre', value: 25, unit: 'g' },
		];
    
		// Iterate over each expected goal and verify that its text is rendered correctly
		await act(async () => {
			for (const goal of expectedGoals) {
				const goalText = `${goal.measurement}: ${goal.value}${goal.unit}`;
				await waitFor(() => {
					expect(findByText(goalText)).toBeTruthy();
				});
			}
		});
	});
    
});
