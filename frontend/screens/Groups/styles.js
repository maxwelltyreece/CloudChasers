import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
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
        maxWidth: '45%',
        aspectRatio: 1,
        margin: '2.5%',
    },
    noCommunitiesContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    noCommunitiesTitle: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    noCommunitiesText: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 4,
    },
    linkText: {
        color: '#FF815E',
        fontSize: 18,
        fontFamily: 'Montserrat_600SemiBold',
    },
});
