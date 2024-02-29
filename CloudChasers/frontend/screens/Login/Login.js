import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../IPIndex';
import global from '../../styles/global';

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
};

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
        shadowColor: "#000",
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
        marginBottom: 4,
        color: '#6B6868',
        fontFamily: 'Montserrat_700Bold',
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
});

export default Login;