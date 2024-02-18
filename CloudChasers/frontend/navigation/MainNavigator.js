// MainNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from '../components/Navbar'; // Update this path if necessary
import SettingsNavigator from './SettingsNavigator';
const Stack = createStackNavigator();

export default function MainNavigator() {
    return (
        <Stack.Navigator initialRouteName="Navbar">
            <Stack.Screen 
                name="Navbar" 
                component={Navbar} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Settings" 
                component={SettingsNavigator} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}