/* eslint-disable no-undef */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';


const axiosMock = new MockAdapter(axios);


import App from "../../App";


describe('App when user is not logged in', () => {

    it('renders the Auth screen as the initial route', async () => {

        // Mock AsyncStorage to simulate no token
        jest.mock('@react-native-async-storage/async-storage', () => ({
            getItem: jest.fn(() => Promise.resolve(null)), // Simulate no token
        }));

        const { findByText } = render(<App />);

        const loginElement = await waitFor(() => findByText('Login'));
        const registerElement = await waitFor(() => findByText('Register'));

        expect(loginElement).toBeTruthy();
        expect(registerElement).toBeTruthy();
    });

});

// describe('App when user is logged in', () => {

//     it('renders the Main screen as the initial route', async () => {

//         // Mock AsyncStorage to simulate a token
//         jest.mock('@react-native-async-storage/async-storage', () => ({
//             getItem: jest.fn(() => Promise.resolve('token')), // Simulate a token present
//         }));

//         const { getByTestId } = render(<App />);

//         const welcomeBarElement =  await waitFor(() => getByTestId('welcome-bar'))

//         expect(welcomeBarElement).toBeTruthy();
//     });


// });
