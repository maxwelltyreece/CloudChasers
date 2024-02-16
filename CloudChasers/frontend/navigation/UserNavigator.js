import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import UserProfile from '../screens/UserProfile/UserProfile';
import Goals from '../screens/UserProfile/Subscreens/Goals';

const Stack = createStackNavigator();

const UserNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="UserProfile">
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Goals" component={Goals} options={{ ...commonOptions, title: 'Goals' }}/>
    </Stack.Navigator>
  </NavigationContainer>
);

export default UserNavigator;