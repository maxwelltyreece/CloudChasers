// Settings.js
import React from 'react';
import {
	View, Text, StyleSheet, FlatList, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsOptions from './SettingsOptions'; // Import the settings options
import globalStyles from '../../styles/global';
import LogoutButton from './settingsComponents/LogoutButton';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: 0,
	},
	item: {
		paddingVertical: 24,
		fontSize: 14,
	},
	separator: {
		height: 1,
		backgroundColor: '#A9A9A9',
		width: '100%',
	},
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	usernameHeader: {
		fontSize: 12,
		textAlign: 'center',
		marginTop: 30,
	},
	usernameText: {
		fontSize: 14,
		textAlign: 'center',
		marginTop: 10,
	},
});

const ICON_SIZE = 25;
const USERNAME = 'test@email.com';

function ItemSeparator() {
	return <View style={styles.separator} />;
}

function SettingsItem({ item }) {
	return (
		<Pressable onPress={item.handler}>
			<View style={styles.itemContainer}>
				<Text style={[styles.item, globalStyles.bold]}>{item.name}</Text>
				<Feather name="chevron-right" size={ICON_SIZE} color="#6B6868" />
			</View>
		</Pressable>
	);
}

function SettingsFooter({ username, navigation }) {
	return (
		<View>
			<View style={styles.separator} />
			<Text style={[styles.usernameHeader, globalStyles.bold]}>Logged in as</Text>
			<Text style={[styles.usernameText, globalStyles.medium]}>{username}</Text>
			<LogoutButton onPress={async () => {
				try {
					await AsyncStorage.removeItem('token');
					console.log('Token removed!');
					navigation.reset({
						index: 0,
						routes: [{ name: 'Auth' }],
					});
				} catch (error) {
					console.error('Failed to remove the token.', error);
				}
			}}
			/>
		</View>
	);
}

const keyExtractor = (item) => item.name;

/**
 * Settings is a component that renders a list of settings options in the center of the screen.
 * It also includes a back button in the top left corner that navigates to the previous screen.
 * It uses styles from its own StyleSheet.
 *
 * The list of settings options is rendered using a FlatList, which takes an array of data and
 * a function for rendering each item in the data. The data is provided by the SettingsOptions
 * array, and the renderItem function describes how to render each item.
 *
 * Each item in the list is a TouchableOpacity that displays the name of the setting option and
 * calls the option's handler function when pressed.
 *
 * @returns {React.Element} The rendered settings screen.
 */
function Settings() {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<FlatList
				data={SettingsOptions(navigation)}
				renderItem={SettingsItem}
				keyExtractor={keyExtractor}
				ItemSeparatorComponent={ItemSeparator}
				ListFooterComponent={<SettingsFooter username={USERNAME} navigation={navigation} />}
			/>
		</View>
	);
}

export default Settings;
