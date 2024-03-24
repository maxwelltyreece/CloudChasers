import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20, // Add padding around the entire container
        alignItems: 'center',
        backgroundColor: '#F5F5F5', // Change the background color to a light gray
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20, // Add some space below the title
    },
    roleText: {
        fontSize: 18, // Increase the font size
        marginBottom: 20, // Add some space below the text
    },
    deleteButton: {
        backgroundColor: '#FF815E',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200, // Increase the width of the button
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 18, // Increase the font size
    },
    leaveButton: {
        backgroundColor: '#FF815E',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        marginTop: 10, // Add some space above the button
    },
    leaveButtonText: {
        color: 'white',
        fontSize: 18,
    },
    updateButton: {
        backgroundColor: '#FF815E',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        marginTop: 10,
    },
    updateButtonText: {
        color: 'white',
        fontSize: 18,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 300,
        width: '80%',
    },
    modalText: {
        paddingHorizontal: 20,
        paddingVertical:40,
        marginBottom: 15,
        textAlign: 'left',
        height: '90%',
        width: '100%',
        fontFamily: 'Montserrat_500Medium',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        textAlignVertical: 'top',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 80,
        backgroundColor: '#FF815E',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 20,
        color: '#000',
    },
});
