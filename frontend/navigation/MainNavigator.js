// MainNavigator.js
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { View
} from 'react-native';
import Navbar from '../components/Navbar/Navbar';
import SettingsNavigator from './SettingsNavigator';
import GroupNavigator from './GroupNavigator';
import UserNavigator from './UserNavigator';
import { useUser } from '../contexts/UserContext';
import { useCommunity } from '../contexts/CommunityContext';
import { FoodEntry, WaterEntry, RecipeEntry } from '../screens';

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
				name="Settings"
				component={SettingsNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Group"
				component={GroupNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen 
				name='FoodEntry' 
				component={FoodEntry} 
				options={{...commonOptions, 
					title:'Food'}}/>
			<Stack.Screen 
				name='WaterEntry' 
				component={WaterEntry} 
				options={{...commonOptions, title:''}} />
            <Stack.Screen
                name='RecipeEntry'
                component={RecipeEntry}
                options={{...commonOptions, title: ''}}
            />
			<Stack.Screen
				name="User"
				component={UserNavigator}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
