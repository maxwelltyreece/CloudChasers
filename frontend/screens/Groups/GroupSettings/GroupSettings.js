import React, { useEffect, useState } from 'react';
import {
    View, Text, Pressable, Modal, TextInput,
} from 'react-native';
import { useCommunity } from '../../../contexts/CommunityContext';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { styles } from './styles';

function GroupSettings({ route }) {
    const { community } = route.params;
    const { getUserRole, deleteCommunity, leaveCommunity, updateCommunityDesc } = useCommunity();
    const navigation = useNavigation();
    const [userRole, setUserRole] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newDescription, setNewDescription] = useState('');

    const handleDeleteGroup = async () => {
        const response = await deleteCommunity(community.id, navigation);
        if (response.success) {
            // handle successful deletion
        } else {
            console.error('Failed to delete community:', response);
        }
    };

    const handleLeaveGroup = async () => {
        const response = await leaveCommunity(community.id, navigation);
        if (response.success) {
            // handle successful leave
        } else {
            console.error('Failed to leave community:', response);
        }
    };

    const handleUpdateDescription = async () => {
        const response = await updateCommunityDesc(community.id, newDescription);
        if (response.success) {
            setModalVisible(false);
            navigation.goBack();
        } else {
            console.error('Failed to update description:', response);
        }
    };

    useEffect(() => {
        async function fetchUserRole() {
            const response = await getUserRole(community.id);
            setUserRole(response);
        }

        fetchUserRole();
    }, [community, getUserRole]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                GroupSettings of
                {community.name}
            </Text>
            {userRole && (
                <Text style={styles.roleText}>
                    You are a
                    {userRole}
                    of this group
                </Text>
            )}
            {userRole === 'admin' && (
                <>
                    <Pressable onPress={handleDeleteGroup} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Delete Group</Text>
                    </Pressable>
                    <Pressable onPress={() => setModalVisible(true)} style={styles.updateButton}>
                        <Text style={styles.updateButtonText}>Update Description</Text>
                    </Pressable>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Pressable
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>X</Text>
                                </Pressable>
                                <TextInput
                                    style={styles.modalText}
                                    onChangeText={setNewDescription}
                                    value={newDescription}
                                    placeholder="New description"
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    multiline={true}
                                />
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={handleUpdateDescription}
                                >
                                    <Text style={styles.textStyle}>Update</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </>
            )}
            {userRole === 'member' && (
                <Pressable onPress={handleLeaveGroup} style={styles.leaveButton}>
                    <Text style={styles.leaveButtonText}>Leave Group</Text>
                </Pressable>
            )}
        </View>
    );
}

export default GroupSettings;

GroupSettings.propTypes = {
    route: PropTypes.object.isRequired,
};