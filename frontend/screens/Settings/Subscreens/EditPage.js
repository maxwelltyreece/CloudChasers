import React, { useState } from 'react';
import {
	View, Text, TextInput, Pressable, StyleSheet,
} from 'react-native';
import { useUser } from '../../../contexts/UserContext';
import proptypes from 'prop-types';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	title: {
		fontSize: 30,
		fontFamily: 'Montserrat_700Bold',
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
		fontFamily: 'Montserrat_600SemiBold',
	},
	input: {
		height: 50,
		backgroundColor: '#F7F7F7',
		marginBottom: 16,
		padding: 8,
		fontFamily: 'Montserrat_600SemiBold',
		borderRadius: 20,
		color: '#6B6868',
	},
	button: {
		width: '100%',
		height: 50,
		marginTop: 20,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FF815E',
	},
	buttonText: {
		color: '#FFFFFF',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
	},
});

function EditPage({ route }) {
	// Get the field parameter from the route
	const { field, realName } = route.params;

	// Use the useUser hook to get the userDetails
	const { userDetails, editUserDetails } = useUser();

	// Get the value of the field we're editing
    const fieldValue = userDetails && userDetails.data ? userDetails.data[realName] : '';

	const [newValue, setNewValue] = useState('');

    const handlePress = () => {
        editUserDetails({ [realName]: newValue });
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
			/>
			<Pressable style={styles.button} onPress={handlePress}>
				<Text style={styles.buttonText}>Change Value</Text>
			</Pressable>
		</View>
	);
}

export default EditPage;

EditPage.propTypes = {
	route: proptypes.shape({
		params: proptypes.shape({
			field: proptypes.string,
			realName: proptypes.string,
		}),
	}).isRequired,
};