module.exports = {
	globalSetup: "./jest.global-setup.js",
	globalTeardown: "./jest.global-setup.js:teardown",
	testEnvironment: "node",
	testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
};
