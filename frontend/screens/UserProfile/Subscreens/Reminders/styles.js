import { StyleSheet, Dimensions } from 'react-native';

const { width} = Dimensions.get('window');


export const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    scrollViewContainer: {
        width: '100%',
    },
    remindersDescription: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        maxWidth: '92%',
    },
    reminderInfoTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF815E',
    },
    reminderInfoText: {
        fontSize: 14,
        marginRight: 10,
        marginBottom: 2,
    },
    reminderItem: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        borderRadius: 12,
        marginHorizontal: 20,
    },
    remindersDescriptionContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    remindersInfoContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    addReminderButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    addReminderButton: {
        color: '#FFFFFF',
        backgroundColor: '#FF815E',
        margin: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        opacity: 0.9,
    },
    modalView: {
        flex: 1,
        height: '50%',
        marginTop: '25%',
        marginBottom: '10%',
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: '15%',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        borderTopEndRadius: 28,
    },
    descriptionInput: {
        width: '100%',
        margin: 20,
        marginBottom: 35,
        borderWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 12,
        fontSize: 16,
        fontWeight: '500',
    },
    selectFreqTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    frequencySelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 22,
        width: '100%',
    },
    frequencyOption: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#007aff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    frequencyOptionSelected: {
        backgroundColor: '#007aff',
    },
    frequencyTextSelected: {
        color: 'white',
    },
    selectTimeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    currentTimeSelectedText: {
        fontSize: 22,
        fontWeight: '600',
        marginVertical: 10,
    },
    timePickerSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 35,
        width: '100%',
        marginTop: 10,
    },
    timePickerButton: {
        backgroundColor: '#F0F0F0',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    timePickerButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    actionButtonsSection: {
        // flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        margin: 25,
    },
    cancelButton: {
        marginTop: 20,
        marginHorizontal: 10,
        width: '32%',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        // overflow: 'hidden',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        opacity: 0.9,
    },
    addButton: {
        marginTop: 20,
        marginHorizontal: 10,
        width: '40%',
        backgroundColor: '#FF815E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        // overflow: 'hidden',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        opacity: 0.9,
    },
    cancelButtonText: {
        fontSize: 15,
        color: 'red',
        alignSelf: 'center',
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        // color: 'white',
    },
    reminderActionButtonsSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    editButton: {
        padding: 10,
        right: '20%',
        width: 50,
        height: 35,
        backgroundColor: '#FF815E',
        borderRadius: 5,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButton: {
        padding: 5,
        right: '20%',
        width: 60,
        height: 35,
        backgroundColor: 'tomato',
        borderRadius: 5,
        marginHorizontal: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        padding: 5,
        right: '20%',
        width: 50,
        height: 35,
        backgroundColor: '#F7F7F7',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    threeDotsButton: {
        position: 'absolute',
        right: 16,
        padding: 5,
        marginLeft: 20,
    },
    threeDotsText: {
        fontSize: 21,
        fontWeight: '900',
    },
    semiCircle: {
        width: width * 2,
        height: width * 2,
        borderRadius: width,
        position: 'absolute',
        top: -width * 0.7,
        left: -width / 2,
        backgroundColor: '#FF815E',
        zIndex: -1,
    },
});
