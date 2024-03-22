/* eslint-disable no-undef */
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../../screens/Dashboard/Dashboard';

// Mock the contexts
jest.mock('../../contexts/UserContext', () => ({
    useUser: () => ({ userDetails: { forename: 'Test' }, updateUserDetails: jest.fn() }),
}));

jest.mock('../../contexts/CommunityContext', () => ({
    useCommunity: () => ({ userCommunities: [], getUserCommunities: jest.fn() }),
}));

jest.mock('../../contexts/StatsContext', () => ({
    useStats: () => ({ todayStats: {}, streak: 0, updateTodayStats: jest.fn() }),
}));

jest.mock('../../contexts/GoalsContext', () => ({
    useGoals: () => ({ goals: [], fetchGoals: jest.fn() }),
}));

jest.mock('../../contexts/FoodLogContext', () => ({
    useFoodLog: () => ({ latestLoggedFood: {}, getLatestLoggedFood: jest.fn() }),
}));

jest.mock('../../contexts/AwardsContext', () => ({
    useAwards: () => ({ userAwards: [], awards: [], fetchUserAwards: jest.fn(), fetchAwards: jest.fn(), fetchAwardsToBeIssued: jest.fn() }),
}));

jest.mock('../../contexts/RemindersContext', () => ({
    useReminders: () => ({
        reminders: [],
    }),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('token')), // Simulate a token present
}));

// Mock navigation
const Stack = createStackNavigator();

describe('Dashboard', () => {
    it('renders correctly', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        await waitFor(() => expect(getByText('Welcome Test!')).toBeTruthy());
        await waitFor(() => expect(getByText('Today')).toBeTruthy());
        await waitFor(() => expect(getByText('Communities')).toBeTruthy());
        await waitFor(() => expect(getByText('Awards')).toBeTruthy());
        await waitFor(() => expect(getByText('Last Log:')).toBeTruthy());
    });


    describe('When user has just registered or no data available', () => {
        it('renders correctly with empty data', async () => {
            // Mock context data for scenarios where user has just registered or no data available
            jest.mock('../../contexts/UserContext', () => ({
                useUser: () => ({ userDetails: { forename: 'Test' }, updateUserDetails: jest.fn() }),
            }));

            jest.mock('../../contexts/CommunityContext', () => ({
                useCommunity: () => ({ userCommunities: [], getUserCommunities: jest.fn() }),
            }));

            jest.mock('../../contexts/StatsContext', () => ({
                useStats: () => ({ todayStats: {}, streak: 0, updateTodayStats: jest.fn() }),
            }));

            jest.mock('../../contexts/GoalsContext', () => ({
                useGoals: () => ({ goals: [], fetchGoals: jest.fn() }),
            }));

            jest.mock('../../contexts/FoodLogContext', () => ({
                useFoodLog: () => ({ latestLoggedFood: {}, getLatestLoggedFood: jest.fn() }),
            }));

            jest.mock('../../contexts/AwardsContext', () => ({
                useAwards: () => ({ userAwards: [], awards: [], fetchUserAwards: jest.fn(), fetchAwards: jest.fn(), fetchAwardsToBeIssued: jest.fn() }),
            }));

            jest.mock('../../contexts/RemindersContext', () => ({
                useReminders: () => ({ reminders: [] }),
            }));

            const { getByText } = render(
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
    
            await waitFor(() => expect(getByText('Welcome Test!')).toBeTruthy());
            await waitFor(() => expect(getByText('Today')).toBeTruthy());
            await waitFor(() => expect(getByText('Calories')).toBeTruthy());
            await waitFor(() => expect(getByText('0 / 2000 kcal')).toBeTruthy());
            await waitFor(() => expect(getByText('Water')).toBeTruthy());
            await waitFor(() => expect(getByText('0 / 3700 ml')).toBeTruthy());
            await waitFor(() => expect(getByText('Reminders')).toBeTruthy());
            await waitFor(() => expect(getByText('No reminders.')).toBeTruthy());
            await waitFor(() => expect(getByText('Go to the reminders page to add some!')).toBeTruthy());
            await waitFor(() => expect(getByText('Communities')).toBeTruthy());
            await waitFor(() => expect(getByText('No communities')).toBeTruthy());
            await waitFor(() => expect(getByText('Awards')).toBeTruthy());
            await waitFor(() => expect(getByText("Let's get started!")).toBeTruthy());
            await waitFor(() => expect(getByText('Last Log:')).toBeTruthy());
            await waitFor(() => expect(getByText('No log details available yet.')).toBeTruthy());

        });




    });
});