import React, { useState } from 'react';
import {
	View, Text, StyleSheet, FlatList, TouchableOpacity, Image,
} from 'react-native';
import { useUser } from '../../../contexts/UserContext';
import globalStyles from '../../../styles/global';
import proptypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import { requestImagePermissions, pickImage, uploadImage, getImageLink } from '../../../services/ImageService';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 24,
	},
	label: {
		fontSize: 14,
		...globalStyles.bold,
	},
	separator: {
		height: 1,
		backgroundColor: '#A9A9A9',
		width: '100%',
	},
	profilePictureContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20,
	},
	profilePicture: {
		width: 150,
		height: 150,
		borderRadius: 75,
		backgroundColor: '#DDDDDD',
	},
	cameraIcon: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		color: 'rgba(0, 0, 0, 0.7)',
		borderRadius: 15,
	},
});

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
			console.log('userDetails._id:', userDetails._id);
			console.log('imageUri:', imageUri);
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
	navigation: proptypes.object.isRequired,
};

export default Account;

