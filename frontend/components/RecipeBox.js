import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  ScrollView,
  onClose,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import proptypes from "prop-types";
import { LocalIP } from "../screens/IPIndex";
import axios from "axios";

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
    padding: 10,
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
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  text: {
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

function RecipeBox({ id, title, description, onDelete }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const deleteRecipe = () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            axios
              .delete(`http://${LocalIP}:3000/food/deleteRecipe`, {
                data: { recipeID: id },
              })
              .then((response) => {
                console.log("DELETE RESPOSNE: " + response.data);
                onDelete(id);
                setModalVisible(false);
              })
              .catch((error) =>
                console.error("Failed to delete recipe", error)
              );
          },
        },
      ]
    );
  };

  useEffect(() => {
    const handleImageRetrieval = () => {
      axios
        .get(
          `http://${LocalIP}:3000/image/getPictureURL?id=${id}&folderName=Recipe_Pictures`
        )
        .then((response) => {
          setImageUrl(response.data.url);
        })
        .catch((error) => console.error("Failed to fetch image URL", error));
    };

    handleImageRetrieval();
  }, [id]);

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
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalView}>
                <Image source={{ uri: imageUrl }} style={styles.modalImage} />
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.ingredientsTitle}>Ingredients</Text>
                {/* Planning on having ingredients here...
                <ScrollView style={styles.text}>
                   {ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredient}>
                      {ingredient.name}: {ingredient.weight}
                    </Text>
                  ))} }
                   </ScrollView> */}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Pressable>
  );
}

export default RecipeBox;

RecipeBox.propTypes = {
  title: proptypes.string.isRequired,
  description: proptypes.string,
  image: proptypes.string,
};
