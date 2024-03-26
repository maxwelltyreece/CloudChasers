import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Styles for the WelcomeBar component
 */
const styles = StyleSheet.create({
    welcomeContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: 5, 
        borderRadius: 15,
        padding: 10,
    },
    title: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 24,
        marginBottom: 10,
    },
});

/**
 * WelcomeBar component
 * This component displays a welcome message with today's statistics.
 */
const WelcomeBar = () => (
    <View style={styles.welcomeContainer}>
        <Text style={styles.title}>Today&apos;s Statistics</Text>
    </View>
);
export default WelcomeBar;