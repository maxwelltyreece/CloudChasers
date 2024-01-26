import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Navbar from './components/Navbar';
import UserProfile from './screens/UserProfile/UserProfile';

const Stack = createStackNavigator();

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
          name="UserProfile" 
          component={UserProfile} 
          options={{ 
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}