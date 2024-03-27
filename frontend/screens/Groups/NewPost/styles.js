import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	input: {
		height: 40,
		borderColor: '#E8E8E8', // change the border color to a lighter shade
		borderWidth: 1,
		marginBottom: 20,
		padding: 10,
		borderRadius: 10,
		fontFamily: 'Montserrat_600SemiBold',
		backgroundColor: '#F8F8F8', // add a light background color
	},
	messageInput: {
		height: 200,
		borderColor: '#E8E8E8', // change the border color to a lighter shade
		borderWidth: 1,
		marginBottom: 20,
		padding: 10,
		borderRadius: 10,
		fontFamily: 'Montserrat_600SemiBold',
		backgroundColor: '#F8F8F8', // add a light background color
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		backgroundColor: '#FF815E',
		borderRadius: 25,
		marginTop: 50,
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
		fontFamily: 'Montserrat_700Bold',
	},
	tabContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 20,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 10,
	},
	tabButton: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		borderColor: 'gray',
		borderRightWidth: 1,
		borderRadius: 0,
	},
	activeTab: {
		color: '#FF815E',
	},
	tabText: {
		paddingLeft: 10,
		color: '#6B6868',
		fontSize: 14,
		fontFamily: 'Montserrat_700Bold',
	},
});
