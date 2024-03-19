import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
    },
    // title: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    // },
    description: {
        fontFamily: 'Montserrat_600SemiBold',
        color: '#6B6868',
        fontSize: 16,
        textAlign: 'left',
    },
    headerButton: {
        flexDirection: 'row',
        marginRight: 16,
    },
    iconButton: {
        marginRight: 8,
    },
    feedContainer: {
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
    },
    feed: {
        flexDirection: 'column',
        alignItems: 'stretch',
        flexGrow: 1,
        width: '100%',
        paddingTop: 20,
        paddingBottom: 50,
    },
    divider: {
        height: 2,
        backgroundColor: 'lightgrey',
        marginTop: 10,
        borderRadius: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 12,
    },
    input: {
        backgroundColor: null,
        flex: 1,
        height: 40,
        fontFamily: 'Montserrat_600SemiBold',
    },
    messageContainer: {
        flexDirection: 'column',
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        paddingBottom: 20,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 2,
    },
    sender: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 12,
        marginBottom: 8,
        color: 'darkgrey',
    },

    messageText: {
        fontFamily: 'Montserrat_500Medium',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#FF815E',
        borderRadius: 35,
        position: 'absolute',
        bottom: 10,
        right: 0,
    },
});
