// MainNavigator.js
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from '../components/Navbar';
import SettingsNavigator from './SettingsNavigator';
import GroupNavigator from './GroupNavigator';
import { useUser } from '../contexts/UserContext';
import { useCommunity } from '../contexts/CommunityContext';
import DataEntryNavigator from './DataEntryNavigator';

const Stack = createStackNavigator();

export default function MainNavigator() {
	const { userDetails, updateUserDetails } = useUser();
    const { getUserCommunities } = useCommunity();

	useEffect(() => {
		if (!userDetails) {
			updateUserDetails();
		}
        getUserCommunities();
	}, []);

	return (
		<Stack.Navigator initialRouteName="Navbar">
            <Stack.Screen
				name="Navbar"
				component={Navbar}
				options={{ headerShown: false }}
			/>
            <Stack.Screen
				name="Data"
				component={DataEntryNavigator}
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
