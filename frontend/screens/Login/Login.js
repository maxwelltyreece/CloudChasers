/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, TextInput, Text, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../IPIndex';
import { styles } from './styles';
// import { useUser } from '../../contexts/UserContext';

function Login({ navigation }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		axios.post(`http://${LocalIP}:3000/login`, {
			username,
			password,
		})
			.then((response) => {
			// handle success
				if(response.data.data) {
					AsyncStorage.setItem('token', response.data.data);
					// Navigate to Dashboard
					navigation.navigate('Main');
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
		<View style={styles.container}>
			<View style={styles.loginContainer}>
				<Text style={styles.header}>Welcome Back!</Text>
				<Pressable onPress={() => navigation.navigate('Register')}>
					<Text style={styles.body}>or <Text style={styles.link}>Sign Up Now</Text></Text>
				</Pressable>
				<TextInput 
					style={styles.input} 
					placeholder="Username" 
					value={username} 
					onChangeText={setUsername} 
				/>
				<TextInput 
					style={styles.input} 
					placeholder="Password" 
					value={password} 
					onChangeText={setPassword} 
					secureTextEntry 
				/>
				<View style={styles.buttonContainer}>
					<Pressable style={styles.button} onPress={handleLogin}>
						<Text style={styles.buttonText}>Log In</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

export default Login;
