import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 30,
		paddingHorizontal: 25,
	},
	inputContainer: {
		marginBottom: 20,
		fontFamily: 'Montserrat_600SemiBold',
	},
	label: {
		marginBottom: 5,
		fontFamily: 'Montserrat_700Bold',
		fontSize: 14,
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	button: {
		backgroundColor: '#FF815E',
		padding: 12,
		borderRadius: 15,
		alignSelf: 'center',
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
	},
	buttonContainer: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
	},
});
