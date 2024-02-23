import React, { useState } from 'react';
import {
	View, Text, Button, TextInput,
} from 'react-native';
import { BACKEND_IP } from '@env';
import { LocalIP } from '../IPIndex';

function RegisterScreen({ navigation }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = () => {
		fetch(`http://${LocalIP}:3000/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success:', data);
				// Navigate to Login or handle registration failure
				navigation.navigate('Login');
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<TextInput placeholder="Username" onChangeText={setUsername} value={username} />
			<TextInput placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
			<Button title="Register" onPress={handleRegister} />
		</View>
	);
}

export default RegisterScreen;
