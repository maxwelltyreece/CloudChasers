import React, { useState } from 'react';
import {
	View, Text, TextInput, Pressable, Button, Image
} from 'react-native';
import { useCommunity } from '../../../contexts/CommunityContext';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { LocalIP } from '../../IPIndex';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * CustomCheckbox component
 * @param {Object} props - The properties passed to the component
 * @param {string} props.label - The label for the checkbox
 * @param {boolean} props.isChecked - Whether the checkbox is checked
 * @param {Function} props.onCheck - The function to call when the checkbox is checked
 * @returns {JSX.Element} The CustomCheckbox component
 */
function CustomCheckbox({ label, isChecked, onCheck }) {
	return (
		<Pressable onPress={onCheck} style={styles.checkboxContainer}>
			<View style={styles.checkbox}>
				{isChecked && <View style={styles.checkboxIndicator} />}
			</View>
			<Text style={styles.checkboxText}>{label}</Text>
		</Pressable>
	);
}

/**
 * NewGroup component
 * @returns {JSX.Element} The NewGroup component
 */
function NewGroup() {
	const [communityName, setCommunityName] = useState('');
	const [communityDescription, setCommunityDescription] = useState('');
	const [isPrivateCommunity, setIsPrivateCommunity] = useState(false);
	const [areRecipesPrivate, setAreRecipesPrivate] = useState(false);
	const { createCommunity, getUserCommunities } = useCommunity();
	const navigation = useNavigation();

	const handleButtonPress = async () => {
		const communityData = {
			name: communityName,
			description: communityDescription,
			joinPrivacy: isPrivateCommunity ? 'private' : 'public',
			recipePrivacy: areRecipesPrivate ? 'private' : 'public',
		};
		createCommunity(communityData)
			.then(async (response) => {
				if (response && response.success) {
					const communityID = response.data._id;

					if (image) {
						const formData = new FormData();
						formData.append('objectID', communityID);
						formData.append('folderName', 'Community_Pictures');
						formData.append('file', {
							uri: image,
							name: getFileName(image),
							type: 'image/jpeg',
						});
                  
						const token = await AsyncStorage.getItem('token');
						await axios.post(`http://${LocalIP}:3000/image/uploadPicture`, formData, {
							headers: {
								Authorization: `Bearer ${token}`,
								'Content-Type': 'multipart/form-data',
							},
						}).catch(error => {
							console.error('Error uploading image:', error);
						});
					}
                  
					setRecipeName(''); 
					setImage(null); 

					getUserCommunities();
					navigation.navigate('Groups');
				} else {
					console.error('Failed to create community:', response);
				}
			})
			.catch(error => {
				console.error("Error creating community: ", error);
			});
	};

	const [image, setImage] = useState(null);
	const [recipeName, setRecipeName] = useState('');
	var recipeID = '';

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
    
		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
		getFileName(result.assets[0].uri);
	};

	function getFileName(image){
		const fileName = image.split('/').pop();
		return fileName;
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Create New Community</Text>
			<TextInput
				style={styles.input}
				placeholder="Community Name"
				value={communityName}
				onChangeText={setCommunityName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Community Description"
				value={communityDescription}
				onChangeText={setCommunityDescription}
			/>
			<View style={{alignItems: 'flex-start', width: '80%'}}>
				<CustomCheckbox
					label="Private Community"
					isChecked={isPrivateCommunity}
					onCheck={() => setIsPrivateCommunity(!isPrivateCommunity)}
				/>
				<CustomCheckbox
					label="Make Recipes Private"
					isChecked={areRecipesPrivate}
					onCheck={() => setAreRecipesPrivate(!areRecipesPrivate)}
				/>
			</View>

			<View style={[styles.button]}>
				<Button title="Pick Recipe Image" onPress={pickImage} />
				{image && (
					<Image
						source={{ uri: image }}
						style={{ width: 200, height: 200 }}
					/>
				)}
			</View>

			<Pressable style={styles.buttonContainer} onPress={handleButtonPress}>
				<Text style={styles.buttonText}>Create Group</Text>
			</Pressable>
		</View>
	);
}

export default NewGroup;

CustomCheckbox.PropTypes = {
	label: PropTypes.string.isRequired,
	isChecked: PropTypes.bool.isRequired,
	onCheck: PropTypes.func.isRequired,
};