import { StyleSheet } from 'react-native';

const bgColor = '#F0F0F0';

export default StyleSheet.create({
	primaryColor: {
		color: '#FF815E',
	},
	secondaryColor: {
		color: '#6B6868',
	},
	backgroundColor: {
		backgroundColor: bgColor,
	},
	container: {
		flex: 1,
		backgroundColor: bgColor,
	},
	regular: {
		fontFamily: 'Montserrat_400Regular',
	},
	medium: {
		fontFamily: 'Montserrat_500Medium',
	},
	bold: {
		fontFamily: 'Montserrat_700Bold',
	},
});
