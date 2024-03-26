/* eslint-disable no-undef */
import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LearnMore from '../../../../screens/Settings/Subscreens/LearnMore';


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

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(() => Promise.resolve('token')), // Simulate a token present
}));

describe('About Subscreen', () => {

	it('renders the About page correctly', async () => {
		const { getByText } = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="LearnMore" component={LearnMore} />
				</Stack.Navigator>
			</NavigationContainer>
		);


		await act(async () => {
			await waitFor(() => { expect(getByText('Understanding Nutrition')).toBeTruthy(); });
			await waitFor(() => { expect(getByText('Calories (kcal):')).toBeTruthy(); });
			await waitFor(() => { expect(getByText('Protein (g):')).toBeTruthy(); });
			await waitFor(() => { expect(getByText('Carbohydrates (g):')).toBeTruthy(); });
			await waitFor(() => { expect(getByText('Fats (g):')).toBeTruthy(); });
			await waitFor(() => { expect(getByText('Fibre (g):')).toBeTruthy(); });
			await waitFor(() => { expect(getByText('Sugars (g):')).toBeTruthy(); });
			await waitFor(() => { expect(getByText('Sodium (mg):')).toBeTruthy(); });
			await waitFor(() => { expect(getByText('Water (ml):')).toBeTruthy(); });
			await waitFor(() => { expect(getByText('Micronutrients (Vitamins & Minerals):')).toBeTruthy(); });
		});
	});

	it('matches the about snapshot', async () => {
		const Stack = createStackNavigator();
		const tree = render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="LearnMore" component={LearnMore} />
				</Stack.Navigator>
			</NavigationContainer>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

});
