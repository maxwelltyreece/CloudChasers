import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FF815E',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: '30%',
	},
	profilePic: {
		width: 120,
		height: 120,
		borderRadius: 60,
	},
	username: {
		fontSize: 30,
		color: '#6B6868',
		fontFamily: 'Montserrat_400Regular',
		paddingTop: '2%',
	},
	bio: {
		fontSize: 12,
		color: '#000000',
		fontFamily: 'Montserrat_400Regular',
		padding: '2%',
	},
	subPageList: {
		width: '100%',
		height: '50%',
		marginTop: '8%',
	},
	itemButton: {
		width: '70%',
		height: 'auto',
		marginVertical: '2%',
		alignSelf: 'center',
		backgroundColor: '#F0F0F0',
		borderRadius: 15,
	},
	item: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 20,
		padding: '5%',
		textAlign: 'center',
	},
	profilePicContainer: {
		width: 200,
		height: 200,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		borderColor: '#F0F0F0',
		borderWidth: 10,
		backgroundColor: '#FFFFFF',
	},
	profilePic: {
		width: '100%',
		height: '100%',
	},
	semiCircle: {
		width: width * 2.25,
		height: width * 2.25,
		borderRadius: width,
		position: 'absolute',
		top: 225,
		backgroundColor: '#FFFFFF',
		borderColor: '#F0F0F0',
		borderWidth: 10,
	},
});
