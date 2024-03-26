import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: '100%',
	},
	header: {
		width: '100%',
		padding: 20,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		height: '10%',
	},
	title: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 28,
		fontWeight: 'bold',
		alignSelf: 'flex-start',
		top: '18%',
	},
	legendContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingTop: 25,
		paddingBottom: 10,
		height: '10%',
	},
	legendIcon: {
		marginRight: 5,
	},
	legendText: {
		fontFamily: 'Montserrat_500Medium',
		fontSize: 14,
	},
	awardsListContainer: {
		width: '100%',
		height: '85%',
		padding: 20,
	},
	awardItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '10%',
		paddingVertical: 12,
		paddingHorizontal: 20,
		backgroundColor: 'white',
		borderRadius: 12,
		marginBottom: '8%',
	},
	awardName: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 16,
		fontWeight: 'bold',
	},
	statusBubble: {
		width: 24,
		height: 24,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	completed: {
		backgroundColor: 'green',
	},
	notCompleted: {
		backgroundColor: 'orange',
	},
	iconText: {
		fontFamily: 'Montserrat_700Bold',
		color: 'white',
		fontWeight: 'bold',
	},
});
