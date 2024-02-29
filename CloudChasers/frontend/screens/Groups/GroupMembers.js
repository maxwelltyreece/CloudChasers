import React from 'react';
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
});

function GroupMembers({ route }) {
	const { community } = route.params;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				GroupMembers of
				{community.title}
			</Text>
		</View>
	);
}

export default GroupMembers;
