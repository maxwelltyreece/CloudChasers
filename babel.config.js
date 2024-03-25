module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
		plugins: [
			['module:react-native-dotenv',
				{
					moduleName: '@env',
					path: '.env',
					allowUndefined: false,
				},
			],
			'react-native-reanimated/plugin',
			['@babel/plugin-transform-class-properties', { loose: true }],
            ['@babel/plugin-transform-private-methods', { loose: true }],
            ['@babel/plugin-transform-private-property-in-object', { loose: true }]
		],
	};
};