import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles/global';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

/**
 * Groups is a screen component designed for displaying and managing user groups.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered Groups screen.
 */
const Groups = () => (
    <View style={styles.container}>
        <Text style={globalStyles.medium}>Placeholder for groups</Text>
    </View>
);

export default Groups;