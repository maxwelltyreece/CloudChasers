import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import WaterEntry from '../../../screens/DataEntry/WaterEntry';
import { Alert } from 'react-native';

jest.mock('../../../contexts/FoodLogContext', () => ({
	useFoodLog: () => ({
		logWater: jest.fn(),
	}),
}));

jest.mock('@react-navigation/native', () => ({
	useNavigation: () => ({
		goBack: jest.fn(),
	}),
}));

describe('WaterEntry Component', () => {
	it('renders correctly', () => {
		const { getByPlaceholderText } = render(<WaterEntry />);
		expect(getByPlaceholderText('...')).toBeTruthy();
	});

	it('allows entering water amount', () => {
		const { getByPlaceholderText } = render(<WaterEntry />);
		const waterInput = getByPlaceholderText('...');
		fireEvent.changeText(waterInput, '500');
		expect(waterInput.props.value).toBe('500');
	});

	it('logs water entry when submitted', async () => {
		const { getByPlaceholderText, getByText } = render(<WaterEntry />);
		const waterInput = getByPlaceholderText('...');
		fireEvent.changeText(waterInput, '500');
		const submitButton = getByText('Submit');

		jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
			buttons[0].onPress(); 
		});

		fireEvent.press(submitButton);

		await waitFor(() => {
			expect(Alert.alert).toHaveBeenCalledWith(
				'Water Logged',
				'Want to log more water?', 
				[ 
					expect.objectContaining({ text: 'Yes' }), 
					expect.objectContaining({ text: 'No' }), 
				],
				expect.any(Object) 
			);
		});
	});
});
