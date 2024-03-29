// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => jest.requireActual('@react-native-async-storage/async-storage/jest/async-storage-mock'));

// Mock Montserrat Fonts
jest.mock('@expo-google-fonts/montserrat', () => ({
	useFonts: jest.fn().mockReturnValue([true]),
}));

//Mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';