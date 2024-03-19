import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100%',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 30,
        color: '#6B6868',
        fontFamily: 'Montserrat_700Bold',
    },
    input: {
        height: 50,
        backgroundColor: '#F7F7F7',
        marginBottom: 20,
        padding: 8,
        fontFamily: 'Montserrat_600SemiBold',
        borderRadius: 20,
        color: '#6B6868',
        width: '90%',
        paddingLeft: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    checkbox: {
        height: 20,
        width: 20,
        borderRadius: 3,
        borderWidth: 2,
        borderColor: '#6B6868',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkboxIndicator: {
        height: 12,
        width: 12,
        backgroundColor: '#6B6868',
    },
    // buttonContainer: {
    //     marginTop: 24,
    //     alignItems: 'center',
    //     width: '100%',
    // },
    buttonText: {
        color: 'white',
        fontFamily: 'Montserrat_600SemiBold',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF815E',
        marginTop: 20,
        padding: 15,
        borderRadius: 30,
        width: '70%',
    },
    checkboxText: {
        fontFamily: 'Montserrat_600SemiBold',
        color: '#6B6868',
    },
});
