import { StyleSheet } from "react-native";

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
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    titleContainer: {
        flex: 1,
        justifyContent: "flex-end",
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
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
        height: "60%",
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
    },
    ingredient: {
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
        color: "#000",
        marginBottom: 10,
        textAlign: "left",
    },

    modalImage: {
        width: 200,
        height: 200,
        resizeMode: "contain",
    },
    modalText: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: "center",
        fontFamily: "Montserrat_700Bold",
    },
    description: {
        fontSize: 14,
        fontFamily: "Montserrat_300Light",
        color: "black",
    },
    closeButton: {
        position: "absolute",
        top: 3,
        right: 2,
        padding: 10,
        zIndex: 1,
    },
    text: {
        fontSize: 24,
        fontFamily: "Montserrat_700Bold",
        paddingBottom: 20
    },

    ingredientsTitle: {
        fontFamily: "Montserrat_700Bold",

        textAlign: "center",
        fontSize: 20,
    },
    ingredientText: {
        fontFamily: "Montserrat_400Regular",
        textAlign: "left",
    },
});
