import React from 'react';
import { View, Text, Button } from 'react-native';

function MainScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Button title="Log In" onPress={() => navigation.navigate('Login')} />
			<Button title="Register" onPress={() => navigation.navigate('Register')} />
		</View>
	);
}

export default MainScreen;
