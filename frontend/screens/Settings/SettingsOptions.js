/**
 * SettingsOptions is a function that returns an array of objects, each representing a setting
 * option. Each object has a `name` property, which is the name of the setting option, and a
 * `handler` property, which is a function that gets called when the setting option is selected.
 *
 * Currently, the `handler` function for each setting option just logs a message to the console.
 *
 * @param {object} navigation - The navigation object from React Navigation. Currently unused.
 * @returns {object[]} An array of objects representing the setting options.
 */
const SettingsOptions = (navigation) => [
	{
		name: 'Account',
		handler: () => navigation.navigate('Account'),
	},
	{
		name: 'About',
		handler: () => navigation.navigate('About'),
	},
	{
		name: 'Learn More',
		handler: () => navigation.navigate('LearnMore'),
	},
];

export default SettingsOptions;
