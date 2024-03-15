import React, { useState } from 'react';
import {
	View, TextInput, Button, StyleSheet, Text, Pressable, Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../../../CloudChasers/frontend/screens/IPIndex';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  currentDOBLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  currentDOBText: {
    fontSize: 17,
	fontWeight: '500',
  },
  selectDOBSectionIOS: {
	flexDirection: 'row',
	justifyContent: 'flex-start',
	alignItems: 'center',
	marginBottom: 16,
  },
  selectDOBSectionAndroid: {
	flexDirection: 'row',
	justifyContent: 'space-around',
	alignItems: 'center',
	marginBottom: 16,
  },
  selectDOBButton: {
    alignItems: 'center',
    justifyContent: 'center',
	width: 'auto',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#FF815E',
  },
  selectDOBButtonText: {
    color: 'white',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});

function Register({ navigation }) {
	const [forename, setForename] = useState('');
	const [surname, setSurname] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState(new Date(Date.now() - 86400000)); // Set to yesterday's date
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const formatDate = (date) => {
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	};

	const iosDatePicker = (
		<View style={styles.selectDOBSectionIOS}>
			<Text style={styles.currentDOBLabel}>Date of Birth: </Text>
			<DateTimePicker
			value={dateOfBirth}
			mode="date"
			display="default"
			onChange={(event, selectedDate) => {
				const currentDate = selectedDate || dateOfBirth;
				setDateOfBirth(currentDate);
				setShowDatePicker(false);
			}}
			maximumDate={new Date(Date.now() - 86400000)}
		/>
		</View>
	);
	
	const androidDatePicker = (
		<View style={styles.selectDOBSectionAndroid}>
		<Text style={styles.currentDOBLabel}>Date of Birth:
			<Text style={styles.currentDOBText}> {formatDate(dateOfBirth)}</Text>
		</Text>
		<Pressable style={styles.selectDOBButton} onPress={() => setShowDatePicker(true)}>
			<Text style={styles.selectDOBButtonText}>Select Date of Birth</Text>
		</Pressable>
		{showDatePicker && (
			<DateTimePicker
				value={dateOfBirth}
				mode="date"
				display="default"
				onChange={(event, selectedDate) => {
					const currentDate = selectedDate || dateOfBirth;
					setDateOfBirth(currentDate);
					setShowDatePicker(false);
				}}
				maximumDate={new Date(Date.now() - 86400000)}
			/>
		)}
		</View>
	);

	const handleRegister = () => {
		if (password !== confirmPassword) {
			console.error('Passwords do not match');
			return;
		}

		axios.post(`http://${LocalIP}:3000/register`, {
			forename: forename,
			surname: surname,
			dateOfBirth: dateOfBirth,
			username: username,
			email: email,
			password: password,
		})
			.then((response) => {
				// console.log(response.data); // Log the entire response data
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
			<TextInput
				style={styles.input}
				placeholder="Forename"
				value={forename}
				onChangeText={setForename}
			/>
			<TextInput
				style={styles.input}
				placeholder="Surname"
				value={surname}
				onChangeText={setSurname}
			/>
			{Platform.OS === 'ios' ? iosDatePicker : androidDatePicker}
			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<TextInput
				style={styles.input}
				placeholder="Confirm Password"
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				secureTextEntry
			/>
			<Button title="Register" onPress={handleRegister} />
		</View>
	);
}

export default Register;

Register.propTypes = {
	navigation: PropTypes.shape({
	navigate: PropTypes.func.isRequired,
	}).isRequired,
  };