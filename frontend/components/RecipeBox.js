import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  onClose,
} from "react-native";
import proptypes from "prop-types";

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    width: "48%",
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
    height: 400,
  },
  modalImage: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Montserrat_700Bold",
  },
  closeText: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 3,
    right: 2,
    padding: 10,
    zIndex: 1,
  },
});

function RecipeBox({ title, image }) {
  const [modalVisible, setModalVisible] = useState(false);
  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/gobl-b4e3d.appspot.com/o/Recipe_Pictures%2F65fc78d19e672bbcbb30ca4b.jpg?alt=media&token=0d6af43d-3343-49b4-bc5f-abd74f5bca4d";

  return (
    <Pressable style={styles.box} onPress={() => setModalVisible(true)}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>X</Text>
            </Pressable>

            <Text style={styles.text}>{title}</Text>
            <Image source={{ uri: imageUrl }} style={styles.modalImage} />
          </View>
        </View>
      </Modal>
    </Pressable>
  );
}

export default RecipeBox;

RecipeBox.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
};
