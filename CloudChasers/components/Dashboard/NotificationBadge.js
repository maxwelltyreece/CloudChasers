import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationBadge = ({ count }) => {
    return (
        <View style={styles.container}>
            <Icon name="bell" size={28} color="black" />
            {count > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.text}>{count}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '75%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    badge: {
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
    },
    text: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default NotificationBadge;
