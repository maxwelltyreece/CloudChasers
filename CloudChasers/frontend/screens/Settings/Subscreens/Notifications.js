import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../../../styles/global';

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center',
    },
});

/**
 * Notifications is a screen component designed for displaying and managing user notifications settings.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered Notifications screen.
 */
const Notifications = () => (
    <View style={styles.container}>
        <Text style={globalStyles.medium}>Placeholder for Notifications</Text>
    </View>
);

export default Notifications;