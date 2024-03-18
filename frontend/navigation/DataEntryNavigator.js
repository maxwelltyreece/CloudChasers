import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FoodEntry, WaterEntry } from '../screens';

const Stack = createStackNavigator();

export default function DataEntryNavigator() {
	console.log("datentry nav loaded");
    return (
        
        <Stack.Navigator>
            <Stack.Screen name='FoodEntry' component={FoodEntry} options={{title:'Food'}}/>
            <Stack.Screen name='WaterEntry' component={WaterEntry} options={{title:'Water'}} />
        </Stack.Navigator>

	);
}
