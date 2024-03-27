import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	Modal,
	Pressable,
	TouchableOpacity,
	ScrollView,
	onClose,
	Alert,
	TouchableWithoutFeedback,
} from "react-native";
import PropTypes from 'prop-types';
import { LocalIP } from "../../screens/IPIndex";
import axios from "axios";
import { styles } from "./styles";

/**
 * Displays a recipe box with an image, title, and description. On press, it displays a modal with more details including ingredients.
 * 
 * @component
 * @param {Object} props The component props.
 * @param {number} props.id The unique identifier for the recipe.
 * @param {string} props.title The title of the recipe.
 * @param {string} [props.description] The description of the recipe.
 * @returns {React.ReactElement} A RecipeBox component.
 */
function RecipeBox({ id, title, description, }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [ingredients, setIngredients] = useState([]);
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {

		/**
		 * Fetches the image URL for the recipe from the server and updates the state.
		 */
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
		/**
		 * Fetches the ingredients for the recipe from the server and updates the state.
		 */
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
		<Pressable style={styles.box} onPress={() => setModalVisible(true)} testID="recipe-box">
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
				testID="modal"
			>
				<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
					<View style={styles.centeredView}>
						<TouchableWithoutFeedback onPress={() => {}}>
							<View style={styles.modalView}>
								<Image source={{ uri: imageUrl }} style={styles.modalImage} />
								<Text style={styles.text}>{title}</Text>
								<Text style={styles.description}>{description}</Text>
								<Text style={styles.ingredientsTitle}>Ingredients</Text>
								<ScrollView style={styles.dropdown} maxHeight={180}>
									{ingredients.map((ingredient) => (
										<Text
											key={`${ingredient.name}:${ingredient.weight}`}
											style={styles.ingredient}
										>
											{ingredient.weight}g of {ingredient.name}
										</Text>
									))}
								</ScrollView>
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
