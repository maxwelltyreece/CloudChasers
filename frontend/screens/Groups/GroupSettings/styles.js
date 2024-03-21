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
        backgroundColor: 'red',
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
        backgroundColor: 'blue',
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
});
