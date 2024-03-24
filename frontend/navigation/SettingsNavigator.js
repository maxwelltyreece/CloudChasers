// SettingsNavigator.js
import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../screens/Settings/Settings';
import {
	About, Account, HelpAndSupport, Privacy, EditPage,
} from '../screens/Settings/Subscreens';

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

export default function SettingsNavigator() {
	return (
		<Stack.Navigator initialRouteName="SettingsIndex">
			<Stack.Screen
				name="SettingsIndex"
				component={Settings}
				options={{
					...commonOptions,
					title: 'Settings',
				}}
			/>
			<Stack.Screen name="About" component={About} options={{ ...commonOptions, title: 'About' }} />
			<Stack.Screen name="Account" component={Account} options={{ ...commonOptions, title: 'Account' }} />
			<Stack.Screen name="HelpAndSupport" component={HelpAndSupport} options={{ ...commonOptions, title: 'Help & Support' }} />
			<Stack.Screen name="Privacy" component={Privacy} options={{ ...commonOptions, title: 'Privacy' }} />
			<Stack.Screen name="EditPage" component={EditPage} options={{ ...commonOptions, title: '' }} />
		</Stack.Navigator>
	);
}
