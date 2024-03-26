import { StyleSheet } from 'react-native';
import { Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
	statsContainer: {
		// flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#f2f2f2'
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
	progressBarContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '40%',
	},
	statsHeader: {
		// justifyContent: 'flex-start',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: '12%',
  
	},
	ringCompContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '40%',
		marginBottom: '10%',
	},
	ringComp: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		padding: 10,
		// marginBottom: '5%',
	},
	slide: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
  