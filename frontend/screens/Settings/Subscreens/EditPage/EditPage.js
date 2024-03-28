import React, { useState } from 'react';
import {
	View, Text, TextInput, Pressable, Alert,
} from 'react-native';
import { useUser } from '../../../../contexts/UserContext';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

/**
 * EditPage component
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.route - The route object from react-navigation
 * @param {Object} props.route.params - The route parameters
 * @param {string} props.route.params.field - The field name to be edited
 * @param {string} props.route.params.realName - The real name of the field to be edited
 * @returns {JSX.Element} The EditPage component
 */
function EditPage({ route }) {
	const { field, realName } = route.params;
	const { userDetails, editUserDetails } = useUser();
	const fieldValue = userDetails && userDetails ? userDetails[realName] : '';
	const [newValue, setNewValue] = useState('');
    const navigation = useNavigation();

	const handlePress = async () => {
        if (!newValue.trim()) {
            Alert.alert('Error', 'Please enter a valid value.');
            return;
        }
        try {
            await editUserDetails({ [realName]: newValue });
            Alert.alert(
                'Success', 
                'Your changes have been saved.', 
                [
                    {text: 'OK', onPress: () => navigation.goBack()}
                ]
            );
        } catch (error) {
            console.error('Failed to save changes:', error);
            Alert.alert('Error', 'Failed to save changes. Please try again.');
        }
    };

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				{`Editing ${field}`}
			</Text>
			<Text style={styles.text}>
				{`Current ${field}: ${fieldValue}`}
			</Text>
			<TextInput
				style={styles.input}
				value={newValue}
				onChangeText={(text) => setNewValue(text)}
				placeholder={`Enter new ${field}`}
				textAlign='center'
			/>
			<Pressable style={styles.button} onPress={handlePress}>
				<Text style={styles.buttonText}>Change Value</Text>
			</Pressable>
		</View>
	);
}

export default EditPage;

EditPage.PropTypes = {
	route: PropTypes.shape({
		params: PropTypes.shape({
			field: PropTypes.string,
			realName: PropTypes.string,
		}),
	}).isRequired,
};