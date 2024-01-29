import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SettingsButton from '../../components/SettingsButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const UserProfile = () => (
    <View style={styles.container}>
        <Text>UserProfile</Text>
        <SettingsButton />
    </View>
);

export default UserProfile;