import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Box from '../../components/box';
import { useNavigation } from '@react-navigation/native';

const data = [
    { title: 'Community 1' },
    { title: 'Community 2' },
    { title: 'Community 3' },
    { title: 'Community 4' },
    { title: 'Community 5' },
    { title: 'Community 6' },
    { title: 'Community 7' },
    { title: 'Community 8' },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
    },
    titleContainer: {
        alignSelf: 'stretch',
        paddingHorizontal: '5%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 10,
    },
    itemContainer: {
        flex: 1,
        maxWidth: '50%',
        aspectRatio: 1,
        margin: '2.5%',
    },
});

const Groups = () => {
    const [searchText, setSearchText] = useState('');
    const navigation = useNavigation();

    const filteredData = data.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));

    const handlePress = (item) => {
        navigation.navigate('GroupPage', { community: item }); // Navigate to the GroupPage and pass the community data
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Your communities</Text>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={text => setSearchText(text)}
                    value={searchText}
                    placeholder="Search..."
                />
            </View>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => handlePress(item)}>
                            <Box title={item.title} />
                        </TouchableOpacity>
                    </View>
                )}
                numColumns={2} // Two items per row
                contentContainerStyle={{
                    paddingHorizontal: '2.5%', // Offset the item margin
                }}
            />
        </View>
    );
};

export default Groups;