import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        height: '95%',
        width: '94%',
        left: '1.5%',
    },
    pressableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
    },
    containerTitle: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingTop: 17,
    },
    motivationalMessage: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 2,
        marginBottom: 16,
        textAlign: 'center',
        width: '100%',
    },
    progressText: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
