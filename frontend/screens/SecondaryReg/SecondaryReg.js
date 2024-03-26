import React, { useState, useEffect } from 'react';
import { Alert, View, TextInput, TouchableOpacity, Text, Image, Button } from 'react-native';
import axios from 'axios';
import { LocalIP } from '../IPIndex';
import { styles } from './styles';
import { useUser } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestImagePermissions, pickImage, uploadImage } from '../../services/ImageService';

function RegisterDetails({ navigation, route }) {
	const { username, email, password } = route.params;
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [profilePicture, setProfilePicture] = useState('');
	const { editUserDetails } = useUser();

	useEffect(() => {
		requestImagePermissions();
	}, []);

	const handleLogin = () => {
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
					console.error('Login failed');
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const registerUser = async () => {
		try {
			const response = await axios.post(`http://api.gobl-up.me:80/register`, {
				username,
				email,
				password,
				forename: firstName,
				surname: lastName,
			});
			// console.log('User registered');
			return response;
		} catch (error) {
			if (error.response && error.response.data.error) {
				Alert.alert('Error', 'Invalid Email');
			} else {
				Alert.alert('Error:', error.message);
			}
		}
	};

	const handleRegisterDetails = async () => {
		if (!firstName || !lastName) {
			Alert.alert('Error', 'Please fill out all fields');
			return;
		}

		const registerResponse = await registerUser();
		const userId = registerResponse.data.data._id;

		if (profilePicture) {
			await uploadImage(userId, profilePicture, 'Profile_Pictures');
		}

		handleLogin();
	};

	const handlePickImage = async () => {
		const imageUri = await pickImage();
		if (imageUri) {
			setProfilePicture(imageUri);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.loginContainer}>
				<Text style={styles.header}>Complete Your Profile!</Text>
				<TextInput
					style={styles.input}
					placeholder="First Name"
					value={firstName}
					onChangeText={setFirstName}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="Last Name"
					value={lastName}
					onChangeText={setLastName}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<Button title="Pick Profile Picture" onPress={handlePickImage} />
				{profilePicture ? <Image source={{ uri: profilePicture }} style={styles.profilePicture} /> : null}
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={handleRegisterDetails}>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default RegisterDetails;