import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from '../screens/UserProfile/UserProfile';
import { Goals, Reminders, Awards } from '../screens/UserProfile/Subscreens';
import RecipeNavigator from './RecipeNavigator';

const Stack = createStackNavigator();

const commonOptions = {
	headerShown: true,
	headerStyle: {
		backgroundColor: '#F0F0F0',
	},
	headerTitleStyle: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 22,
	},
	headerBackImage: () => (
		<View style={{ paddingLeft: 10 }}>
			<Feather name="chevron-left" size={25} color="#6B6868" />
		</View>
	),
	headerBackTitleVisible: false,
};

export default function UserNavigator() {
	return (
		<Stack.Navigator initialRouteName="UserProfile">
			<Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
			<Stack.Screen name="Recipes" component={RecipeNavigator} options={{ ...commonOptions, headerShown: false }} />
			<Stack.Screen name="Reminders" component={Reminders} options={{ ...commonOptions, title: 'Reminders' }} />
			<Stack.Screen name="Goals" component={Goals} options={{ ...commonOptions, title: 'Goals' }} />
			<Stack.Screen name="Awards" component={Awards} options={{ ...commonOptions, title: 'Awards' }} />
		</Stack.Navigator>

	);
}
