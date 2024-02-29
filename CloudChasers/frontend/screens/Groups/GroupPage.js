import React, { useEffect } from 'react';
import {
	View, Text, StyleSheet, Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

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
	headerButton: {
		flexDirection: 'row',
		marginRight: 16,
	},
	iconButton: {
		marginRight: 8,
	},
});

function GroupPage({ route, navigation }) {
	const { community } = route.params; // Get the community data from the route params

	useEffect(() => {
		navigation.setOptions({
			title: community.title, // Set the header title
			headerRight: () => (
				<View style={styles.headerButton}>
					<Pressable style={styles.iconButton} onPress={() => navigation.navigate('GroupSettings', { community })}>
						<Feather name="settings" size={24} color="black" />
					</Pressable>
					<Pressable onPress={() => navigation.navigate('GroupMembers', { community })}>
						<Feather name="users" size={24} color="black" />
					</Pressable>
				</View>
			),
		});
	}, [navigation, community]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{community.title}</Text>
			<Text style={styles.description}>{community.description}</Text>
		</View>
	);
}

export default GroupPage;
