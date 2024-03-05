// MainNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from '../components/Navbar';
import SettingsNavigator from './SettingsNavigator';
import GroupNavigator from './GroupNavigator';

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
			<Stack.Screen
				name="Group"
				component={GroupNavigator}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
