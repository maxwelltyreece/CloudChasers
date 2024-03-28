import React from 'react';
import {
	View, Text, FlatList, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useUser } from '../../contexts/UserContext';
import SettingsOptions from './SettingsOptions';
import globalStyles from '../../styles/global';
import LogoutButton from './settingsComponents/LogoutButton';
import PropTypes from 'prop-types';
import { styles } from './styles';

const ICON_SIZE = 25;
/**
 * ItemSeparator component
 * @returns {JSX.Element} The ItemSeparator component
 */
function ItemSeparator() {
	return <View style={styles.separator} />;
}

/**
 * SettingsItem component
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.item - The item object
 * @param {string} props.item.name - The name of the item
 * @param {Function} props.item.handler - The handler function for the item
 * @returns {JSX.Element} The SettingsItem component
 */
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

/**
 * SettingsFooter component
 * @param {Object} props - The properties passed to the component
 * @param {string} props.userEmail - The email of the user
 * @param {Object} props.navigation - The navigation object from react-navigation
 * @returns {JSX.Element} The SettingsFooter component
 */
function SettingsFooter({ userEmail, navigation }) {
	const { logout } = useUser();
	return (
		<View>
			<View style={styles.separator} />
			<Text style={[styles.usernameHeader, globalStyles.bold]}>Logged in as</Text>
			<Text style={[styles.usernameText, globalStyles.medium]}>{userEmail}</Text>
			<LogoutButton onPress={() => logout(navigation)} />
		</View>
	);
}

const keyExtractor = (item) => item.name;

/**
 * Settings is a component that displays a list of settings options.
 * Each option is a TouchableOpacity that triggers its handler function when pressed.
 * A back button is also provided for navigation.   
 *
 * @returns {React.Element} The rendered settings screen.
 */
function Settings() {
	const navigation = useNavigation();
	const { userDetails } = useUser();
	const email = userDetails ? userDetails.email : '';
	return (
		<View style={styles.container}>
			<FlatList
				data={SettingsOptions(navigation)}
				renderItem={SettingsItem}
				keyExtractor={keyExtractor}
				ItemSeparatorComponent={ItemSeparator}
				ListFooterComponent={<SettingsFooter userEmail={email} navigation={navigation} />}
			/>
		</View>
	);
}

export default Settings;

SettingsItem.propTypes = {
	item: PropTypes.shape({
		name: PropTypes.string,
		handler: PropTypes.func,
	}).isRequired,
};

SettingsFooter.propTypes = {
	userEmail: PropTypes.string.isRequired,
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
};