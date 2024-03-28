import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		paddingTop: 0,
	},
	member: {
		paddingVertical: 12,
		fontSize: 16,
		fontFamily: "Montserrat_600SemiBold",
	},
	separator: {
		height: 1,
		backgroundColor: '#A9A9A9',
		width: '100%',
	},
	memberContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	title: {
		fontSize: 12,
		textAlign: 'center',
		marginTop: 30,
	},
	memberIcon: {
		fontSize: 14,
		alignSelf: 'center',
		marginRight: 5,
	},
	iconAndName: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});