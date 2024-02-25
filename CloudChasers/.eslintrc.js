module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: 'airbnb',
	overrides: [
		{
			env: {
				node: true,
			},
			files: [
				'.eslintrc.{js,cjs}',
			],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': 'off',
		'react/jsx-indent': 'off',
		'react/jsx-indent-props': 'off',
		'react/prop-types': 'off',
		'react/style-prop-object': ['error', { allow: ['StatusBar'] }],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: ['warn', 'tab'],
		'no-unused-vars': ['warn'],
		'linebreak-style': 'off',
		'no-console': 'off',
	},
};
