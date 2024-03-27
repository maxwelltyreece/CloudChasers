import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsButton from '../../components/SettingsButton';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
	useNavigation: jest.fn(),
}));

describe('SettingsButton', () => {
	it('navigates to Settings screen when pressed', () => {
		const mockNavigate = jest.fn();
		useNavigation.mockReturnValue({ navigate: mockNavigate });

		const { getByTestId } = render(<SettingsButton />);
		const button = getByTestId('settings-button');

		fireEvent.press(button);

		expect(mockNavigate).toHaveBeenCalledWith('Settings');
	});

	it('renders correctly', () => {
		const { getByTestId } = render(<SettingsButton />);
		const button = getByTestId('settings-button');

		expect(button).toBeTruthy();
	});
});
