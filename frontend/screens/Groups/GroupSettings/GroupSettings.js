import React, { useEffect, useState } from 'react';
import {
	View, Text, Pressable,
} from 'react-native';
import { useCommunity } from '../../../contexts/CommunityContext';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types'; // Import PropTypes
import { styles } from './styles';

function GroupSettings({ route }) {
	const { community } = route.params;
	const { getUserRole, deleteCommunity, leaveCommunity  } = useCommunity(); // get getUserRole from the community context
    const navigation = useNavigation();
	const [userRole, setUserRole] = useState(null);

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

	useEffect(() => {
		async function fetchUserRole() {
			const response = await getUserRole(community.id); // pass the community ID to getUserRole
			if (response.success) {
				setUserRole(response.data.role);
			} else {
				console.error('Failed to fetch user role:', response);
			}
		}

		fetchUserRole();
	}, [community, getUserRole]);

	// Now you can use userRole in your component
	// ...

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
				<Pressable onPress={handleDeleteGroup} style={styles.deleteButton}>
					<Text style={styles.deleteButtonText}>Delete Group</Text>
				</Pressable>
                 
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
	route: PropTypes.object.isRequired, // Add route prop
};