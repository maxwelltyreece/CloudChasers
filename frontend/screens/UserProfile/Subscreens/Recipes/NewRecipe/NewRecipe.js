import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  Button,
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

  function getFileName(image) {
    const fileName = image.split("/").pop();
    console.log(fileName);
    return fileName;
  }

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

  const addFood = () => {
    const newFood = { name: "New Food" };
    setFoods([...foods, newFood]);
  };

  const addItem = () => {
    if (!inputWeight.trim()) {
      Alert.alert("Error", "Weight is required");
      return;
    }
  
    if (!selectedFoods.some((food) => food._id === selectedItem._id)) {
      setSelectedFoods([...selectedFoods, { ...selectedItem, weight: inputWeight }]);
      setInputWeight(""); 
      setModalVisible(false);
    } else {
      Alert.alert("Item already added");
    }
  };

  const renderItem = (item) => (
    <TouchableOpacity
      style={[
        styles.item,
        { backgroundColor: item._id === selectedItem?._id ? "orange" : "white" }
      ]}
      onPress={() => setSelectedItem(item)}
      key={item._id}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const searchFood = async () => {
    const response = await searchFoods({ name: searchQuery });
    setFoods(response.data.foods);
  };

  const removeItem = (id) => {
    setSelectedFoods(selectedFoods.filter((item) => item._id !== id));
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ alignItems: "center" }}>
                <AddFoodButton onPress={() => setModalVisible(true)} />
                <Text style= {{fontFamily: 'Montserrat_700Bold'}}>Add Food</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <AddImageButton onPress={pickImage} />
                <Text style= {{fontFamily: 'Montserrat_700Bold'}}>Add Image</Text>
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

          <View style={{ marginVertical: 20, paddingTop: 20 }}>
            <Text style={styles.text}>
              Selected Foods:
            </Text>
            {selectedFoods.length > 0 ? (
              <FlatList
                data={selectedFoods}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 5,
                    }}
                  >
                    <View style={{ flexDirection: "row", flex: 1 }}>
                      <Text>
                        {item.weight}g {item.name}{" "}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => removeItem(item._id)}>
                      <Text style={{ color: "red" }}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            ) : (
              <Text style={{fontFamily: 'Montserrat_400Regular'}}>No foods added.</Text>
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
