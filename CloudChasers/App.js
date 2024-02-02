
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from './frontend/components/Navbar';
import Settings from './frontend/screens/Settings/Settings';
import Landing from './frontend/screens/Landing/Landing';
import Login from './frontend/screens/Login/Login';
import Register from './frontend/screens/Register/Register';
import { NavigationContainer } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
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
			<Stack.Navigator 
				initialRouteName="Landing"
			>
				<Stack.Screen 
                name="Landing" 
                component={Landing} 
                options={{ 
                    headerShown: false
                }}
			    />
				<Stack.Screen 
					name="Login" 
					component={Login} 
					options={{ 
						headerShown: false
					}}
				/>
				<Stack.Screen 
					name="Register" 
					component={Register} 
					options={{ 
						headerShown: false
					}}
				/>
				<Stack.Screen 
					name="Navbar" 
					component={Navbar} 
					options={{ 
						headerShown: false
					}}
				/>
				<Stack.Screen 
					name="Settings" 
					component={Settings} 
					options={{ 
						headerShown: true,
						headerStyle: {
							backgroundColor: '#F0F0F0',
						},
						headerBackImage: () => (
							<View style={{ paddingLeft: 10 }}>  
								<Feather name="chevron-left" size={25} color="#6B6868" />
							</View>
						),
						headerBackTitleVisible: false, 
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

