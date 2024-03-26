import React, { useState, useEffect } from "react";
import {
	Alert,
	View,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	FlatList,
	TextInput,
	Modal,
	Image,
	Pressable,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LocalIP } from "../../../../IPIndex";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useFoodLog } from "../../../../../contexts/FoodLogContext";

/**
 * @description Renders the NewRecipe component allowing users to create a new recipe by adding details and selected foods.
 * @returns {JSX.Element} The NewRecipe component.
 */
const NewRecipe = ({}) => {
	const navigation = useNavigation();
	const [image, setImage] = useState(null);
	const [recipeName, setRecipeName] = useState("");
	const [recipeDescription, setRecipeDescription] = useState("");
	const [foods, setFoods] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFoods, setSelectedFoods] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const { searchFoods } = useFoodLog();
	const [inputWeight, setInputWeight] = useState("");
	const [shouldRenderScrollView, setRenderScrollView] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);

	function AddFoodButton({ onPress }) {
		return (
			<View style={{ paddingHorizontal: 40, borderRadius: 50 }}>
				<Pressable
					onPress={onPress}
					style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
				>
					<Feather name="plus" size={40} color="black" />
				</Pressable>
			</View>
		);
	}
	/**
   * @description Button component for adding an image to the recipe.
   * @param {Function} onPress - Function to execute on button press.
   * @returns {JSX.Element} A stylized pressable component for adding an image.
   */
	function AddImageButton({ onPress }) {
		return (
			<View style={{ paddingHorizontal: 40, borderRadius: 50 }}>
				<Pressable
					onPress={onPress}
					style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
				>
					<Feather name="image" size={40} color="black" />
				</Pressable>
			</View>
		);
	}
	/**
   * @description Extracts and returns the file name from a given file path or URL.
   * @param {string} image - The path or URL of the image.
   * @returns {string} The file name extracted from the path or URL.
   */
	function getFileName(image) {
		const fileName = image.split("/").pop();
		console.log(fileName);
		return fileName;
	}
	/**
   * @description Launches the image picker library to allow the user to select an image.
   */
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled && result.assets) {
			setImage(result.assets[0].uri);
			getFileName(result.assets[0].uri);
		}
	};
	/**
	 * @description Handles adding a selected food item to the recipe, including validation.
	 */
	const addItem = () => {
		if (!selectedItem) {
			Alert.alert("Error", "You must select a food");
			return;
		}
  
		if (!inputWeight.trim()) {
			Alert.alert("Error", "Weight is required");
			return;
		}
  
		if (!selectedFoods.some((food) => food._id === selectedItem._id)) {
			setSelectedFoods([
				...selectedFoods,
				{ ...selectedItem, weight: inputWeight },
			]);
			setInputWeight("");
			setModalVisible(false);
			setSelectedItem(null); 
			setSearchQuery("");
		} else {
			Alert.alert("Item already added");
		}
	};

	/**
	 * Renders an item in the list.
	 *
	 * @param {Object} item - The item to render.
	 * @returns {JSX.Element} The rendered item.
	 */
	const renderItem = (item) => (
		<TouchableOpacity
			style={[
				styles.item,
				{
					backgroundColor: item._id === selectedItem?._id ? "#FF815E" : "white",
				},
			]}
			onPress={() => setSelectedItem(item)}
			key={item._id}
		>
			<Text>{item.name}</Text>
		</TouchableOpacity>
	);

	/**
	 * Searches for foods based on the provided search query.
	 * @returns {Promise<void>} A promise that resolves when the search is complete.
	 */
	const searchFood = async () => {
		const response = await searchFoods({ name: searchQuery });
		setFoods(response.data.foods);
	};

	/**
	 * Removes an item from the selected foods array based on its id.
	 * @param {string} id - The id of the item to be removed.
	 */
	const removeItem = (id) => {
		setSelectedFoods(selectedFoods.filter((item) => item._id !== id));
	};

	/**
	 * Adds selected foods to a recipe.
	 * @param {string} recipeID - The ID of the recipe.
	 * @param {string} token - The authentication token.
	 * @returns {Promise<void>} - A promise that resolves when all items have been added to the recipe.
	 */
	const addItemsToRecipe = async (recipeID, token) => {
		for (const food of selectedFoods) {
			const payload = {
				recipeID: recipeID,
				foodID: food._id,
				weight: food.weight,
			};
			console.log("Payload:", payload);

			try {
				await axios.put(
					`http://${LocalIP}:3000/food/addItemToRecipe`,
					payload,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
			} catch (error) {
				console.error("Error adding item to recipe:", error);
			}
		}
	};

	useEffect(() => {
		if (searchQuery.length >= 3) {
			searchFood();
		}
	}, [searchQuery]);

	/**
	 * Handles the submission of a new recipe.
	 * 
	 * @returns {Promise<void>} A Promise that resolves when the submission is complete.
	 */
	const handleSubmit = async () => {
		if (!recipeName.trim()) {
			Alert.alert("Error", "Recipe name is required");
			return;
		}
		const token = await AsyncStorage.getItem("token");
		const recipeData = {
			name: recipeName,
			description: recipeDescription,
			foods: selectedFoods,
		};

		try {
			const response = await axios.post(
				`http://${LocalIP}:3000/food/createNewRecipeByUser`,
				recipeData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			console.log("Recipe created:", response.data.data._id);
			console.log("ALL DATA:", recipeData);
			const recipeID = response.data.data._id;

			await addItemsToRecipe(recipeID, token);

			if (image) {
				const formData = new FormData();
				formData.append("objectID", recipeID);
				formData.append("folderName", "Recipe_Pictures");
				formData.append("file", {
					uri: image,
					name: getFileName(image),
					type: "image/jpeg",
				});

				await axios.post(
					`http://${LocalIP}:3000/image/uploadPicture`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "multipart/form-data",
						},
					}
				);
			}

			Alert.alert("Success", "Recipe created successfully");
			setRecipeName("");
			setRecipeDescription("");
			setImage(null);
			navigation.goBack();
		} catch (error) {
			console.error("Error creating recipe or uploading image:", error);
			Alert.alert("Error", "Failed to create recipe");
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container} keyboardShouldPersistTaps="handled">
				<View style={styles.semiCircle}></View>
				<KeyboardAvoidingView behavior="position" enabled>
					<View style={styles.formContainer}>
						<Text style={styles.headerText}>Add New Recipe</Text>
						<TextInput
							style={styles.input}
							placeholder="Recipe Name"
							onChangeText={setRecipeName}
							returnKeyType="done"
							value={recipeName}
						/>
						<TextInput
							style={[styles.input, { height: 80 }]}
							placeholder="Description"
							multiline={true}
							onChangeText={(text) => setRecipeDescription(text)}
							onSubmitEditing={Keyboard.dismiss}
							value={recipeDescription}
						/>
						<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
							<View style={{ alignItems: "center" }}>
								<AddFoodButton onPress={() => setModalVisible(true)} />
								<Text style={{ fontFamily: "Montserrat_700Bold" }}>Add Food</Text>
							</View>
							<View style={{ alignItems: "center" }}>
								<AddImageButton onPress={pickImage} />
								<Text style={{ fontFamily: "Montserrat_700Bold" }}>Add Image</Text>
							</View>
						</View>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible}
							onRequestClose={() => {
								Alert.alert("Modal has been closed.");
								setModalVisible(!modalVisible);
							}}
						>
							<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
								<View style={styles.centeredView}>
									<TouchableWithoutFeedback>
										<View style={styles.modalView}>
											<Text style={styles.modalText}>Add a New Food Item</Text>

											<TextInput
												style={styles.modalInput}
												placeholder="Search Food..."
												placeholderTextColor="darkgray"
												value={searchQuery}
												onChangeText={(text) => setSearchQuery(text)}
												blurOnSubmit
												returnKeyType="search"
											/>

											{searchQuery.length >= 3 && shouldRenderScrollView && (
												<View style={styles.dropdownContainer}>
													<ScrollView style={styles.dropdown} maxHeight={180}>
														{foods.map(renderItem)}
													</ScrollView>
												</View>
											)}
											<TextInput
												style={styles.modalInput}
												placeholder="Weight in grams"
												placeholderTextColor="darkgray"
												keyboardType="numeric"
												value={inputWeight}
												onChangeText={setInputWeight}
												blurOnSubmit
												returnKeyType="done"
											/>
											<Pressable
												style={[styles.button, styles.buttonClose]}
												onPress={addItem}
											>
												<Text style={styles.textStyle}>Add Food</Text>
											</Pressable>
										</View>
									</TouchableWithoutFeedback>
								</View>
							</TouchableWithoutFeedback>
						</Modal>
					</View>

					<View style={{ marginVertical: 20, paddingTop: 10, height: 150 }}>
						<Text style={styles.text}>Selected Foods:</Text>
						{selectedFoods.length > 0 ? (
							<ScrollView>
								<FlatList
									data={selectedFoods}
									keyExtractor={(item) => item._id.toString()}
									renderItem={({ item }) => (
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
												alignItems: "center",
												marginBottom: 5,
												paddingHorizontal: 10,
											}}
										>
											<View style={{ flex: 0.8 }}>
												<Text>
													{item.weight}g {item.name}
												</Text>
											</View>
											<Pressable onPress={() => removeItem(item._id)}>
												<Text style={{ color: "red" }}>Remove</Text>
											</Pressable>
										</View>
									)}
									contentContainerStyle={{ paddingBottom: 20 }}
								/>
							</ScrollView>
						) : (
							<Text
								style={{
									paddingVertical: 10,
									fontFamily: "Montserrat_400Regular",
								}}
							>
								No foods added
							</Text>
						)}
					</View>
				</KeyboardAvoidingView>

				{image && <Image source={{ uri: image }} style={styles.imagePreview} />}
				<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
					<Text style={styles.submitButtonText}>Submit Recipe</Text>
				</TouchableOpacity>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default NewRecipe;
