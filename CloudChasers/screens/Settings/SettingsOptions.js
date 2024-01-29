/**
 * SettingsOptions is a function that returns an array of objects, each representing a setting option.
 * Each object has a `name` property, which is the name of the setting option, and a `handler` property,
 * which is a function that gets called when the setting option is selected.
 *
 * Currently, the `handler` function for each setting option just logs a message to the console.
 *
 * @param {object} navigation - The navigation object from React Navigation. Currently unused.
 * @returns {object[]} An array of objects representing the setting options.
 */
const SettingsOptions = (navigation) => [
    {
        name: 'Account',
        handler: () => { console.log('Account option selected'); },
    },
    {
        name: 'Notifications',
        handler: () => { console.log('Notifications option selected'); },
    },
    {
        name: 'Privacy',
        handler: () => { console.log('Privacy option selected'); },
    },
    {
        name: 'Display & Sound',
        handler: () => { console.log('Display & Sound option selected'); },
    },
    {
        name: 'Language & Region',
        handler: () => { console.log('Language & Region option selected'); },
    },
    {
        name: 'Help & Support',
        handler: () => { console.log('Help & Support option selected'); },
    },
    {
        name: 'About',
        handler: () => { console.log('About option selected'); },
    },
];

export default SettingsOptions;