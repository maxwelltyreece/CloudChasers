import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import FoodEntry from '../../../screens/DataEntry/FoodEntry';

jest.mock('../../../contexts/FoodLogContext', () => ({
	useFoodLog: () => ({
		searchFoods: jest.fn().mockResolvedValue({ data: { foods: [{ _id: '1', name: 'Example Food' }] } }),
		getAllUserRecipes: jest.fn(),
		logDatabaseFood: jest.fn(),
	}),
}));
  

jest.mock('@react-navigation/native', () => ({
	useNavigation: () => ({
		goBack: jest.fn(),
	}),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
	getItem: jest.fn(() => Promise.resolve('token')),
}));

describe('FoodEntry Component', () => {
	it('renders correctly', () => {
		const { getByPlaceholderText } = render(<FoodEntry />);
		expect(getByPlaceholderText('Search...')).toBeTruthy();
	});

	it('allows searching for foods', async () => {
		const { getByPlaceholderText, findByText, debug } = render(<FoodEntry />);
		const searchInput = getByPlaceholderText('Search...');
		fireEvent.changeText(searchInput, 'Example Food');
		await waitFor(() => {
			debug();
			expect(findByText('Example Food')).toBeTruthy();
		});
	});

	it('logs food entry when submitted', async () => {
		const { getByPlaceholderText, getByText, getByTestId, findByText } = render(<FoodEntry />);
		const searchInput = getByPlaceholderText('Search...');
		fireEvent.changeText(searchInput, 'example food');
		const submitButton = getByTestId('submit-button');
		fireEvent.press(submitButton);
		await waitFor(() => {
			expect(findByText('Food Logged')).toBeTruthy();
		});
	});
    

});
