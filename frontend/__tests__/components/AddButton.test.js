import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomIcon from '../../components/AddButton/AddButton';
import { TouchableWithoutFeedback } from 'react-native';
import AddModal from '../../components/AddModal/AddModal';
import e from 'express';

// Mocking the react-navigation module
jest.mock('@react-navigation/native', () => ({
	useNavigation: jest.fn(() => ({ navigate: jest.fn() })),
}));

// const mockStartAnimation = jest.fn();
// render(<CustomIcon startAnimation={mockStartAnimation} />);


describe('CustomIcon', () => {
	it('renders without crashing', () => {
		render(<CustomIcon />);
	});
	
});
