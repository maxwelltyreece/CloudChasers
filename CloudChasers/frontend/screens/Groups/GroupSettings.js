import React, { useEffect, useState } from 'react';
import {
	View, Text, StyleSheet, Pressable,
} from 'react-native';
import { useCommunity } from '../../contexts/CommunityContext';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20, // Add padding around the entire container
		alignItems: 'center',
		backgroundColor: '#F5F5F5', // Change the background color to a light gray
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20, // Add some space below the title
	},
	roleText: {
		fontSize: 18, // Increase the font size
		marginBottom: 20, // Add some space below the text
	},
	deleteButton: {
		backgroundColor: 'red',
		padding: 10,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		width: 200, // Increase the width of the button
	},
	deleteButtonText: {
		color: 'white',
		fontSize: 18, // Increase the font size
	},
	leaveButton: {
		backgroundColor: 'blue',
		padding: 10,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		width: 200,
		marginTop: 10, // Add some space above the button
	},
	leaveButtonText: {
		color: 'white',
		fontSize: 18,
	},
});

function handleDeleteGroup() {
	// Implement group deletion logic here
}
function handleLeaveGroup() {
	// Implement group leaving logic here
}

function GroupSettings({ route }) {
	const { community } = route.params;
	const { getUserRole } = useCommunity(); // get getUserRole from the community context

	const [userRole, setUserRole] = useState(null);

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
