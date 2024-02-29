// MainNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from '../components/Navbar';
import SettingsNavigator from './SettingsNavigator';
import GroupNavigator from './GroupNavigator';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const Stack = createStackNavigator();

const commonOptions = {
    headerShown: true,
    headerStyle: {
        backgroundColor: '#F0F0F0',
    },
    headerTitleStyle: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14,
    },
    headerBackImage: () => (
        <View style={{ paddingLeft: 10 }}>  
            <Feather name="chevron-left" size={25} color="#6B6868" />
        </View>
    ),
    headerBackTitleVisible: false, 
};

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
            <Stack.Screen 
                name="Group" 
                component={GroupNavigator} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}