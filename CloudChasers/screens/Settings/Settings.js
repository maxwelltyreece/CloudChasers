import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
    },
});

/**
 * Settings is a component that renders a 'Settings!' message in the center of the screen.
 * It also includes a back button in the top left corner that navigates to the previous screen.
 * It uses styles from its own StyleSheet.
 *
 * @returns {React.Element} The rendered settings screen.
 */
const Settings = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="chevron-back" size={35} color="#000" />
            </TouchableOpacity>
            <Text>Settings!</Text>
        </View>
    );
};

export default Settings;