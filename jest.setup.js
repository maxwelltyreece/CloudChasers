// FOR BACKEND
require('dotenv').config({ path: './backend/.env.test' });

console.log('JEST SETUP FILE HAS RUN');



//FOR FRONTEND

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => jest.requireActual('@react-native-async-storage/async-storage/jest/async-storage-mock'));

// Mock Montserrat Fonts
jest.mock('@expo-google-fonts/montserrat', () => ({
	useFonts: jest.fn().mockReturnValue([true]),
}));