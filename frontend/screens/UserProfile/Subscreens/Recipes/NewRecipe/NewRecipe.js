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
  Button,
  Modal,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useFoodLog } from "../../../../../contexts/FoodLogContext";
import { useCommunity } from "../../../../../contexts/CommunityContext";
import { getUserCommunities } from "../../../../../services/CommunityService";
import { uploadImage, pickImage } from "../../../../../services/ImageService";

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
  const [foodModalVisible, setFoodModalVisible] = useState(false);
  const [recipeCommunity, setRecipeCommunity] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState(null)
  const [selectedCommunityName, setSelectedCommunityName] = useState("");
  const [communityModalVisible, setCommunityModalVisible] = useState(false);
  const { addRecipeToCommunity } = useCommunity();
  const [userCommunities, setUserCommunities] = useState([]);

  useEffect(() => {
    const fetchUserCommunities = async () => {
      try {
        const communities = await getUserCommunities();
        setUserCommunities(communities);
      } catch (error) {}
    };

    fetchUserCommunities();
  }, []);

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

  function AddCommunityButton({ onPress }) {
    return (
      <View style={{ paddingHorizontal: 40, borderRadius: 50 }}>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        >
          <Feather name="users" size={40} color="black" />
        </Pressable>
      </View>
    );
  }

    const handleImagePick = async () => {
        const result = await pickImage();
        if (result) {
            setImage(result);
        }
    };

  const fetchUserCommunities = async () => {
    try {
      const communities = await getUserCommunities();
      setUserCommunities(communities.data);

      const communityNames = communities.data.map(
        (community) => community.name
      );
    } catch (error) {
      console.error("Failed to fetch user communities:", error);
    }
  };

  useEffect(() => {
    fetchUserCommunities();
  }, []);

  useEffect(() => {
  }, [userCommunities]); // This effect runs whenever `userCommunities` changes

  const handleAddCommunityPress = async () => {
    await fetchUserCommunities();
    setSelectedCommunity(null); // Reset selected community ID
    setSelectedCommunityName(""); // Reset selected community name
    setCommunityModalVisible(true);
  };

  const handleCommunitySelection = (community) => {
    setSelectedCommunity(community.id);
    setSelectedCommunityName(community.name); // Store the name for display
    console.log("Selected community:", community.name); // Optionally log the name
  };

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
      setFoodModalVisible(false);
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
					backgroundColor: item._id === selectedItem?._id ? "#FF815E" : "#F0F0F0", 
				
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
					`http://api.gobl-up.me:80/food/addItemToRecipe`,
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

  const handleSubmit = async () => {
    if (!recipeName.trim()) {
      Alert.alert("Error", "Recipe name is required");
      return;
    }
    const token = await AsyncStorage.getItem("token");
    const recipeData = {
        name: recipeName,
        description: recipeDescription,
        communityThatOwnsRecipe: recipeCommunity,
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
            await uploadImage(recipeID, image, "Recipe_Pictures");
        }

      Alert.alert("Success", "Recipe created successfully");
      setRecipeName("");
      setRecipeDescription("");
      setRecipeCommunity("");
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ alignItems: "center" }}>
                <AddFoodButton onPress={() => setFoodModalVisible(true)} />
                <Text style={{ fontFamily: "Montserrat_700Bold" }}>
                  Add Food
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <AddImageButton onPress={handleImagePick} />
                <Text style={{ fontFamily: "Montserrat_700Bold" }}>
                  Add Image
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <AddCommunityButton
                  onPress={() => {
                    handleAddCommunityPress();
                  }}
                />
                <Text style={{ fontFamily: "Montserrat_700Bold" }}>
                  Add Community
                </Text>
              </View>
            </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={foodModalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setFoodModalVisible(!foodModalVisible);
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => setFoodModalVisible(false)}
              >
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

            <Modal
              visible={communityModalVisible}
              onRequestClose={() => setCommunityModalVisible(false)}
              animationType="slide"
              transparent={true}
            >
              <TouchableWithoutFeedback
                onPress={() => setCommunityModalVisible(false)}
              >
                <View style={styles.centeredView}>
                  <View style={[styles.modalView, { height: 250 }]}>
                    <Text style={styles.modalText}>Select a Community</Text>
                    <FlatList
                      style={{
                        backgroundColor: "#F0F0F0",
                        borderRadius: 20,
                        padding: 10,
                        margin: 10,
                        width: 250,
                      }}
                      data={userCommunities}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => handleCommunitySelection(item)}
                          style={{
                            padding: 10,
                            backgroundColor:
                              item.id === selectedCommunity
                                ? "#FF815E"
                                : "transparent",
                            borderRadius: 20,
                          }}
                        >
                          <Text style={styles.communityItem}>{item.name}</Text>
                        </TouchableOpacity>
                      )}
                    />
                    {selectedCommunity && (
                      <TouchableOpacity
                        onPress={() => {
                          setRecipeCommunity(selectedCommunity);
                          setCommunityModalVisible(false);
                        }}
                        style={[styles.button, styles.buttonClose]}
                      >
                        <Text style={styles.textStyle}>Add to Community</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.text}>Selected Community: </Text>
            <Text
              style={{
                fontFamily: "Montserrat_400Regular",
              }}
            >
              {selectedCommunityName || "No community selected"}
            </Text>
          </View>
          <View style={{ height: 100 }}>
            <Text style={styles.text}>Selected Foods:</Text>
            {selectedFoods.length > 0 ? (
              <ScrollView
                style={{ backgroundColor: "#F0F0F0", borderRadius: 20 }}
              >
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