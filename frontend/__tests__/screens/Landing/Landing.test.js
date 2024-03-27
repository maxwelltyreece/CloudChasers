/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Landing from '../../../screens/Landing/Landing';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


describe('Landing Screen', () => {
	const Stack = createStackNavigator();
	const mockNavigate = jest.fn();

	beforeEach(() => {
		mockNavigate.mockReset();
	});

	const renderComponent = () =>
		render(
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Landing" component={Landing} />
				</Stack.Navigator>
			</NavigationContainer>,
			{
				wrapper: ({ children }) => children,
			},
		);

	it('renders correctly', () => {
		const { getByText } = renderComponent();

		expect(getByText('Nourish Your Joy, Log Your Goodness')).toBeTruthy();
		expect(
			getByText(
				'Discover wellness through simple logging. Your journey, your goodness, one bite at a time.',
			),
		).toBeTruthy();
		expect(getByText('Login')).toBeTruthy();
		expect(getByText('Register')).toBeTruthy();
	});

	it('matches the landin snapshot', async () => {
		const tree = renderComponent().toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('can press Login button', () => {
		const { getByText } = renderComponent();
		fireEvent.press(getByText('Login'));
	});

	it('can press Register button', () => {
		const { getByText } = renderComponent();
		fireEvent.press(getByText('Register'));
	});
});

