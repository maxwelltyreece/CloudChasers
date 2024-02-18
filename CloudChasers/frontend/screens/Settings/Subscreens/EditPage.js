import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

const EditPage = ({ route }) => {
    // Get the field parameter from the route
    const { field } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Editing {field}</Text>
        </View>
    );
};

export default EditPage;