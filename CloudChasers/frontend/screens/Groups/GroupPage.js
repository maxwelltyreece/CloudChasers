import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
    },
});

const GroupPage = ({ route, navigation }) => {
    const { community } = route.params; // Get the community data from the route params

    useEffect(() => {
        navigation.setOptions({ title: community.title }); // Set the header title
    }, [navigation, community]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{community.title}</Text>
            <Text style={styles.description}>{community.description}</Text>
            {/* Display more community information here */}
        </View>
    );
};

export default GroupPage;