import React from 'react';
import {
	View, Text, StyleSheet, Image, FlatList, TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SettingsButton from '../../components/SettingsButton';
// import globalStyles from '../../styles/global';

/**
 * UserProfile is a screen component designed for displaying user profile information.
 * It includes a SettingsButton component and uses styles from both the global styles
 * and its own styles.
 *
 * @returns {React.Element} The rendered UserProfile screen.
 */

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: '30%',
		marginHorizontal: '5%',
	},
	profilePic: {
		width: 120,
		height: 120,
		borderRadius: 60,
	},
	username: {
		fontSize: 30,
		color: '#6B6868',
		fontFamily: 'Montserrat_400Regular',
		paddingTop: '8%',
	},
	bio: {
		fontSize: 12,
		color: '#000000',
		fontFamily: 'Montserrat_400Regular',
		padding: '2%',
	},
	subPageList: {
		width: '100%',
		height: '50%',
		marginTop: '5%',
	},
	itemButton: {
		width: '70%',
		height: 'auto',
		backgroundColor: '#FF815E',
		marginVertical: '2%',
		borderRadius: 14,
		alignSelf: 'center',
	},
	item: {
		fontSize: 20,
		padding: '6%',
		textAlign: 'center',
	},
});

function UserProfile() {
	const navigation = useNavigation();

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
	];

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: 'https://placekitten.com/200/200' }}
				style={styles.profilePic}
			/>
			<Text style={styles.username}>Maxwell Martin</Text>
			<Text style={styles.bio}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor ut labore et dolore.
			</Text>
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
