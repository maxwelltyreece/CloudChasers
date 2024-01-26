import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function UserProfileButton() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('UserProfile')}
        >
            <FontAwesome5 name="cog" size={24} color={globalStyles.secondaryColor.color} solid />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10,
        position: 'absolute',
        top: 40,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
});