import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewFoodModal from '../../../../screens/DataEntry/DataEntryComponents/NewFoodModal';


jest.mock('react-native/Libraries/Components/TextInput/TextInput', () => 'TextInput');
jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => 'TouchableOpacity');

describe('NewFoodModal', () => {
	const mockToggleModal = jest.fn();

	it('renders correctly with input fields', () => {
		const { getByText, getByPlaceholderText } = render(
			<NewFoodModal
				isVisible={true}
				onBackdropPress={() => {}}
				toggleModal={mockToggleModal}
			/>
		);

		expect(getByText('Food Item:')).toBeTruthy();
		expect(getByPlaceholderText('...')).toBeTruthy();
		expect(getByPlaceholderText('Calories')).toBeTruthy();
		expect(getByPlaceholderText('Protein (g)')).toBeTruthy();
		expect(getByPlaceholderText('Sugar (g)')).toBeTruthy();
		expect(getByPlaceholderText('Fat (g)')).toBeTruthy();
		expect(getByPlaceholderText('Carbs (g)')).toBeTruthy();
		expect(getByPlaceholderText('Sodium (mg)')).toBeTruthy();
	});

	it('handles submit button press', () => {
		const { getByText } = render(
			<NewFoodModal
				isVisible={true}
				onBackdropPress={() => {}}
				toggleModal={mockToggleModal}
			/>
		);

		fireEvent.press(getByText('Submit'));

		expect(mockToggleModal).toHaveBeenCalledTimes(1);
	});

	it('handles close button press', () => {
		const { getByTestId } = render(
			<NewFoodModal
				isVisible={true}
				onBackdropPress={() => {}}
				toggleModal={mockToggleModal}
			/>
		);

		fireEvent.press(getByTestId('close-button'));

		expect(mockToggleModal).toHaveBeenCalledTimes(1);
	});
});