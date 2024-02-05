// AuthNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../screens/Landing/Landing';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';

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
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}