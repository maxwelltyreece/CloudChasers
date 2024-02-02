import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../IPIndex';

const Register = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        axios.post(`http://${LocalIP}:3000/register`, {
            username: username,
            password: password
        })
        .then(function (response) {
            console.log(response.data);  // Log the entire response data
            // handle success
            if(response.data.success) {
                AsyncStorage.setItem('token', response.data.data);
                navigation.navigate('Navbar');
            } else {
                // Handle registration failure
                console.error('Registration failed');
            }
        })
        .catch(function (error) {
            // handle error
            console.error('Error:', error);
        });
    };

    return (
        <View style={styles.container}>
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
};

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
});

export default Register;