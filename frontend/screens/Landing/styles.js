import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        fontSize: 32,
        marginBottom: 10,
        textAlign: 'center',
        color: '#FF815E', // This makes the title the same color as the buttons
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    container: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 70,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50, // Set a fixed height
        width: 160, // Set a fixed width
    },
    loginButton: {
        backgroundColor: '#FF815E', // This sets the color of the Login button
    },
    registerButton: {
        backgroundColor: '#A9A9A9', // This sets the color of the Register button
    },
    buttonText: {
        color: '#fff',
    },
});
