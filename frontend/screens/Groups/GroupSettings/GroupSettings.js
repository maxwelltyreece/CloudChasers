import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
} from 'react-native';
import { useCommunity } from '../../../contexts/CommunityContext';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import UpdateDescriptionModal from './Components/UpdateDescriptionModal';
import DeleteModal from './Components/DeleteModal';

const USER_ROLES = {
    ADMIN: 'admin',
    MEMBER: 'member',
};

function GroupSettings({ route }) {
    const { community } = route.params;
    const { getUserRole, deleteCommunity, leaveCommunity, updateCommunityDesc } = useCommunity();
    const navigation = useNavigation();
    const [userRole, setUserRole] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [newDescription, setNewDescription] = useState('');

    const handleDeleteGroup = () => setDeleteModalVisible(true);

    const handleConfirmDelete = async () => {
        const response = await deleteCommunity(community.id, navigation);
        if (response.success) {
            setDeleteModalVisible(false);
        } else {
            console.error('Failed to delete community:', response);
        }
    };

    const handleLeaveGroup = async () => {
        const response = await leaveCommunity(community.id, navigation);
        if (!response.success) {
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
            {userRole && (
                <Text style={styles.roleText}>
                    {userRole === USER_ROLES.ADMIN ? 'You are the owner of this community' : 'You are a member of this group'}
                </Text>
            )}
            {userRole === USER_ROLES.ADMIN && (
                <>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.optionButton}>
                        <Text style={styles.optionButtonText}>Update Description</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteGroup} style={styles.optionButton}>
                        <Text style={styles.optionButtonText}>Delete Group</Text>
                    </TouchableOpacity>
                    <UpdateDescriptionModal
                        visible={modalVisible}
                        onConfirm={handleUpdateDescription}
                        onCancel={() => setModalVisible(false)}
                        onDescriptionChange={setNewDescription}
                        description={newDescription}
                    />
                    <DeleteModal
                        visible={deleteModalVisible}
                        onConfirm={handleConfirmDelete}
                        onCancel={() => setDeleteModalVisible(false)}
                        communityName={community.name}
                    />
                </>
            )}
            {userRole === USER_ROLES.MEMBER && (
                <TouchableOpacity onPress={handleLeaveGroup} style={styles.optionButton}>
                    <Text style={styles.optionButtonText}>Leave Group</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default GroupSettings;

GroupSettings.propTypes = {
    route: PropTypes.object.isRequired,
};