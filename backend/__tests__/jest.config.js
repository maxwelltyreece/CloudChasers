module.exports = {
	globalSetup: './jest.global-setup.js',
	globalTeardown: './jest.global-teardown.js',
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
	setupFilesAfterEnv: ["../../jest.setup.js"],
	// collectCoverage: true,
	// "collectCoverageFrom": [
	// 	"**/*.{js,jsx}",
	// 	"!**/frontend/**",
	// 	"**/backend/**",
	// 	"!**/node_modules/**",
	// 	"!**/jest.setup.js",
	// 	"!**/AppEntry.js",
	// 	"!**/jest.config.js",
	// 	"!**/babel.config.js",
	// 	"!**/coverage/**",
	// ],
};
