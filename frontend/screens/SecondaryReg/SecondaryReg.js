import React, { useState, useEffect } from 'react';
import { Alert, View, TextInput, TouchableOpacity, Text, Image, Button } from 'react-native';
import axios from 'axios';
import { LocalIP } from '../IPIndex';
import { styles } from './styles';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function RegisterDetails({ navigation, route }) {
	const { username, email, password } = route.params;
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [profilePicture, setProfilePicture] = useState('');
	const { editUserDetails } = useUser();

	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	const handleLogin = () => {
		axios.post(`http://${LocalIP}:3000/login`, {
			username,
			password,
		})
			.then((response) => {
				if(response.data.data) {
					AsyncStorage.setItem('token', response.data.data);
					navigation.navigate('Main');
				} else {
					console.error('Login failed');
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	const handleRegisterDetails = async () => {
		if (!firstName || !lastName) {
			Alert.alert('Error', 'Please fill out all fields');
			return;
		}
		// let imageUrl = profilePicture;

		// if (profilePicture) {
		//     const token = await AsyncStorage.getItem('token');
		//     const formData = new FormData();
		//     let filename = profilePicture.split('/').pop();
		//     let match = /\.(\w+)$/.exec(filename);
		//     let type = match ? `image/${match[1]}` : `image`;

		//     formData.append('image', { uri: profilePicture, name: filename, type });
		//     formData.append('folder', 'profilePictures');

		//     const response = await axios.post(`http://${LocalIP}:3000/image/uploadPicture`, formData, {
		//         headers: {
		//             'Content-Type': 'multipart/form-data',
		//             Authorization: `Bearer ${token}`,
		//         },
		//     });

		//     imageUrl = response.data;
		// }
		axios.post(`http://${LocalIP}:3000/register`, {
			username,
			email,
			password,
			forename: firstName,
			surname: lastName,
			// profilePicture: imageUrl,
		}).then(() => {
			console.log('User registered');
			handleLogin();
		})
			.catch((error) => {
				if (error.response && error.response.data.error) {
					Alert.alert('Error', 'Invalid Email');
				} else {
					Alert.alert('Error:', error.message);
				}
			})
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setProfilePicture(result.uri);
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
				<Button title="Pick Profile Picture" onPress={pickImage} />
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