module.exports = function (api) {
	api.cache(true);

	const presets = ['babel-preset-expo', 'module:metro-react-native-babel-preset'];
	const plugins = [
		['module:react-native-dotenv', {
			moduleName: '@env',
			path: '.env',
			allowUndefined: false,
		}],
		'react-native-reanimated/plugin',
	];

	const env = {
		test: {
			presets: [...presets],
			plugins: [
				...plugins,
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