// Settings.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserProfileButton from '../../components/UserProfileButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Settings = () => (
    <View style={styles.container}>
        <Text>Welcome to the Settings!</Text>
        <UserProfileButton />
    </View>
);

export default Settings;