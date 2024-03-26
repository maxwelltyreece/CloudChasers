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
		fontSize: 20, // Made the size consistent with modalText
	},
	ingredientText: {
		fontFamily: "Montserrat_400Regular",
		textAlign: "left", 
	},
});


function RecipeBox({ id, title, description, onDelete }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [ingredients, setIngredients] = useState([]);
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		const handleImageRetrieval = () => {
			axios
				.get(
					`http://api.gobl-up.me:80/image/getPictureURL?id=${id}&folderName=Recipe_Pictures`
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
					`http://api.gobl-up.me:80/food/getRecipeIngredients?recipeID=${id}`
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
								<ScrollView style={styles.dropdown} maxHeight={180}>
									{ingredients.map((ingredient, index) => (
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

RecipeBox.propTypes = {
	title: proptypes.string.isRequired,
	description: proptypes.string,
	image: proptypes.string,
};
