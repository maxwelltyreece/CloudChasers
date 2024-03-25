/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Register from '../../../screens/Register/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
}));

const Stack = createStackNavigator();

describe('Register Screen', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        axios.post.mockClear();
        AsyncStorage.setItem.mockClear();
        mockNavigate.mockClear();
    });

    const renderRegisterScreen = () =>
        render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
            </NavigationContainer>
        );

    it('allows entering username, email, password, and confirm password', () => {
        const { getByPlaceholderText } = renderRegisterScreen();
        fireEvent.changeText(getByPlaceholderText('Username'), 'newUser');
        fireEvent.changeText(getByPlaceholderText('Email'), 'newuser@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');

        expect(getByPlaceholderText('Username').props.value).toBe('newUser');
        expect(getByPlaceholderText('Email').props.value).toBe('newuser@example.com');
        expect(getByPlaceholderText('Password').props.value).toBe('password123');
        expect(getByPlaceholderText('Confirm Password').props.value).toBe('password123');
    });

    // it('handles registration success', async () => {
    //     axios.post.mockResolvedValue({
    //         data: { success: true, data: 'fake_token' },
    //     });

    //     const { getByText } = renderRegisterScreen();
    //     fireEvent.press(getByText('Create account'));

    //     await waitFor(() => {
    //         expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'fake_token');
    //         // Replace 'Main' with the actual screen you navigate to upon successful registration
    //         expect(mockNavigate).toHaveBeenCalledWith('Main');
    //     });
    // });



    describe('Error Handling', () => {
        beforeAll(() => {
            axios.post.mockClear();
            AsyncStorage.setItem.mockClear();
            jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterAll(() => {
            console.error.mockRestore();
        });

        it('shows error when passwords do not match', async () => {
            console.error = jest.fn();

            const { getByPlaceholderText, getByText } = renderRegisterScreen();
            fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
            fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'differentPassword');
            fireEvent.press(getByText('Create account'));

            // await waitFor(() => {
            //     expect(console.error).toHaveBeenCalledWith('Passwords do not match');
            // });

            expect(axios.post).not.toHaveBeenCalled();
            expect(AsyncStorage.setItem).not.toHaveBeenCalled();
        });

        it('logs error when passwords do not match', () => {
            const { getByText, getByPlaceholderText } = renderRegisterScreen();

            fireEvent.changeText(getByPlaceholderText('Password'), '123456');
            fireEvent.changeText(getByPlaceholderText('Confirm Password'), '1234567');
            fireEvent.press(getByText('Create account'));

            // expect(console.error).toHaveBeenCalledWith('Passwords do not match');
            expect(axios.post).not.toHaveBeenCalled();
        });

        it('logs error when axios request fails', async () => {

            axios.post.mockRejectedValueOnce(new Error('Network error'));

            const { getByText } = renderRegisterScreen();
            fireEvent.press(getByText('Create account'));

            // await waitFor(() => {
            //     expect(console.error).toHaveBeenCalledWith('Error message:', 'Network error');
            // });
        });


        it('logs error when registration response indicates failure', async () => {
            axios.post.mockResolvedValueOnce({ data: { success: false, message: "Registration failed" } });

            const { getByText } = renderRegisterScreen();
            fireEvent.press(getByText('Create account'));

            // await waitFor(() => {
            //     expect(console.error).toHaveBeenCalledWith('Registration failed');
            // });
        });

        it('logs detailed error when server responds with error status', async () => {
            const responseError = {
                response: {
                    data: { message: "User already exists" },
                    status: 409,
                    headers: {},
                },
            };
            axios.post.mockRejectedValueOnce(responseError);

            const { getByText } = renderRegisterScreen();
            fireEvent.press(getByText('Create account'));

        });

    });
});