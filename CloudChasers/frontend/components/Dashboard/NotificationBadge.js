import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock data
const notifications = [
    { id: '1', title: 'New Message', message: 'You have a new message from John.', timestamp: '10 mins ago' },
    { id: '2', title: 'New Friend Request', message: 'You have a new friend request from Jane.', timestamp: '1 hour ago' },
    { id: '3', title: 'New Message', message: 'You have a new message from John.', timestamp: '10 mins ago' },
    { id: '4', title: 'New Friend Request', message: 'You have a new friend request from Jane.', timestamp: '1 hour ago' },
];
  
// Notification item component
const NotificationItem = ({ title, message, timestamp }) => (
<View style={styles.notificationItem}>
    <Text style={styles.title}>{title}</Text>
    <Text>{message}</Text>
    <Text style={styles.timestamp}>{timestamp}</Text>
</View>
);

const NotificationBadge = ({ count }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>

            <Pressable onPress={() => setModalVisible(true)}>
                <Icon name="bell" size={28} color="black" />
                {count > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.text}>{count}</Text>
                    </View>
                )}
            </Pressable>

            <Modal 
                animationType="slide"
                // animationIn="slideInRight"
                // animationOut="slideOutRight"
                // backdropTransitionOutTiming={0}
                transparent={true} 
                visible={modalVisible} 
                onRequestClose={() => setModalVisible(!modalVisible)}>

                    <View style={styles.modalContainer}>
                    
                        <Text style={styles.modalTitle}>Your Notifications</Text>

                        <FlatList
                            data={notifications}
                            renderItem={({ item }) => <NotificationItem {...item} />}
                            keyExtractor={item => item.id}
                            style={styles.notificationListContainer}
                            />

                        <Pressable onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.modalCloseButtonText}>Close</Text>
                        </Pressable>

                    </View>
            </Modal>

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
    modalContainer: {
        flex: 1,
        borderColor: '#EE7958',
        borderRightWidth: 0,
        borderWidth: 4,
        marginTop: 125,
        marginLeft: 100,
        marginBottom: 1,
        backgroundColor: '#F5F5F5',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        borderTopStartRadius: 28,
        borderBottomStartRadius: 28,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    notificationListContainer: {
        width: 300,
    },
    notificationItem: {
        backgroundColor: 'white',
        padding: 15,
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#eee',
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    modalCloseButtonText: {
        color: '#FFFFFF',
        marginTop: 20,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        opacity: 0.9,
      },
});

export default NotificationBadge;
