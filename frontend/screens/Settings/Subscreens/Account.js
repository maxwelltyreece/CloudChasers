import React from 'react';
import {
	View, Text, StyleSheet, FlatList,
	Pressable,
} from 'react-native';
import { useUser } from '../../../contexts/UserContext';
import globalStyles from '../../../styles/global';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 0,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 24,
	},
	label: {
		fontSize: 14,
		...globalStyles.bold,
	},
	separator: {
		height: 1,
		backgroundColor: '#A9A9A9',
		width: '100%',
	},
});

function Account({ navigation }) {
	const { userDetails } = useUser();

	const data = [
		{ field: 'Username', value: userDetails.username, realName: 'username' },
		{ field: 'First Name', value: userDetails.forename, realName: 'forename' },
		{ field: 'Last Name', value: userDetails.surname, realName: 'surname' },
		{ field: 'Email', value: userDetails.email, realName: 'email' },
	];

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				keyExtractor={(item) => item.field}
				renderItem={({ item }) => (
					<View style={styles.row}>
						<Text style={styles.label}>{`${item.field.charAt(0).toUpperCase() + item.field.slice(1)}: ${item.value}`}</Text>
						<Pressable onPress={() => navigation.navigate('EditPage', { field: item.field, realName: item.realName })}>
							<Text>Edit</Text>
						</Pressable>
					</View>
				)}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				ListFooterComponent={() => <View style={styles.separator} />}
			/>
		</View>
	);
}

export default Account;

Account.PropTypes = {
	navigation: PropTypes.object.isRequired,
};