import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    currentStreakContainer: {
        width: '25%',
        height: '75%',
        backgroundColor: '#FF4500',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        right: '14%',
        bottom: '9%',
    },
    streakText: {
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
