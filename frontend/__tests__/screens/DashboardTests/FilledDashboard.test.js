/* eslint-disable no-undef */
import React from 'react';
import { render, waitFor, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../../../screens/Dashboard/Dashboard';

// const communityModule = require('../../../screens/Dashboard/Components/CommunityStatus');



// Mock the contexts
jest.mock('../../../contexts/UserContext', () => ({
    useUser: () => ({
        userDetails: { forename: 'Test' },
        updateUserDetails: jest.fn()
    }),
}));


// // Mock the module
// jest.mock('../../../screens/Dashboard/Components/CommunityStatus');

// // Provide a mock implementation for the function
// communityModule.getCommunityPosts = jest.fn().mockImplementation(() => {
//   return Promise.resolve({
//     data: {
//       posts: [
//         {'65f98e13f60af62c083a1d59': 6, '65fb17912c77d18a3748b45d': 10}
//       ]
//     }
//   });
// });

jest.mock('../../../contexts/CommunityContext', () => ({
    useCommunity: () => ({
        userCommunities: [ 
            {"description": "Pasta Lovers", "id": "65f98e13f60af62c083a1d59", "name": "All we talk about is pasta, we love it."}, 
        ],
        getCommunityPosts: jest.fn().mockImplementation(() => Promise.resolve({
            data: {
                posts: [],
            }
        })),
        getUserCommunities: jest.fn()
    }),
}));

jest.mock('../../../contexts/StatsContext', () => ({
    useStats: () => ({
        todayStats: { calories: 100, water: 200, fat: 0, protein: 0, carbs: 0, sodium: 0, fibre: 0, sugar: 0},
        streak: 3,
        updateTodayStats: jest.fn()
    }),
}));


jest.mock('../../../contexts/GoalsContext', () => ({
    useGoals: () => ({
        goals: {"goals": [
                {"__v": 0, "_id": "65f77dedeac5ceac00743d39", "maxTargetMass": 2300, "measurement": "sodium", "minTargetMass": 0, "name": "Daily sodium"}, 
                {"__v": 0, "_id": "65f77dedeac5ceac00743d43", "maxTargetMass": 50, "measurement": "sugar", "minTargetMass": 0, "name": "Daily sugar"}, 
                {"__v": 0, "_id": "65f77dedeac5ceac00743d45", "maxTargetMass": 2000, "measurement": "calories", "minTargetMass": 0, "name": "Daily calories"}, 
                {"__v": 0, "_id": "65f77dedeac5ceac00743d3b", "maxTargetMass": 2000, "measurement": "water", "minTargetMass": 0, "name": "Daily water"}, 
                {"__v": 0, "_id": "65f77dedeac5ceac00743d3d", "maxTargetMass": 275, "measurement": "carbs", "minTargetMass": 0, "name": "Daily carbs"}, 
                {"__v": 0, "_id": "65f77dedeac5ceac00743d3f", "maxTargetMass": 1000, "measurement": "fat", "minTargetMass": 0, "name": "Daily fat"}, 
                {"__v": 0, "_id": "65f77dedeac5ceac00743d41", "maxTargetMass": 50, "measurement": "protein", "minTargetMass": 0, "name": "Daily protein"}, 
                {"__v": 0, "_id": "65f8b09a24ff674e5e4d0521", "maxTargetMass": 28, "measurement": "fibre", "minTargetMass": 0, "name": "Daily fibre"}
            ]},
        fetchGoals: jest.fn()
    }),
}));

jest.mock('../../../contexts/FoodLogContext', () => ({
    useFoodLog: () => ({
        latestLoggedFood: {
            "latestUserDayMeal": {"__v": 0, "_id": "65fb81f5d491cf47026613d4", "name": "dinner", "order": 1, "userDayID": "65fb81f5d491cf47026613d0"}, 
            "macros": {"calories": 180, "carbs": 80, "fat": 22, "protein": 2}, 
            "mealItems": [
                {"__v": 0, "_id": "65fb81f5d491cf47026613d8", "foodItemID": "65fb81f5d491cf47026613d6", "name": "Toast", "userDayMealID": "65fb81f5d491cf47026613d4"}, 
                {"__v": 0, "_id": "65fc2621de274854922cc796", "foodItemID": "65fc2621de274854922cc794", "name": "Jam", "userDayMealID": "65fb81f5d491cf47026613d4"}, 
            ]},
        getLatestLoggedFood: jest.fn()
    }),
}));

jest.mock('../../../contexts/AwardsContext', () => ({
    useAwards: () => ({
        userAwards: [
            {"__v": 0, "_id": "65f6ea8be14e3e957294ef7b", "description": "Log in 5 days in a row", "name": "5 Day Streak"}, 
            {"__v": 0, "_id": "65f6eac4e14e3e957294ef85", "description": "Join a community to win this award", "name": "Join Community"}, 
        ],
        awards: [
            {"__v": 0, "_id": "65f6ea3de14e3e957294ef77", "description": "Log in 10 days in a row", "name": "10 Day Streak"}, 
            {"__v": 0, "_id": "65f6ea8be14e3e957294ef7b", "description": "Log in 5 days in a row", "name": "5 Day Streak"}, 
            {"__v": 0, "_id": "65f6ea97e14e3e957294ef81", "description": "Log in 25 days in a row", "name": "25 Day Streak"}, 
            {"__v": 0, "_id": "65f6eac4e14e3e957294ef85", "description": "Join a community to win this award", "name": "Join Community"}, 
            {"__v": 0, "_id": "65f6eb13e14e3e957294ef89", "description": "Make a post to win this award", "name": "Make a Post"}, 
            {"__v": 0, "_id": "65f6eb1ce14e3e957294ef8d", "description": "Make 5 posts to win this award", "name": "Make 5 Posts"}, 
            {"__v": 0, "_id": "65f6eb27e14e3e957294ef91", "description": "Make 10 posts to win this award", "name": "Make 10 Posts"}
        ],
        fetchUserAwards: jest.fn(),
        fetchAwards: jest.fn(),
        fetchAwardsToBeIssued: jest.fn()
    }),
}));

jest.mock('../../../contexts/RemindersContext', () => ({
    useReminders: () => ({
        reminders: [
            {"date": "", "description": "Healthy breakfast", "frequency": "Daily", "id": 1710507305554, "time": "8:00 AM"}, 
            {"date": "", "description": "Drink more water", "frequency": "Daily", "id": 1710507281041, "time": "12:55 PM"}, 
            {"date": "", "description": "Go for a run", "frequency": "Weekly", "id": 1710868152530, "time": "5:11 PM"}, 
            {"date": "", "description": "Eat less sugar", "frequency": "Weekly", "id": 1710610775331, "time": "9:41 AM"}
        ],
    }),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('token')), // Simulate a token present
}));

