import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './frontend/navigation/AuthNavigator';
import MainNavigator from './frontend/navigation/MainNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

// Font imports
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
import { StatsProvider } from './frontend/contexts/StatsContext';
import { GoalsProvider } from './frontend/contexts/GoalsContext';
import { RemindersProvider } from './frontend/contexts/RemindersContext';
import { FoodLogProvider } from './frontend/contexts/FoodLogContext';
import { AwardsProvider } from './frontend/contexts/AwardsContext';

import { getUserCommunities } from './frontend/services/CommunityService';
import { Platform } from 'react-native';

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
		if (Platform.OS === 'android') {
			NavigationBar.setBackgroundColorAsync('#000');
		}
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
				<FoodLogProvider>
					<StatsProvider>
						<GoalsProvider>
							<AwardsProvider>
								<RemindersProvider>
									<NavigationContainer>
										<Stack.Navigator initialRouteName={initialRoute}>
											<Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
											<Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
										</Stack.Navigator>
									</NavigationContainer>
								</RemindersProvider>
							</AwardsProvider>
						</GoalsProvider>
					</StatsProvider>
				</FoodLogProvider>
			</UserProvider>
		</CommunityProvider>
	);
}
