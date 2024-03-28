import { StyleSheet } from 'react-native';
import globalStyles from '../../../../styles/global';

export const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        flex: 1,
        alignItems: 'center',
    },
    faq: {
        marginTop: 20,
    },
    question: {
        ...globalStyles.bold,
        marginBottom: 10,
    },
    answer: {
        marginBottom: 20,
    },
});
