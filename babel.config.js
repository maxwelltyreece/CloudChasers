module.exports = function (api) {
	api.cache(true);

	// Default configuration for Expo app
	const presets = ['babel-preset-expo', 'module:metro-react-native-babel-preset'];
	const plugins = [
		['module:react-native-dotenv', {
			moduleName: '@env',
			path: '.env',
			allowUndefined: false,
		}],
		'react-native-reanimated/plugin',
	];

	// Environment-specific overrides
	const env = {
		test: {
			// Presets and plugins needed for Jest
			presets: [...presets], // Add or override presets for Jest here
			plugins: [
				...plugins,
				// Add additional plugins needed for testing here
				['@babel/plugin-transform-class-properties', { loose: true }],
				['@babel/plugin-transform-private-methods', { loose: true }],
				['@babel/plugin-transform-private-property-in-object', { loose: true }]
			],
		},
	};

	return {
		presets,
		plugins,
		env,
	};
};