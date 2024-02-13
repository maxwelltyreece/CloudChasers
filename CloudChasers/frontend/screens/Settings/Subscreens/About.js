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
 * About is a screen component designed for displaying information about the app.
 * It uses styles from both the global styles and its own styles.
 *
 * @returns {React.Element} The rendered About screen.
 */
const About = () => (
    <View style={styles.container}>
        <Text style={globalStyles.medium}>Placeholder for About</Text>
    </View>
);

export default About;