import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FoodEntry from '../screens/DataEntry/FoodEntry';


const Stack = createStackNavigator();

export default function DataEntryNavigator() {
	return (
        <Stack.Navigator>
            <Stack.Screen name="Food" component={FoodEntry} />
            <Stack.Screen name="Water" component={FoodEntry} />
        </Stack.Navigator>

	);
}
