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

function GroupSettings({ route }) {
	const { community } = route.params;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				GroupSettings of
				{community.title}
			</Text>
		</View>
	);
}

export default GroupSettings;