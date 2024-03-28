import React, { useState, useEffect } from 'react';
import {
	View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../contexts/UserContext';
import SettingsButton from '../../components/SettingsButton/SettingsButton';
import { styles } from './styles';
import axios from 'axios';
import { getImageLink } from '../../services/ImageService';
import { useFocusEffect } from '@react-navigation/native';

/**
 * UserProfile component. This component is responsible for rendering the user profile.
 * @component
 */
function UserProfile() {
	const navigation = useNavigation();
	const { userDetails, updateUserDetails } = useUser();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [imageLink, setImageLink] = useState('');
	const [imageLoaded, setImageLoaded] = useState(false);

	/**
     * Effect hook to verify login status.
     */
	useEffect(() => {
		const verifyLoginStatus = async () => {
			const token = await AsyncStorage.getItem('token');
			setIsLoggedIn(!!token);
		};

		verifyLoginStatus();
	}, []);
    
	/**
     * Effect hook to fetch image link when the component is focused.
     */
	useFocusEffect(
		React.useCallback(() => {
			if (userDetails && userDetails._id) {
				const fetchImageLink = async () => {
					const link = await getImageLink('Profile_Pictures', userDetails._id);
					setImageLink(link);
				};

				fetchImageLink();
			}
		}, [userDetails])
	);
    
	/**
     * Function to render an item in the user profile options list.
     * @param {Object} item - The item to render.
     * @returns {React.Element} The rendered item.
     */
	const renderItem = ({ item }) => (
		<TouchableOpacity activeOpacity={0.3} onPress={item.handler}>
			<View style={styles.itemButton}>
				<Text style={[styles.item]}>{item.name}</Text>
			</View>
		</TouchableOpacity>
	);

	const UserProfileOptions = [
		{
			name: 'Recipes',
			handler: () => navigation.navigate('Recipes'),
		},
		{
			name: 'Reminders',
			handler: () => navigation.navigate('Reminders'),
		},
		{
			name: 'Goals',
			handler: () => navigation.navigate('Goals'),
		},
		{
			name: 'Awards',
			handler: () => navigation.navigate('Awards'),
		},
	];

	let currentUsername = '';
	if (userDetails && userDetails.username) {
		currentUsername = userDetails.username;
	}

	return (
		<View style={styles.container}>
			<View style={styles.semiCircle}/>
			<View style={styles.profilePicContainer}>
				{!imageLoaded && <ActivityIndicator size="large" color="#0000ff" />}
				{imageLink && (
					<Image
						source={{ uri: imageLink }}
						style={[styles.profilePic, imageLoaded ? {} : { position: 'absolute', opacity: 0 }]}
						onLoad={() => setImageLoaded(true)}
					/>
				)}
			</View>
			{isLoggedIn && userDetails && <Text style={styles.username}>{currentUsername}</Text>}         
			<FlatList
				style={styles.subPageList}
				data={UserProfileOptions}
				renderItem={renderItem}
				keyExtractor={(item) => item.name}
			/>
			<SettingsButton />
		</View>
	);
}

export default UserProfile;