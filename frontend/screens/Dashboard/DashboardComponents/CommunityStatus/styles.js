import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '95%',
        height: '20%',
        borderRadius: 15,
        padding: 10,
        right: 0,
    },
    scrollContainer: {
        width: '100%',
    },
    header: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 2.5,
        marginBottom: 10,
    },
    updateContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        marginRight: 8,
        width: 210,
        height: 'auto',
        maxHeight: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    communityItemHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
    },
    groupNameSection: {
        justifyContent: 'center',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        width: '60%',
    },
    postCountSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '35%',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        left: 2,
        bottom: 3,
    },
    groupName: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
        fontWeight: 'bold',
        right: 2,
        marginBottom: 1,
    },
    postCount: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 11.5,
        fontWeight: '600',
    },
    detailText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12.7,
    },
    noCommunitiesText: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
    },
});