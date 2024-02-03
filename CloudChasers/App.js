
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from './frontend/components/Navbar';
import Settings from './frontend/screens/Settings/Settings';
import Landing from './frontend/screens/Landing/Landing';
import Login from './frontend/screens/Login/Login';
import Register from './frontend/screens/Register/Register';
import { NavigationContainer } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import globalStyles from './frontend/styles/global';
import AuthNavigator from './frontend/navigation/AuthNavigator';
import MainNavigator from './frontend/navigation/MainNavigator';
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
} from "@expo-google-fonts/montserrat";


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
	let [fontsLoaded] = useFonts({
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
	if (!fontsLoaded) {
		return null;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Main">
				<Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
				<Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

