import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10
	},
	username: {
		fontFamily: 'Montserrat_600SemiBold',
		fontSize: 16,
	},
	buttonContainer: {
		flexDirection: 'row'
	},
	button: {
		backgroundColor: 'white',
		borderRadius: 15,
		margin: 5,
		padding: 5
	},
	iconContainer: {
		width: 30,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	noRequests: {
		fontFamily: 'Montserrat_600SemiBold',
		fontSize: 18,
		padding: 20,
		textAlign: 'center',
	},
});
