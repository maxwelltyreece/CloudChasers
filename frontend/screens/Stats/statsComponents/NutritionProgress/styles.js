import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    progressBarComponentContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: '7%',
        marginBottom: Platform.OS === 'android' ? '5%' : '2%',
        borderRadius: 15,
        width: '100%',
        height: '100%',
    },
    progressBarContainer: {
        flexDirection: 'row',
        marginTop: '1%',
        backgroundColor: '#F0F0F0',
        borderRadius: 32,
        overflow: 'hidden',
        width: '100%',
        height: 15,
    },
    filledProgressBar: {
        backgroundColor: '#FF815E',
        height: 15,
        borderRadius: 32,
    },
    progressBarItem: {
        marginBottom: Platform.OS === 'android' ? 12 : 8,
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        width: '96%',
        height: '20%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignSelf: 'center',
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    label: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
