require('dotenv').config({ path: './backend/.env.test' });

/* eslint-disable no-undef */
// Load environment variables for all tests

// FOR BACKEND
require('dotenv').config({ path: './backend/.env.test' });



//FOR FRONTEND

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => jest.requireActual('@react-native-async-storage/async-storage/jest/async-storage-mock'));

// Mock Montserrat Fonts
jest.mock('@expo-google-fonts/montserrat', () => ({
    useFonts: jest.fn().mockReturnValue([true]),
  }));

// jest.mock('react-native-gesture-handler', () => {});
