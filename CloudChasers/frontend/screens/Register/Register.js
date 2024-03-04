/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../IPIndex';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FF815E',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginContainer: {
		width: '90%',
		height: '60%',
		backgroundColor: 'white',
		paddingHorizontal: 24,
		paddingTop: 48,
		zIndex: 1,
		borderRadius: 50,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
	},
	input: {
		height: 50,
		backgroundColor: '#F7F7F7',
		marginBottom: 16,
		padding: 8,
		fontFamily: 'Montserrat_600SemiBold',
		borderRadius: 20,
		color: '#6B6868',
	},
	header: {
		fontSize: 24,
		marginBottom: 16,
		color: '#6B6868',
		fontFamily: 'Montserrat_700Bold',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FF815E',
		padding: 15,
		borderRadius: 30,
		width: '70%',
	},
	buttonText: {
		color: 'white',
		fontFamily: 'Montserrat_600SemiBold',
	},
	buttonContainer: {
		marginTop: 24,
		alignItems: 'center',
		width: '100%',
	},
	body: {
		fontSize: 16,
		color: '#6B6868',
		fontFamily: 'Montserrat_600SemiBold',
		marginBottom: 36,
	},
	link: {
		color: '#FF815E',
		fontFamily: 'Montserrat_600SemiBold',
	},
});
function Register({ navigation }) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleRegister = () => {
		if (password !== confirmPassword) {
			console.error('Passwords do not match');
			return;
		}

		axios.post(`http://${LocalIP}:3000/register`, {
			username,
			email,
			password,
		})
			.then((response) => {
				console.log(response.data); // Log the entire response data
				// handle success
				if (response.data.success) {
					AsyncStorage.setItem('token', response.data.data);
					navigation.navigate('Main');
				} else {
					// Handle registration failure
					console.error('Registration failed');
				}
			})
			.catch((error) => {
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.error('Response data:', error.response.data);
					console.error('Response status:', error.response.status);
					console.error('Response headers:', error.response.headers);
				} else if (error.request) {
					console.error('Request:', error.request);
				} else {
					console.error('Error message:', error.message);
				}
				console.error('Error config:', error.config);
			});
	};

	return (
		<View style={styles.container}>
			<View style={styles.loginContainer}>
				<Text style={styles.header}>Register!</Text>
				<Pressable onPress={() => navigation.navigate('Login')}>
					<Text style={styles.body}>Already have an account? <Text style={styles.link}>Sign In</Text></Text>
				</Pressable>
				<TextInput
					style={styles.input}
					placeholder="Username"
					value={username}
					onChangeText={setUsername}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChangeText={setEmail}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="Confirm Password"
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={handleRegister}>
						<Text style={styles.buttonText}>Create account</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}


export default Register;
