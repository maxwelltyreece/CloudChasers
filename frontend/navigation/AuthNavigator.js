// AuthNavigator.js
import React from 'react'; // import React
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons'; // import Feather
import { View } from 'react-native'; // import View
import Landing from '../screens/Landing/Landing';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import SecondaryReg from '../screens/SecondaryReg/SecondaryReg';


const Stack = createStackNavigator();

export default function AuthNavigator() {
	return (
		<Stack.Navigator initialRouteName="Landing">
			<Stack.Screen
				name="Landing"
				component={Landing}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{
					headerTitle: '',
					headerBackTitleVisible: false,
					headerTransparent: true,
					headerBackImage: () => (
						<View style={{ paddingLeft: 10 }}>
							<Feather name="chevron-left" size={40} color="white" />
						</View>
					),
				}}
			/>
			<Stack.Screen
				name="Register"
				component={Register}
				options={{
					headerTitle: '',
					headerBackTitleVisible: false,
					headerTransparent: true,
					headerBackImage: () => (
						<View style={{ paddingLeft: 10 }}>
							<Feather name="chevron-left" size={25} color="#6B6868" />
						</View>
					),
				}}
			/>
			<Stack.Screen
				name="SecondaryReg"
				component={SecondaryReg}
				options={{
					headerTitle: '',
					headerBackTitleVisible: false,
					headerTransparent: true,
					headerBackImage: () => (
						<View style={{ paddingLeft: 10 }}>
							<Feather name="chevron-left" size={25} color="#6B6868" />
						</View>
					),
				}}
			/>
		</Stack.Navigator>
	);
}
