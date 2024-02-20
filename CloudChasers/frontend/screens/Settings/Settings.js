const ICON_SIZE = 25;
const AUTH_ROUTE = 'Auth';

// Settings.js
import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SettingsOptions from './SettingsOptions';
import globalStyles from '../../styles/global';
import styles from '../../styles/SettingsStyles';
import Feather from 'react-native-vector-icons/Feather';
import LogoutButton from './settingsComponents/LogoutButton';
import { useUser } from '../../hooks/useUser';

/**
 * A component that renders a separator line.
 * @returns {React.Element} A view component with separator style.
 */
const ItemSeparator = () => <View style={styles.separator} />;

/**
 * A component that renders a settings item.
 * @param {Object} props The component props.
 * @param {Object} props.item The item to be rendered.
 * @returns {React.Element} A pressable component with item details.
 */
const SettingsItem = ({ item }) => (
    <Pressable onPress={item.handler}>
        <View style={styles.itemContainer}>
            <Text style={[styles.item, globalStyles.bold]}>{item.name}</Text>
            <Feather name="chevron-right" size={ICON_SIZE} color="#6B6868" />            
        </View>
    </Pressable>
);

/**
 * A component that renders the footer of the settings screen.
 * @param {Object} props The component props.
 * @param {string} props.email The email of the logged-in user.
 * @param {Object} props.navigation The navigation object from react-navigation.
 * @returns {React.Element} A view component with logout button and user details.
 */
const SettingsFooter = ({ email, navigation }) => {
    const { logout } = useUser();

    return (
        <View>
            <View style={styles.separator} /> 
            <Text style={[styles.emailHeader, globalStyles.bold]}>Logged in as</Text> 
            <Text style={[styles.emailText, globalStyles.medium]}>{email}</Text>
            <LogoutButton onPress={async () => {
                try {
                    await logout();
                    navigation.reset({
                        index: 0,
                        routes: [{ name: AUTH_ROUTE }],
                    });
                } catch (error) {
                    console.error('Failed to logout.', error);
                }
            }} />
        </View>
    );
};

/**
 * A function that extracts the key from an item.
 * @param {Object} item The item from which to extract the key.
 * @returns {string} The key of the item.
 */
const keyExtractor = item => item.name;

/**
 * A component that renders a list of settings options.
 * It uses the useUser hook to get the current user and the useNavigation hook to navigate between screens.
 * It renders a FlatList with settings options, each option being a SettingsItem.
 * It also renders a SettingsFooter with the email of the current user and a logout button.
 * @returns {React.Element} A view component with a list of settings options.
 */
const Settings = () => {
    const { user } = useUser();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList
                data={SettingsOptions(navigation)}
                renderItem={SettingsItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={ItemSeparator}
                ListFooterComponent={<SettingsFooter email={user?.email} navigation={navigation} />}
            />
        </View>
    );
};
export default Settings;