import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

/**
 * DataEntry is a component that renders a welcome message in the center of the screen.
 * It uses styles from its own StyleSheet.
 *
 * @returns {React.Element} The rendered screen.
 */
const DataEntry = () => (
    <View style={styles.container}>
        <Text>Welcome to the Data Entry!</Text>
    </View>
);

export default DataEntry;