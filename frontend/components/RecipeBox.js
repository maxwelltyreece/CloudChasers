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
import PropTypes from 'prop-types';
import { LocalIP } from "../screens/IPIndex";
import axios from "axios";

const styles = StyleSheet.create({
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

  background:{
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    width: 250,
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
    padding:20,
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
  
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
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
    paddingBottom: 10,
    
  },
  ingredient: {
    fontSize: 15,
    fontFamily: "Montserrat_400Regular",
    color: "#000",
    padding: 8,
    textAlign: "left",
  },
  ingredientsTitle: {
    fontFamily: "Montserrat_700Bold",
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 20,
  },
  ingredientText: {
    fontFamily: "Montserrat_400Regular",
    textAlign: "left", 
  },
});


function RecipeBox({ id, title, description, }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [ingredients, setIngredients] = useState([]);
	const [imageUrl, setImageUrl] = useState(null);

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

		const getIngredients = async () => {
			try {
				const response = await axios.get(
					`http://${LocalIP}:3000/food/getRecipeIngredients?recipeID=${id}`
				);
				if (Array.isArray(response.data.data)) {
					setIngredients(response.data.data);
				} else {
					setIngredients([]);
				}
			} catch (error) {
				console.error("Failed to fetch ingredients", error);
			}
		};

		getIngredients();
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
          
          {/* Container View to control the ScrollView size */}
          <View style={[styles.background, { maxHeight: 190 }]}>
            <ScrollView>
              {ingredients.length > 0 ? (
                ingredients.map((ingredient, index) => (
                  <Text
                    key={index}
                    style={styles.ingredient}
                  >
                    {ingredient.weight}g of {ingredient.name}
                  </Text>
                ))
              ) : (
                <Text style={styles.ingredient}>No ingredients added</Text>
              )}
            </ScrollView>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
</Modal>

    </Pressable>
  );
}

export default RecipeBox;

RecipeBox.PropTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	image: PropTypes.string,
};
