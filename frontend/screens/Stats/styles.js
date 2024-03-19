import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    statsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'column',
        backgroundColor: '#f2f2f2'
    },
    statsHeader: {
        // justifyContent: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    ringComp: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },

    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
