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
        width: '100%',
        height: '100%',
    },
    titleContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
    },
    title: {
        color: '#fff',
        fontSize: 18,
    },
    modalView: {
        margin: 20,
        width: '80%',
        height: '60%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalTitle: {
        color: '#000',
        fontSize: 18,
    },
    modalTitle: {
        color: '#000',
        fontSize: 18,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
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
                                <ScrollView style={styles.dropdown} maxHeight={180}>
                                    {ingredients.map((ingredient, index) => (
                                        <Text
                                            key={`${ingredient.name}:${ingredient.weight}`}
                                            style={styles.ingredient}
                                        >
                                            {ingredient.name}
                                        </Text>
                                    ))}
                                </ScrollView>
                                <TextInput 
                                    style={styles.input} 
                                    keyboardType="numeric" 
                                    value={inputWeight} 
                                    onChangeText={setInputWeight} 
                                    placeholder="Weight (g)" 
                                    returnKeyType="done"
                                />
                                <Button title="Log" onPress={logRecipe} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </Pressable>
    );
}

export default SelectableRecipe;


SelectableRecipe.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};