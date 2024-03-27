import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Recipes from '../screens/UserProfile/Subscreens/Recipes/Recipes'; 
import NewRecipe from '../screens/UserProfile/Subscreens/Recipes/NewRecipe/NewRecipe'; 

const RecipeStack = createStackNavigator();

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

export default function RecipeNavigator() {
	return (
		<RecipeStack.Navigator initialRouteName="Recipes" screenOptions={commonOptions}>
			<RecipeStack.Screen name="Recipes" component={Recipes} options={{ title: 'Recipes' }} />
			<RecipeStack.Screen name="NewRecipe" component={NewRecipe} options={{ title: 'Add New Recipe' }} />
		</RecipeStack.Navigator>
	);
}
