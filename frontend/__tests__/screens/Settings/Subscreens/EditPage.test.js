/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditPage from '../../../../screens/Settings/Subscreens/EditPage';

jest.mock('../../../../contexts/UserContext', () => ({
    useUser: () => ({
        userDetails: { data: { realName: 'Current Value' } },
        editUserDetails: jest.fn(),
    }),
}));

// Mock navigation
const Stack = createStackNavigator();

describe('Edit Page Subscreen', () => {
    const route = {
        params: {
            field: 'Test Field',
            realName: 'realName',
        },
    };

    it('renders the EditPage correctly', async () => {
        const { getByText, getByPlaceholderText } = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="EditPage" component={EditPage} initialParams={route.params} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        expect(getByText(/Editing Test Field/)).toBeTruthy();
        expect(getByText(/Current Test Field: Current Value/)).toBeTruthy();
        expect(getByPlaceholderText(`Enter new Test Field`)).toBeTruthy();
    });

    it('updates the input field correctly', () => {
        const { getByPlaceholderText } = render(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="EditPage" component={EditPage} initialParams={route.params} />
                </Stack.Navigator>
            </NavigationContainer>
        );

        const inputField = getByPlaceholderText(`Enter new Test Field`);
        fireEvent.changeText(inputField, 'New Value');

        expect(inputField.props.value).toBe('New Value');
    });
    
});
