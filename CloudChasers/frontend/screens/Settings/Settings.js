// Settings.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SettingsOptions from './SettingsOptions'; // Import the settings options
import globalStyles from '../../styles/global';
import Feather from 'react-native-vector-icons/Feather';
import LogoutButton from './settingsComponents/LogoutButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 0,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
    },
    item: {
        paddingVertical: 24,
        fontSize: 14,
    },
    separator: {
        height: 2, 
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

/**
 * Settings is a component that renders a list of settings options in the center of the screen.
 * It also includes a back button in the top left corner that navigates to the previous screen.
 * It uses styles from its own StyleSheet.
 *
 * The list of settings options is rendered using a FlatList, which takes an array of data and
 * a function for rendering each item in the data. The data is provided by the SettingsOptions array,
 * and the renderItem function describes how to render each item.
 *
 * Each item in the list is a TouchableOpacity that displays the name of the setting option and
 * calls the option's handler function when pressed.
 *
 * @returns {React.Element} The rendered settings screen.
 */
const Settings = () => {
    const navigation = useNavigation();
    const username = 'TestUser';

    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={0.3} onPress={item.handler}>
            <View style={styles.itemContainer}>
                <Text style={[styles.item, globalStyles.bold]}>{item.name}</Text>
                <Feather name="chevron-right" size={25} color="#6B6868" />            
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={SettingsOptions(navigation)}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                ItemSeparatorComponent={() => <View style={styles.separator} />}  // Use the separator style here
                ListFooterComponent={() => (  // Add the logout button here
                    <View>
                        <View style={styles.separator} /> 
                        <Text style={[styles.usernameHeader, globalStyles.bold]}>Logged in as</Text> 
                        <Text style={[styles.usernameText, globalStyles.medium]}>{username}</Text>
                        <LogoutButton onPress={() => console.log('SIGNED OUT')} />
                    </View>
                )}
            />
        </View>
    );
};

export default Settings;