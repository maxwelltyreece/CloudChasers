// SettingsNavigator.js
import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings/Settings';

const Stack = createStackNavigator();

export default function SettingsNavigator() {
    return (
        <Stack.Navigator initialRouteName="SettingsIndex">
            <Stack.Screen 
                name="SettingsIndex" 
                component={Settings} 
                options={{ 
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
                }}
            />
        </Stack.Navigator>
    );
}