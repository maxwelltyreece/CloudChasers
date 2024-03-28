import React, { useState, useEffect } from "react";
import { Alert, TextInput, View, Text, Image, Pressable, Modal, TouchableWithoutFeedback, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import { getImageLink } from '../../../../services/ImageService';
import { useFoodLog } from "../../../../contexts/FoodLogContext";
import { styles } from "./styles";

/**
 * SelectableRecipe component
 * @param {Object} props - The properties passed to the component
 * @param {string} props.id - The id of the recipe
 * @param {string} props.title - The title of the recipe
 * @param {string} props.description - The description of the recipe
 * @returns {JSX.Element} The SelectableRecipe component
 */
function SelectableRecipe({ id, title, description }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const { getRecipeIngredients, logRecipeFood } = useFoodLog();

    useEffect(() => {

         /**
         * Fetch the image URL for the recipe
         */
        const handleImageRetrieval = async () => {
            try {
                const link = await getImageLink('Recipe_Pictures', id);
                setImageUrl(link);
            } catch (error) {
                console.error("Failed to fetch image URL", error);
            }
        };

        handleImageRetrieval();
        /**
         * Fetch the ingredients for the recipe
         */
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
    /**
     * Log the recipe
     */
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