import React from 'react';
import {
	View, Text, Image, FlatList, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../contexts/UserContext';
import SettingsButton from '../../components/SettingsButton';
import { styles } from './styles';
function UserProfile() {
	const navigation = useNavigation();
	const { userDetails, updateUserDetails } = useUser();

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

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: 'https://placekitten.com/200/200' }}
				style={styles.profilePic}
			/>
			<Text style={styles.username}>{userDetails.username}</Text>
			{/* <Text style={styles.bio}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor ut labore et dolore.
			</Text> */}
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
