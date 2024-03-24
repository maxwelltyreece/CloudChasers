import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: '5%',
        backgroundColor: '#F0F0F0',
        paddingVertical: 25,
        paddingTop: 10,
        
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
        marginBottom: 20,
        borderRadius: 10,
        width: '80%',
        padding: 10,
        backgroundColor: '#FFFFFF'
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
    dropdownContainer: {
        position: 'absolute',
        top: 60,
        left: '5%',
        width: '81%',
        zIndex: 1,
        fontFamily: 'Montserrat_600SemiBold',
    },
    dropdown: {
        backgroundColor: 'white',
        borderRadius: 5,
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 20,
    },
    item: {
        padding: 10,
    },
});
