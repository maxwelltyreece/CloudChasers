import React, { useState, useEffect } from 'react';
import { ImageBackground, Alert, View, TextInput, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';
import { LocalIP } from '../IPIndex';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { requestImagePermissions, pickImage, uploadImage } from '../../services/ImageService';

/**
 * RegisterDetails component
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.navigation - The navigation object from react-navigation
 * @param {Object} props.route - The route object
 * @param {Object} props.route.params - The route parameters
 * @param {string} props.route.params.username - The username
 * @param {string} props.route.params.email - The email
 * @param {string} props.route.params.password - The password
 * @returns {JSX.Element} The RegisterDetails component
 */
function RegisterDetails({ navigation, route }) {
	const { username, email, password } = route.params;
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [profilePicture, setProfilePicture] = useState('');

	useEffect(() => {
		requestImagePermissions();
	}, []);

	const handleLogin = () => {
		axios.post(`http://${LocalIP}:3000/login`, {
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
			const response = await axios.post(`http://${LocalIP}:3000/register`, {
				username,
				email,
				password,
				forename: firstName,
				surname: lastName,
			});
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
				<TouchableOpacity onPress={handlePickImage}>
					<View style={styles.profilePictureContainer}>
						<ImageBackground
							source={profilePicture ? { uri: profilePicture } : { uri: 'https://your-website.com/path-to-default-image.png' }}
							style={styles.profilePicture}
							imageStyle={{ borderRadius: 70 }}
						>
						</ImageBackground>
						<Icon name="camera" size={30} color="#000" style={styles.cameraIcon} />
					</View>
				</TouchableOpacity>
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