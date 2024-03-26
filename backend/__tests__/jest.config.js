module.exports = {
	globalSetup: '<rootDir>/jest.global-setup.js',
	// globalTeardown: '<rootDir>/jest.global-teardown.js',
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
	setupFilesAfterEnv: ["../../jest.setup.js"]
};

console.log('BACKEND jest.config.js loaded');
