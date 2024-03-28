import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    learnMoreTitle: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 20,
        fontWeight: 'bold',
    },
    learnMoreButton: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        borderRadius: 32,
    },
    scrollView: {
        borderRadius: 10,
        width: '100%',
    },
    headerText: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 20,
        fontWeight: '700',
        marginTop: 8,
        marginBottom: 12,
        color: '#FF815E',
        left: '4%',
        alignSelf: 'flex-start',
    },
    textContainer: {
        height: 'auto',
        width: '95%',
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 18,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    subheaderText: {
        fontFamily: 'Montserrat_700Bold',
        fontWeight: 'bold',
        marginBottom: 6,
    },
    contentText: {
        fontSize: 15,
    },
});
