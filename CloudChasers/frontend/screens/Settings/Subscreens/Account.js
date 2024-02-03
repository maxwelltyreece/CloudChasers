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
 * Account is a screen component designed for displaying and managing user account information.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered Account screen.
 */
const Account = () => (
    <View style={styles.container}>
        <Text style={globalStyles.medium}>Placeholder for Account</Text>
    </View>
);

export default Account;