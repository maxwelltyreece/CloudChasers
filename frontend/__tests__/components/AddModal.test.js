import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddModal from '../../components/AddModal/AddModal';

describe('AddModal', () => {
	const mockNavigator = { navigate: jest.fn() };
	const mockPageNames = { food: 'FoodPage', water: 'WaterPage' };
	const mockToggleModal = jest.fn();

	it('renders food or water modal correctly', () => {
		const { getByText } = render(<AddModal isVisible={true} toggleModal={mockToggleModal} pageName="food" />);
		const titleElement = getByText('Food or Water?');
		expect(titleElement).toBeTruthy();
	});
});
