import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddModal from '../../../components/AddModal';

describe('AddModal', () => {
	const mockNavigator = { navigate: jest.fn() };
	const mockPageNames = { food: 'FoodPage', water: 'WaterPage' };
	const mockToggleModal = jest.fn();

	it('renders correctly with food highlighted', () => {
		const { getByText, getByTestId } = render(
			<AddModal
				isVisible={true}
				onBackdropPress={() => {}}
				navigator={mockNavigator}
				pageNames={mockPageNames}
				toggleModal={mockToggleModal}
			/>
		);

		const foodButton = getByTestId('food-button');
		fireEvent.press(foodButton);

		expect(mockToggleModal).toHaveBeenCalledTimes(1);
		expect(mockNavigator.navigate).toHaveBeenCalledWith('FoodPage');
	});

	it('renders correctly with water highlighted', () => {
		const { getByTestId } = render(
			<AddModal
				isVisible={true}
				onBackdropPress={() => {}}
				navigator={mockNavigator}
				pageNames={mockPageNames}
				toggleModal={mockToggleModal}
			/>
		);

		const waterButton = getByTestId('water-button');
		fireEvent.press(waterButton);

		expect(mockToggleModal).toHaveBeenCalledTimes(1);
		expect(mockNavigator.navigate).toHaveBeenCalledWith('WaterPage');
	});
});
