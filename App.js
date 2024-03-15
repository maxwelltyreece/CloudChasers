/* eslint-disable camelcase */
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { View, StatusBar } from 'react-native';
import globalStyles from './frontend/styles/global';
import AuthNavigator from './frontend/navigation/AuthNavigator';
import MainNavigator from './frontend/navigation/MainNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';

import {
	useFonts,
	Montserrat_100Thin,
	Montserrat_200ExtraLight,
	Montserrat_300Light,
	Montserrat_400Regular,
	Montserrat_500Medium,
	Montserrat_600SemiBold,
	Montserrat_700Bold,
	Montserrat_800ExtraBold,
	Montserrat_900Black,
} from '@expo-google-fonts/montserrat';

import { UserProvider } from './frontend/contexts/UserContext';
import { CommunityProvider } from './frontend/contexts/CommunityContext';
import { FoodStatsProvider } from './frontend/contexts/foodStatsContext';
// import AuthNavigator from './frontend/navigation/AuthNavigator';
// import MainNavigator from './frontend/navigation/MainNavigator';
import { getUserCommunities } from './frontend/services/CommunityService';

const Stack = createStackNavigator();

/**
 * App is the root component of the application.
 * It sets up a navigation container with a stack navigator.
 * The stack navigator includes the 'Navbar' and 'Settings' screens.
 * The 'Navbar' screen is set as the initial screen.
 * The headers for both screens are hidden.
 *
 * @returns {React.Element} The rendered navigation container.
 */
export default function App() {
	const [fontsLoaded] = useFonts({
		Montserrat_100Thin,
		Montserrat_200ExtraLight,
		Montserrat_300Light,
		Montserrat_400Regular,
		Montserrat_500Medium,
		Montserrat_600SemiBold,
		Montserrat_700Bold,
		Montserrat_800ExtraBold,
		Montserrat_900Black,
	});

	const [initialRoute, setInitialRoute] = useState(null);

	useEffect(() => {
		NavigationBar.setBackgroundColorAsync('#000');
	}, []);

	useEffect(() => {
		const checkToken = async () => {
			try {
				const token = await AsyncStorage.getItem('token');
				setInitialRoute(token ? 'Main' : 'Auth');
			} catch (error) {
				console.log(error);
			}
		};

		checkToken();
		getUserCommunities();
	}, []);

	if (!fontsLoaded || !initialRoute) {
		return null;
	}



	return (
		<CommunityProvider>
			<UserProvider>
				<FoodStatsProvider>
					<NavigationContainer>
						<Stack.Navigator initialRouteName={initialRoute}>
							<Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
							<Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
						</Stack.Navigator>
					</NavigationContainer>
				</FoodStatsProvider>
			</UserProvider>
		</CommunityProvider>
	);
}
