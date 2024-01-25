import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../screens/Dashboard/Dashboard';
import Stats from '../screens/Stats/Stats';
import Settings from '../screens/Settings/Settings';
import Groups from '../screens/Groups/Groups';
import DataEntry from '../screens/DataEntry/DataEntry';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    return (
        <Tab.Navigator 
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={Dashboard} />
            <Tab.Screen name="Groups" component={Groups} />
            <Tab.Screen name="+" component={DataEntry} />
            <Tab.Screen name="Stats" component={Stats} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}