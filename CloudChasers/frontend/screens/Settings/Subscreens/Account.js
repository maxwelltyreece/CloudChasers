import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import globalStyles from '../../../styles/global';
import { Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { fetchUserDetails } from '../../../services/fetchUserDetails';
import { UserContext } from '../../../context/UserContext';
import { useContext } from 'react';

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
});

/**
 * Account component
 * 
 * This component is responsible for displaying the user's account details. It fetches the user's details from the UserContext
 * and displays them in a FlatList. Each row in the list shows a field of the user's details (first name, last name, email, and username),
 * and an "Edit" button that navigates to the EditPage for that field.
 * 
 * If the user details are not yet loaded, it displays a "Loading..." message.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.navigation - The navigation object from react-navigation. This is used to navigate to the EditPage when the "Edit" button is clicked.
 * 
 * @returns {React.Component} The rendered Account component.
 */
const Account = ({ navigation }) => {
    const { user } = useContext(UserContext); // use the UserContext

    return (
        <View style={styles.container}>
            {user ? (
                <FlatList
                data={[
                        { field: 'Username', value: user.username },
                        { field: 'First Name', value: user.firstName },
                        { field: 'Last Name', value: user.lastName },
                        { field: 'Email', value: user.email },
                    ]}
                    keyExtractor={(item) => item.field}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text style={styles.label}>{`${item.field.charAt(0).toUpperCase() + item.field.slice(1)}: ${item.value}`}</Text>
                            <Pressable onPress={() => navigation.navigate('EditPage', { field: item.field })}>
                                <Text>Edit</Text>
                            </Pressable>
                        </View>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListFooterComponent={() => <View style={styles.separator} />} // Added this line
                />
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

export default Account;