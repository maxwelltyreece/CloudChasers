import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    titleContainer: {
        alignSelf: 'stretch',
        paddingHorizontal: '5%',
    },
    title: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 24,
        marginBottom: 20,
    },
    searchInput: {
        fontFamily: 'Montserrat_600SemiBold',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 10,
    },
    itemContainer: {
        flex: 1,
        maxWidth: '50%',
        aspectRatio: 1,
        margin: '2.5%',
    },
});
