import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_IP } from '@env';
import { LocalIP } from './IPIndex';
const LoginScreen = ({ navigation }) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
	// TODO: Replace with local machine ip address
	fetch( `${LocalIP}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username,
			password,
		}),
	})
	.then(response => response.json())
	.then(data => {
		console.log('Success:', data);
		if (data.data) {
			AsyncStorage.setItem('token', data.data);
			// Navigate to Dashboard
			navigation.navigate('Dashboard');
		} else {
			// Handle login failure
			console.error('Login failed');
		}
	})
	.catch((error) => {
		console.error('Error:', error);
	});
};

return (
	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<TextInput placeholder="Username" onChangeText={setUsername} value={username} />
		<TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
		<Button title="Log In" onPress={handleLogin} />
	</View>
);
};

export default LoginScreen;
