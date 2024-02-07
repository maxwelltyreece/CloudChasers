const UserProfileOptions = (navigation) => [
    {
        name: 'My Meals',
        handler: () => navigation.navigate('MyMeals'),

    },
    {
        name: 'Reminders',
        handler: () => navigation.navigate('Reminders'),
    },
    {
        name: 'Goals',
        handler: () => navigation.navigate('Goals'),
    },

];

export default UserProfileOptions;