import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import globalStyles from '../../../styles/global';
import { Pressable } from 'react-native';

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

const data = [
    { field: 'First Name', value: 'John' },
    { field: 'Last Name', value: 'Doe' },
    { field: 'Email', value: 'john.doe@example.com' },
    { field: 'Username', value: '@johndoe' },
];

const Account = ({ navigation }) => (
    <View style={styles.container}>
        <FlatList
            data={data}
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
    </View>
);

export default Account;