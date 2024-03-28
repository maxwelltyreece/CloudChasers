import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    box: {
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        width: "45%",
        aspectRatio: 1,
        margin: 8,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    titleContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "transparent",
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: "Montserrat_700Bold",
        color: "white",
        textShadowColor: "rgba(0, 0, 0, 0.75)",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 300,
        height: "70%",
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: "center",
        fontFamily: "Montserrat_700Bold",
    },
    input: {
        height: 40,
        backgroundColor: "#F0F0F0",
        borderWidth: 1,
        borderRadius: 10,
        width: '50%',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
    },
    button: {
        borderRadius: 20,

        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: "#FF815E",
    },
    logButton: {
        backgroundColor: "#FF815E",
        padding: 10,
        width: 100,
        borderRadius: 20,
        marginTop: 10,
    },
    logButtonText: {
        color: "white",
        textAlign: "center",
        fontFamily: "Montserrat_700Bold",
        fontSize: 16,
    },
    ingredientsTitle: {
        fontSize: 20,
        fontFamily: "Montserrat_700Bold",
        marginBottom: 10,
    },
});
