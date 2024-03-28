import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	box: {
		flex: 1,
		backgroundColor: 'white',
		borderRadius: 10,
		justifyContent: 'flex-end',
		padding: 10,
	},
	text: {
		fontSize: 20,
	},
	image: {
		width: '100%',
		height: '70%',
		resizeMode: 'cover',
	},
	title: {
		fontSize: 16,
		fontFamily: 'Montserrat_700Bold',
	},
});
