import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    welcomeContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 15,
        paddingTop: 16,
        padding: 5,
    },
    welcomeText: {
        fontSize: 25,
        color: '#333',
        left: Platform.OS === 'ios' ? '5%' : '8%',
        fontFamily: 'Montserrat_800ExtraBold',
    },
});
