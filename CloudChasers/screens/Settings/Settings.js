// Settings.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsOptions from './SettingsOptions'; // Import the settings options

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100, // Add a top padding to the container
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
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

    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={0.3} onPress={item.handler}>
            <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="chevron-back" size={35} color="#000" />
            </TouchableOpacity>
            <FlatList
                data={SettingsOptions(navigation)}
                renderItem={renderItem}
                keyExtractor={item => item.name}
            />
        </View>
    );
};

export default Settings;