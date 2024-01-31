import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SettingsButton from '../../components/SettingsButton';
import globalStyles from '../../styles/global';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

/**
 * UserProfile is a screen component designed for displaying user profile information.
 * It includes a SettingsButton component and uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered UserProfile screen.
 */
const UserProfile = () => (
    <View style={styles.container}>
        <Text style={globalStyles.medium}>Placeholder for user profile</Text>
        <SettingsButton />
    </View>
);

export default UserProfile;