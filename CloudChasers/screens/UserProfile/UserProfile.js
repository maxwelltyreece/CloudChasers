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

/**
 * UserProfile is a component that renders a 'UserProfile' message in the center of the screen.
 * It also includes a SettingsButton component.
 * It uses styles from its own StyleSheet.
 *
 * @returns {React.Element} The rendered user profile screen.
 */
const UserProfile = () => (
    <View style={styles.container}>
        <Text>UserProfile</Text>
        <SettingsButton />
    </View>
);

export default UserProfile;