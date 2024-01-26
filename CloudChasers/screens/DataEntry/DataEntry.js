// DataEntry.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserProfileButton from '../../components/UserProfileButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const DataEntry = () => (
    <View style={styles.container}>
        <Text>Welcome to the Data Entry!</Text>
    </View>
);

export default DataEntry;