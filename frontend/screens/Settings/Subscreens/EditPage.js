import React, { useState } from 'react';
import {
	View, Text, TextInput, Pressable, StyleSheet, Alert,
} from 'react-native';
import { useUser } from '../../../contexts/UserContext';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		marginBottom: 16,
	},
	input: {
		height: 50,
		width: '100%',
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
	const { field, realName } = route.params;
	const { userDetails, editUserDetails } = useUser();
	console.log('userDetails:', userDetails);
	console.log(realName);
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