// Mock navigation
const Stack = createStackNavigator();

describe('Dashboard', () => {

    it('renders correctly with filled data', async () => {

        const { getByText } = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        await act(async () => {
            await waitFor(() => expect(getByText('Welcome Test!')).toBeTruthy());
            await waitFor(() => expect(getByText('Today')).toBeTruthy());
            await waitFor(() => expect(getByText('Calories')).toBeTruthy());
            await waitFor(() => expect(getByText('100 / 2000 kcal')).toBeTruthy());
            await waitFor(() => expect(getByText('Water')).toBeTruthy());
            await waitFor(() => expect(getByText('200 / 2000 ml')).toBeTruthy());
            await waitFor(() => expect(getByText('Reminders')).toBeTruthy());
            await waitFor(() => expect(getByText('Healthy breakfast')).toBeTruthy());
            await waitFor(() => expect(getByText('Drink more water')).toBeTruthy());
            await waitFor(() => expect(getByText('Go for a run')).toBeTruthy());
            await waitFor(() => expect(getByText('Eat less sugar')).toBeTruthy());
            await waitFor(() => expect(getByText('Communities')).toBeTruthy());
            await waitFor(() => expect(getByText('Pasta Lovers')).toBeTruthy());
            await waitFor(() => expect(getByText('All we talk about is pasta, we love it.')).toBeTruthy());
            await waitFor(() => expect(getByText('Posts: 0')).toBeTruthy());
            await waitFor(() => expect(getByText('Awards')).toBeTruthy());
            await waitFor(() => expect(getByText('2/7')).toBeTruthy());
            await waitFor(() => expect(getByText("On your way!")).toBeTruthy());
            await waitFor(() => expect(getByText('3')).toBeTruthy());
            await waitFor(() => expect(getByText('Last Log:')).toBeTruthy());
            await waitFor(() => expect(getByText('Dinner')).toBeTruthy());
            await waitFor(() => expect(getByText('180 kcal')).toBeTruthy());
        });

    });




});