module.exports = {
	"env": {
		"browser": true,
		"es2021": true,
		"node": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"overrides": [
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
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
		'react/no-unstable-nested-components': 'off',
		'react/require-default-props': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/no-array-index-key': 'off',
		'import/prefer-default-export': 'off',
	},
}
