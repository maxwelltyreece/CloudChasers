/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Alert, View, TextInput, TouchableOpacity, Text, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './styles';

function Register({ navigation }) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleNext = () => {
		if (!username || !email || !password || !confirmPassword) {
			Alert.alert('Error', 'Please fill out all fields');
			return;
		}
		if (password !== confirmPassword) {
			Alert.alert('Error', 'Passwords do not match');
			return;
		}
		navigation.navigate('SecondaryReg', { username, email, password });        
	}

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
					<TouchableOpacity style={styles.button} onPress={handleNext}>
						<Text style={styles.buttonText}>Create account</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default Register;
