import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({ navigation }) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
	// TODO: Replace with local machine ip address
	fetch('http://100.67.146.3:3000/login', {
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
		AsyncStorage.setItem('token', data.data);
		// Navigate to Dashboard or handle login failure
		navigation.navigate('Dashboard');
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
