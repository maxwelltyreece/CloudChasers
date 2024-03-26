import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');


export const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingHorizontal: '5%',
		backgroundColor: '#FFFFFF',
		paddingVertical: 25,
		paddingTop: 10,
        
	},
	label: {
		marginVertical: 20,
		fontSize: 18,
		alignSelf: 'center',
		fontFamily: 'Montserrat_600SemiBold',
		paddingBottom: 20,

	},
	button: {
		backgroundColor: '#FF815E',
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderRadius: 15,
		alignSelf: 'center',
	},
	buttonText: {
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
	},
	searchInput: {
		fontFamily: 'Montserrat_600SemiBold',
		height: 40,
		marginBottom: 20,
		borderRadius: 10,
		width: '80%',
		padding: 10,
		backgroundColor: '#FFFFFF'
	},
	pickerContainer: {
		marginBottom: 20,
		paddingTop: 30, 
	},
	picker: {
		height: 200,
		marginBottom: 10,
		borderRadius: 30,
		backgroundColor: '#FFFFFF'
	},
	buttonContainer: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		marginBottom: 20,
		alignSelf: 'center',
	},
	dropdownContainer: {
		position: 'absolute',
		top: 60,
		left: '5%',
		width: '100%',
		zIndex: 1,
		fontFamily: 'Montserrat_600SemiBold',
	},
	dropdown: {
		backgroundColor: 'white',
		borderRadius: 5,
		fontFamily: 'Montserrat_600SemiBold',
		fontSize: 20,
	},
	item: {
		padding: 10,
	},
	semiCircle: {
		width: width * 2.25,
		height: width * 2.25,
		borderRadius: width,
		position: 'absolute',
		top: -width,
		left: -(width * 2.25 - width) / 2,
		backgroundColor: '#F0F0F0',
	},
	inputContainer: {
		width: '60%',
		marginBottom: 30,
		borderRadius: 10,
		backgroundColor: '#FFFFFF',
		alignSelf: 'center',
	},
	input: {
		textAlign: 'center',
		height: 80,
		fontSize: 24,
		paddingHorizontal: 10,
		fontFamily: 'Montserrat_600SemiBold',
	},
});
