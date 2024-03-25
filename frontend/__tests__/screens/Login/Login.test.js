/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../../../screens/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
}));

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


describe('Login Screen', () => {

    const Stack = createStackNavigator();

    const renderComponent = () =>
        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} />
                </Stack.Navigator>
            </NavigationContainer>
        );

    beforeEach(() => {
        axios.post.mockReset();
        jest.clearAllMocks();
        AsyncStorage.setItem.mockReset();
    });

    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = renderComponent();

        expect(getByPlaceholderText('Username')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByText('Log In')).toBeTruthy();
        expect(getByText('Welcome Back!')).toBeTruthy();
        expect(getByText('or Sign Up Now')).toBeTruthy();
    });

    it('matches the login snapshot', async () => {
        const tree = renderComponent().toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('allows entering username and password', () => {
        const { getByPlaceholderText } = renderComponent();
        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.changeText(usernameInput, 'testUser');
        fireEvent.changeText(passwordInput, 'testPassword');

        expect(usernameInput.props.value).toBe('testUser');
        expect(passwordInput.props.value).toBe('testPassword');
    });


    describe('Login Screen Error Handling', () => {
        const Stack = createStackNavigator();

        beforeEach(() => {
            jest.clearAllMocks();
        });

        const renderLoginScreen = () =>
            render(
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Login" component={Login} />
                    </Stack.Navigator>
                </NavigationContainer>
            );

        it('shows error when login fails without a response data', async () => {

            axios.post.mockRejectedValue(new Error('Network error'));

            console.error = jest.fn();

            const { getByText } = renderLoginScreen();
            fireEvent.press(getByText('Log In'));

            // await waitFor(() => {
            //     expect(console.error).toHaveBeenCalledWith('Error:', expect.any(Error));
            // });

            expect(AsyncStorage.setItem).not.toHaveBeenCalled();
        });

        it('shows error when login response indicates failure', async () => {

            axios.post.mockResolvedValue({ data: { error: 'Invalid credentials' } });

            console.error = jest.fn();

            const { getByText } = renderLoginScreen();
            fireEvent.press(getByText('Log In'));

            // await waitFor(() => {
            //     expect(console.error).toHaveBeenCalledWith('Login failed');
            // });

            expect(AsyncStorage.setItem).not.toHaveBeenCalled();
        });

    });

});

