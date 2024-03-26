// module.exports = {
// 	// Preset tells Jest to use jest-expo, a Jest preset that enables your tests to work with Expo and React Native components.
// 	preset: 'jest-expo',
    

// 	// setupFilesAfterEnv is an array of module paths. Modules specified here will be run after the test framework has been installed in the environment but before the tests are run.
// 	// This is a good place to include additional assertions (like jest-native) and global setup utilities.
// 	setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

// 	// testPathIgnorePatterns is an array of regex patterns Jest uses to detect test files. Here, we're instructing Jest to ignore any files within node_modules, android, and ios directories.
// 	// This helps in speeding up the test search by excluding folders that are not likely to contain test files.
// 	testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],

// 	// transformIgnorePatterns is an array of regex patterns that tells Jest to bypass the transformation of certain files.
// 	// This is necessary because by default, Jest doesn't transform files within node_modules. However, some packages (like react-native) need to be transformed for tests to run correctly.
// 	// The configuration below includes an exception for react-native and any specified project or navigation libraries that need to be transformed.
// 	transformIgnorePatterns: [
// 		'node_modules/(?!(react-native|react-navigation|@react-navigation/.*))',
// 	],
// };


module.exports = {
	preset: 'jest-expo',
	setupFilesAfterEnv: [
	  '@testing-library/jest-native/extend-expect',
	  "../../jest.setup.js",
	],
	testPathIgnorePatterns: ['/node_modules/'],
	transformIgnorePatterns: [
	  'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation/.*|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-native-community/.*)',
	],
	collectCoverage: true,
	collectCoverageFrom: [
	  '**/*.{js,jsx,ts,tsx}',
	  '!**/node_modules/**',
	  '!**/babel.config.js',
	  '!**/jest.setup.js',
	],
  };

console.log('FRONTEND - jest.config.js loaded');