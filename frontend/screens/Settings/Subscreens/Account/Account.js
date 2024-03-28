import React, { useState } from 'react';
import {
	View, Text, FlatList, TouchableOpacity, Image,
} from 'react-native';
import { useUser } from '../../../../contexts/UserContext';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import {  pickImage, uploadImage, getImageLink } from '../../../../services/ImageService';
import { styles } from './styles';

/**
 * Account component
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.navigation - The navigation object from react-navigation
 * @returns {JSX.Element} The Account component
 */
function Account({ navigation }) {
	const { userDetails } = useUser();
	const [profilePicture, setProfilePicture] = useState(null);

	useFocusEffect(
		React.useCallback(() => {
			if (userDetails && userDetails._id) {
				getImageLink('Profile_Pictures', userDetails._id).then(setProfilePicture);
			}
		}, [userDetails])
	);

	const handlePickImage = async () => {
		const imageUri = await pickImage();
		if (imageUri) {
			setProfilePicture(imageUri);
			await uploadImage(userDetails._id, imageUri, 'Profile_Pictures');
		}
	};

	const data = [
		{ field: 'Username', value: userDetails.username, realName: 'username' },
		{ field: 'First Name', value: userDetails.forename, realName: 'forename' },
		{ field: 'Last Name', value: userDetails.surname, realName: 'surname' },
		{ field: 'Email', value: userDetails.email, realName: 'email' },
	];

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handlePickImage} style={styles.profilePictureContainer}>
				<View>
					<Image
						key={profilePicture}
						source={profilePicture ? { uri: profilePicture } : { uri: 'https://your-website.com/path-to-default-image.png' }}
						style={styles.profilePicture}
					/>
					<Icon name="camera" size={35} color="#000" style={styles.cameraIcon} />
				</View>
			</TouchableOpacity>
			<FlatList
				data={data}
				keyExtractor={(item) => item.field}
				renderItem={({ item }) => (
					<View style={styles.row}>
						<Text style={styles.label}>{`${item.field.charAt(0).toUpperCase() + item.field.slice(1)}: ${item.value}`}</Text>
						<TouchableOpacity onPress={() => navigation.navigate('EditPage', { field: item.field, realName: item.realName })}>
							<Text>Edit</Text>
						</TouchableOpacity>
					</View>
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				ListFooterComponent={() => <View style={styles.separator} />}
			/>
		</View>
	);
}
Account.propTypes = {
	navigation: PropTypes.object.isRequired,
};

export default Account;

