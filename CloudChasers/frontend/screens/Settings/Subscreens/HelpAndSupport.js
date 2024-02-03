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
 * HelpAndSupport is a screen component designed for displaying help and support information.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered HelpAndSupport screen.
 */
const HelpAndSupport = () => (
    <View style={styles.container}>
        <Text style={globalStyles.medium}>Placeholder for Help & Support</Text>
    </View>
);

export default HelpAndSupport;