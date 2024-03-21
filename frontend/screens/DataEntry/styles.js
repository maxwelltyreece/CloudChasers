import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        backgroundColor: '#F0F0F0',
        paddingVertical: 25,
        paddingTop: 100,
        justifyContent: 'center',
    },
    label: {
        marginBottom: 5,
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#FF815E',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
    },
    searchInput: {
        fontFamily: 'Montserrat_600SemiBold',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 10,
    },
    pickerContainer: {
        marginBottom: 20,
        paddingTop: 30, 
    },
    picker: {
        height: 200,
        marginBottom: 10,
        borderColor: '#c7c7c7',
        borderWidth: 5,
        borderRadius: 30,
    },
    buttonContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom: 20,
        alignSelf: 'center',
    },
    selectedItem: {
        backgroundColor: 'pink',
    },
});
