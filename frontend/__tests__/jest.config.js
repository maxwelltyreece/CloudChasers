module.exports = {
	preset: 'jest-expo',
	setupFilesAfterEnv: [
		'@testing-library/jest-native/extend-expect',
		"../../jest.setup.js",
	],
	testPathIgnorePatterns: [
		"/node_modules/",
		"/frontend/__tests__/jest.config.js",
		"/frontend/__tests__/coverage/",
		"/__snapshots__/",
		"\\.snap$",
	],
	transformIgnorePatterns: [
		"node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@expo|expo(nent)?|@unimodules|unimodules|react-navigation|@react-native-picker|@react-native-community/datetimepicker)/"
	],
	transform: {
		"^.+\\.[jt]sx?$": ["babel-jest", { configFile: "./babel.config.js" }],
	},
	// collectCoverage: true,
	// "collectCoverageFrom": [
	// 	"**/*.{js,jsx}",
	// 	"**/frontend/**",
	// 	"!**/backend/**",
	// 	"!**/node_modules/**",
	// 	"!**/jest.setup.js",
	// 	"!**/AppEntry.js",
	// 	"!**/jest.config.js",
	// 	"!**/babel.config.js",
	// 	"!**/coverage/**",
	// 	"!**/__snapshots__/**",
	// 	"!**/eslintrc.js",
	// 	"!**/logger.js"
	// ],
};
