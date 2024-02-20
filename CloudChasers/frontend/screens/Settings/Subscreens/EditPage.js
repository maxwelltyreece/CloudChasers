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

/**
 * EditPage component.
 * This component is used to display the editing page for a specific field.
 * The field to be edited is passed as a parameter in the route object.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.route - The route object passed by the navigation.
 * @param {Object} props.route.params - The parameters passed in the route.
 * @param {string} props.route.params.field - The field to be edited.
 * @returns {React.Node} The rendered component.
 */
const EditPage = ({ route: { params: { field } } }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Editing {field}</Text>
        </View>
    );
};

export default EditPage;