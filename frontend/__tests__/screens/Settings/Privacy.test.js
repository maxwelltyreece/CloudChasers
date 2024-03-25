/* eslint-disable no-undef */
import React from 'react';
import { render, act, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import About from '../../../../screens/Settings/Subscreens/About';


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
                    <Stack.Screen name="About" component={About} />
                </Stack.Navigator>
            </NavigationContainer>
        );


        await act(async () => {
            await waitFor(() => { expect(getByText('Welcome to Gobl!')).toBeTruthy(); });
            await waitFor(() => { expect(getByText("You're officially a Gobler, Congrats!")).toBeTruthy(); });
            await waitFor(() => { expect(getByText('Gobl is a Food Logger app with the freedom to make it what you want.')).toBeTruthy(); });
            await waitFor(() => { expect(getByText('Want to simply visualize your daily nutrient stats? ')).toBeTruthy(); });
            await waitFor(() => { expect(getByText('Perfect! The Stats Page is for you.')).toBeTruthy(); });
            await waitFor(() => { expect(getByText('Want to track your recipes and ingredients?')).toBeTruthy(); });
            await waitFor(() => { expect(getByText('Great! The Recipes Page is for you.')).toBeTruthy(); });
            await waitFor(() => { expect(getByText('Want to explore different types of foodie communities?')).toBeTruthy(); });
            await waitFor(() => { expect(getByText(' Fantastic! The Groups Page is for you.')).toBeTruthy(); });
            await waitFor(() => { expect(getByText('Want to do all of the above?')).toBeTruthy(); });
            await waitFor(() => { expect(getByText(' Amazing! Gobl is for you.')).toBeTruthy(); });
            await waitFor(() => { expect(getByText('We hope you enjoy using it as much as we enjoyed making it.')).toBeTruthy(); });
            await waitFor(() => { expect(getByText('Happy Gobling!')).toBeTruthy(); });
            await waitFor(() => { expect(getByText('- Sincerely, The Gobl Team')).toBeTruthy(); });
        });
    });

    it('matches the about snapshot', async () => {
        const Stack = createStackNavigator();
        const tree = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="About" component={About} />
                </Stack.Navigator>
            </NavigationContainer>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

});
