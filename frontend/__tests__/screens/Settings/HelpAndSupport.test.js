/* eslint-disable no-undef */
import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HelpAndSupport from '../../../screens/Settings/Subscreens/HelpAndSupport';

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
    getItem: jest.fn(() => Promise.resolve('token')), // Simulate a token present
}));

describe('About Subscreen', () => {

    it('renders the About page correctly', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        await act(async () => {
            await waitFor(() => { expect(getByText('Q: How do I change my notification settings?')).toBeDefined(); });
            await waitFor(() => { expect(getByText('A: You can change your notification settings from the \'Notifications\' section in the settings menu.')).toBeDefined(); });

        });
    });

    it('matches the about snapshot', async () => {
        const Stack = createStackNavigator();
        const tree = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
                </Stack.Navigator>
            </NavigationContainer>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

});
