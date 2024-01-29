// Groups.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Groups = () => (
    <View style={styles.container}>
        <Text>Welcome to the Groups!</Text>
    </View>
);

export default Groups;