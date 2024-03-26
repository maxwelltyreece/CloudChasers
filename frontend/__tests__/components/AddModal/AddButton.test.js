import React from 'react';
import { render, fireEvent} from '@testing-library/react-native';
import CustomIcon from '../../../components/AddButton';
import { TouchableWithoutFeedback } from 'react-native';
import AddModal from '../../../components/AddModal';

// Mocking the react-navigation module
jest.mock('@react-navigation/native', () => ({
	useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));

describe('CustomIcon', () => {
	it('renders without crashing', () => {
		render(<CustomIcon />);
	});

	it('toggles modal visibility on press', () => {
		const { getByType } = render(<CustomIcon />);
		const touchable = getByType(TouchableWithoutFeedback); // Find by type

		fireEvent(touchable, 'press'); // Simulate press event

		// Assert the visibility of modal
		const modal = getByType(AddModal); // Assuming AddModal is imported correctly
		expect(modal.props.isVisible).toBeTruthy();
	});
});
