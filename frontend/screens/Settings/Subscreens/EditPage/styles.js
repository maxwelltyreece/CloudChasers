import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
        marginBottom: 16,
    },
    input: {
        height: 50,
        width: '100%',
        backgroundColor: '#F7F7F7',
        marginBottom: 16,
        padding: 8,
        fontFamily: 'Montserrat_600SemiBold',
        borderRadius: 20,
        color: '#6B6868',
    },
    button: {
        width: '100%',
        height: 50,
        marginTop: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF815E',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
    },
});
