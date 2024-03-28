import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: 'center',
		borderRadius: 30,
		paddingHorizontal: 25,
	},
	modalContainer: {
		height: '80%',
		width: '100%',
		backgroundColor: '#F0F0F0',
		borderRadius: 30,
		padding: 25,

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
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 10,
		backgroundColor: '#FFFFFF'
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
