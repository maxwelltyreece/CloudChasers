/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserProfile from '../../../screens/UserProfile/UserProfile';

// Mocking AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

// Mocking the UserContext
jest.mock('../../../contexts/UserContext', () => ({
  useUser: () => ({
    userDetails: { forename: 'Test' },
    updateUserDetails: jest.fn(),
  }),
}));

const mockUserProfileOptions = [
    {
        name: 'Recipes',
        handler: jest.fn(),
    },
    {
        name: 'Reminders',
        handler: jest.fn(),
    },
    {
        name: 'Goals',
        handler: jest.fn(),
    },
    {
        name: 'Awards',
        handler: jest.fn(),
    },
  ];

  jest.mock('../../../screens/UserProfile/UserProfile', () => ({
    UserProfileOptions: mockUserProfileOptions,
  }));

// Mock useNavigation and useFocusEffect hooks
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('User Profile', () => {
  beforeEach(() => {
    // Setup AsyncStorage mock for each test
    AsyncStorage.getItem.mockImplementation((key) => {
      if (key === 'token') {
        return Promise.resolve('mock_token');
      }
      return Promise.resolve(null);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const Stack = createStackNavigator();
    const { findByText } = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    );

    expect(await findByText("Goals")).toBeTruthy();
  });

  // Add more tests here as needed
});
