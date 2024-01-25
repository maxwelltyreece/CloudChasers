import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UserProfileButton() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('UserProfile')}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#000',
        margin: 10,
        position: 'absolute',
        top: 40,
        right: 0,
    },
});