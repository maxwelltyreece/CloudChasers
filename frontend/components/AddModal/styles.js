import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		fontFamily: 'Montserrat_700Bold',
		marginBottom: 10,
	},
	bubble: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F0F0F0',
		borderColor: '#c7c7c7',
		borderWidth: 5,
		borderRadius: 30,
		padding: 20,
	},
	content: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	button: {
		width: 100,
		height: 100,
		borderRadius: 25,
		marginHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	pressable: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
