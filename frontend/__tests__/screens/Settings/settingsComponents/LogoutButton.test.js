/* eslint-disable no-undef */
import React from 'react';
import { render, act, waitFor, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogoutButton from '../../../../screens/Settings/settingsComponents/LogoutButton';


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
    getItem: jest.fn(() => Promise.resolve('token')),
}));

describe('Logout Button Settings Component', () => {

    it('renders correctly', async () => {
        const { getByText } = render(<LogoutButton onPress={() => { }} />);
        await act(async () => {
            await waitFor(() => { expect(getByText('Logout')).toBeTruthy(); });
        });
    });

        it('handles press events', () => {
            const onPressMock = jest.fn();
            const { getByText } = render(<LogoutButton onPress={onPressMock} />);

            fireEvent.press(getByText('Logout'));
            expect(onPressMock).toHaveBeenCalledTimes(1);
        });

        it('animates on press in and press out', async () => {
            const { getByText } = render(<LogoutButton onPress={() => { }} />);

            fireEvent(getByText('Logout'), 'pressIn');
            fireEvent(getByText('Logout'), 'pressOut');
        });


});
