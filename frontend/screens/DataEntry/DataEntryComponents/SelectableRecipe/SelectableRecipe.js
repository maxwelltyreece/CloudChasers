import React, { useState, useEffect } from "react";
import { Alert, TextInput, Button, View, Text, Image, Pressable, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import { LocalIP } from "../../../IPIndex";
import axios from "axios";
import { StyleSheet } from 'react-native';
import { getImageLink } from '../../../../services/ImageService';
import { useFoodLog } from "../../../../contexts/FoodLogContext";


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
  ingredientsTitle:{
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 10,
  },
  
});

function SelectableRecipe({ id, title, description }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const { getRecipeIngredients, logRecipeFood } = useFoodLog();

    useEffect(() => {
        const handleImageRetrieval = async () => {
            try {
                const link = await getImageLink('Recipe_Pictures', id);
                setImageUrl(link);
            } catch (error) {
                console.error("Failed to fetch image URL", error);
            }
        };

        handleImageRetrieval();

        const getIngredients = async () => {
            try {
                const response = await getRecipeIngredients(id);
                if (Array.isArray(response)) {
                    setIngredients(response);
                } else {
                    setIngredients([]);
                }
            } catch (error) {
                console.error("Failed to fetch ingredients", error);
            }
        };

        getIngredients();
    }, [id]);

    const [inputWeight, setInputWeight] = useState('');

    const logRecipe = async () => {
        if (!inputWeight) {
            Alert.alert('Error', 'Please enter a weight');
            return;
        }
        if (isNaN(inputWeight)) {
            Alert.alert('Error', 'Please enter a valid number for weight');
            return;
        }
        if (inputWeight <= 0) {
            Alert.alert('Error', 'Weight must be more than 0g');
            return;
        }

        try {
            const response = await logRecipeFood({
                mealType: title,
                recipeID: id,
                totalRecipeWeight: parseInt(inputWeight),
            });

            console.log(response);
        } catch (error) {
            console.error("Failed to log recipe", error);
        }

        setInputWeight('');
        setModalVisible(false);
    };
    
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
                  <Text style={styles.modalTitle}>{title}</Text>
                  <Text style={styles.description}>{description}</Text>
                  <Text style={styles.ingredientsTitle}>Ingredients</Text>
                  <ScrollView style={styles.dropdown}>
                    {ingredients.map((ingredient) => (
                      <Text
                        key={`${ingredient.name}:${ingredient.weight}`}
                        style={styles.ingredient}
                      >
                        {ingredient.weight}g of {ingredient.name}
                      </Text>
                    ))}
                  </ScrollView>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={inputWeight}
                    onChangeText={setInputWeight}
                    placeholder="Weight (g)"
                    placeholderTextColor="darkgrey"
                    returnKeyType="done"
                  />
                  <Pressable style={styles.logButton} onPress={logRecipe}>
                    <Text style={styles.logButtonText}>Log</Text>
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </Pressable>
    );
}

export default SelectableRecipe;


SelectableRecipe.PropTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};