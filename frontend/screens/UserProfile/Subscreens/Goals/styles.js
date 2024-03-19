import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // paddingTop: 50,
        backgroundColor: '#F0F0F0',
        // justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'lightgreen',
    },
    goalsContainer: {
        width: '100%',
        height: '100%',
        // backgroundColor: 'green',
        paddingTop: '11%',
        paddingBottom: '7%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    goalsListContainer: {
        width: '100%',
        // height: '100%',
        // backgroundColor: 'green',
        paddingTop: 20,
        marginBottom: 20,
    },
    listItem: {
        height: '10%',
        padding: 5,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderRadius: 12,
        borderColor: '#eee',
        width: '90%',
        alignSelf: 'center',
        marginBottom: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoSection: {
        justifyContent: 'center',
        alignContent: 'center',
        // backgroundColor: 'red',
        width: '60%',
        height: '100%',
        padding: 10,
    },
    buttonSection: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: '100%',
        // backgroundColor: 'blue',
    },
    currentGoalInfoSection: {
        // marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'yellow',
    },
    currentGoalInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        // marginBottom: 10,
    },
    currentGoalInfoText: {
        fontSize: 18,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    goalSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    input: {
        height: '82%',
        width: '50%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        // marginTop: 8,
        paddingHorizontal: 10,
        fontSize: 18,
        // backgroundColor: 'blue',
        alignSelf: 'center',
    },
    button: {
        height: '82%',
        // marginTop: 10,
        backgroundColor: '#FF815E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateGoalButton: {
        height: '82%',
        // marginTop: 10,
        backgroundColor: '#FF815E',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        alignSelf: 'center',
    },
});