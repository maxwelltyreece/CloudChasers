import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../IPIndex';

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post(`http://${LocalIP}:3000/login`, {
            username: username,
            password: password
        })
        .then(function (response) {
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
        .catch(function (error) {
            console.error('Error:', error);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.orangeBlock} />
            <View style={styles.whiteBlock}>
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
                <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    orangeBlock: {
        position: 'absolute',
        backgroundColor: '#FF815E', // Updated color
        width: '120%',
        height: '120%',
        top: '-40%',
        left: '-10%',
        transform: [{ rotate: '-60deg' }],
    },
    whiteBlock: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        padding: 16,
        zIndex: 1,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
});

export default Login;