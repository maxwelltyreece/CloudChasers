import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    dashboardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '10%',
    },
    notificationBadgeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    dashboardContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        top: '4%',
        zIndex: 1,
    },
    loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
	},
    middleDashboardContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginVertical: 10,
        width: '95%',
        height: '30%',
        marginBottom: '14%',
    },
    leftComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '1%',
        paddingBottom: '2%',
        width: '50%',
        height: '100%',
    },
    rightComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: '1%',
        paddingBottom: '2%',
        width: '50%',
        height: '100%',
    },
    bottomDashboardContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '25%',
        bottom: '5%',
    },
    semiCircle: {
        width: width * 2,
        height: width * 2,
        borderRadius: width,
        position: 'absolute',
        top: -width,
        left: -width / 2,
        backgroundColor: '#FF815E',
        borderColor: '#FFFFFF',
        borderWidth: 10,
    },
});
