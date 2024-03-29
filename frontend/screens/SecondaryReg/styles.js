import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FF815E',
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginContainer: {
		width: '90%',
		height: '60%',
		backgroundColor: 'white',
		paddingHorizontal: 24,
		paddingTop: 48,
		zIndex: 1,
		borderRadius: 50,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.3,
		shadowRadius: 3,
		elevation: 5,
	},
	input: {
		height: 50,
		backgroundColor: '#F7F7F7',
		marginBottom: 16,
		padding: 8,
		fontFamily: 'Montserrat_600SemiBold',
		borderRadius: 20,
		color: '#6B6868',
	},
	header: {
		fontSize: 24,
		marginBottom: 16,
		color: '#6B6868',
		fontFamily: 'Montserrat_700Bold',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FF815E',
		padding: 15,
		borderRadius: 30,
		width: '70%',
	},
	buttonText: {
		color: 'white',
		fontFamily: 'Montserrat_600SemiBold',
	},
	buttonContainer: {
		marginTop: 24,
		alignItems: 'center',
		width: '100%',
	},
	profilePictureContainer: {
		width: 140,
		height: 140,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginBottom: 20,
	},
	profilePicture: {
		width: '100%',
		height: '100%',
	},
	cameraIcon: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		color: 'rgba(0, 0, 0, 0.7)',
		borderRadius: 15,
	},
});