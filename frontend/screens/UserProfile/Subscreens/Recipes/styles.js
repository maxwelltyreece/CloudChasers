import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        paddingHorizontal: 5,
    },
    list: {
        flex: 1,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    box: {
        width: '45%',
        aspectRatio: 1,
        margin: 8,
    },
    searchInput: {
        fontFamily: 'Montserrat_600SemiBold',
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        showCancel: true,
        padding: 10,
        borderRadius: 10,
    },

    titleContainer: {
        alignSelf: 'stretch',
        paddingHorizontal: '5%',
    },
});
