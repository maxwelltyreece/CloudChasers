import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	header: {
		fontSize: 32,
		marginBottom: 10,
		textAlign: 'center',
		color: '#FF815E',
	},
	description: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: 'center',
	},
	container: {
		padding: 20,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginBottom: 70,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	button: {
		borderRadius: 25,
		paddingVertical: 10,
		paddingHorizontal: 20,
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50, 
		width: 160,
	},
	loginButton: {
		backgroundColor: '#FF815E', 
	},
	registerButton: {
		backgroundColor: '#A9A9A9',
	},
	buttonText: {
		color: '#fff',
	},
});
