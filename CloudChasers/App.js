import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navbar from './components/Navbar';
import Settings from './screens/Settings/Settings';

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
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Navbar"
      >
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
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}