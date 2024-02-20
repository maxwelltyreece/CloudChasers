import { StyleSheet } from 'react-native';
import globalStyles from './global';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 24,
    },
    label: {
        fontSize: 14,
        ...globalStyles.bold,
    },
    separator: {
        height: 1, 
        backgroundColor: '#A9A9A9', 
        width: '100%',
    },
});

export default styles;