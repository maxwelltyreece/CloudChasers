import React, { useState } from 'react';
import { Alert, View, TextInput, Text, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please fill out all fields');
            return;
        }
        
        axios.post(`http://api.gobl-up.me:80/login`, {
            username,
            password,
        })
        .then((response) => {
            if(response.data.data) {
                AsyncStorage.setItem('token', response.data.data);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            } else {
                Alert.alert('Login failed', 'Please try again');
            }
        })
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                Alert.alert('Error', error.response.data);
                Alert.alert('Status', error.response.status);
                Alert.alert('Headers', JSON.stringify(error.response.headers));
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                Alert.alert('Error', 'Request Error');
            } else {
                // Something happened in setting up the request that triggered an Error
                Alert.alert('Error', error.message);
            }
            Alert.alert('Config', JSON.stringify(error.config));
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
