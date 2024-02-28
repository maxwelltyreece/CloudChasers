import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { LocalIP } from '../../IPIndex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../../context/UserContext';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        width: '80%',
        padding: 10,
    },
    button: {
        marginTop: 20,
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
const EditPage = ({ route: { params: { field, oldValue } } }) => {
    const [newField, setNewField] = useState('');

    const { updateDetails } = useContext(UserContext);

    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.put(`http://${LocalIP}:3000/updateProfile`, {
                'username' : newField
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            updateDetails();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Old {field}: {oldValue}</Text>
            <TextInput
                style={styles.input}
                onChangeText={setNewField}
                value={newField}
                placeholder={`Enter new ${field}`}
            />
            <View style={styles.button}>
                <Button title="Update" onPress={handleUpdate} />
            </View>
        </View>
    );
};

export default EditPage;