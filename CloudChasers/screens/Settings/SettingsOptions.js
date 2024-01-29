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