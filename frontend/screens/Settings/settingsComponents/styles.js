import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    logoutButton: {
        borderRadius: 100,
        marginTop: 30,
        padding: 16,
        backgroundColor: '#FF815E',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 0,
        elevation: 1,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
});
