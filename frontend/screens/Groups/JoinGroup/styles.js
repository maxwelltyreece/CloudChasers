import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
	},
	titleContainer: {
		alignSelf: 'stretch',
		paddingHorizontal: '5%',
	},
	title: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 24,
		marginBottom: 20,
	},
	searchInput: {
		fontFamily: 'Montserrat_600SemiBold',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		paddingLeft: 10,
		marginBottom: 20,
		borderRadius: 10,
	},
	itemContainer: {
		flex: 1,
		maxWidth: '50%',
		aspectRatio: 1,
		margin: '2.5%',
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontFamily: 'Montserrat_700Bold',
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	buttonContainer: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		width: '60%',
		padding: 10,
	},

	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		backgroundColor: "#FF815E",
		alignItems: 'center',
		marginBottom: 10,

	},
	buttonText: {
		color: 'white',
		fontFamily: 'Montserrat_600SemiBold',
		textAlign: 'center',
	},
	
});
