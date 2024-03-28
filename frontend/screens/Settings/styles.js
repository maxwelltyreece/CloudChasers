import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: 0,
	},
	item: {
		paddingVertical: 24,
		fontSize: 14,
	},
	separator: {
		height: 1,
		backgroundColor: '#A9A9A9',
		width: '100%',
	},
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	usernameHeader: {
		fontSize: 12,
		textAlign: 'center',
		marginTop: 30,
	},
	usernameText: {
		fontSize: 14,
		textAlign: 'center',
		marginTop: 10,
	},
});
