import { StyleSheet } from 'react-native';

// import globalStyles from '../../styles/global';
/**
 * UserProfile is a screen component designed for displaying user profile information.
 * It includes a SettingsButton component and uses styles from both the global styles
 * and its own styles.
 *
 * @returns {React.Element} The rendered UserProfile screen.
 */
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: '30%',
		marginHorizontal: '5%',
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
		paddingTop: '8%',
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
		backgroundColor: '#FF815E',
		marginVertical: '2.8%',
		borderRadius: 14,
		alignSelf: 'center',
	},
	item: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 20,
		padding: '5%',
		textAlign: 'center',
	},
});
