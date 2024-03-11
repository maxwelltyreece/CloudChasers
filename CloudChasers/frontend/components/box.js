import React from 'react';
import {
    View, Text, Image, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'flex-end',
        padding: 10,
    },
    text: {
        fontSize: 20,
    },
    image: {
        width: '100%',
        height: '70%',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold',
    },
});

function Box({ title, image }) {
    return (
        <View style={styles.box}>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export default Box;