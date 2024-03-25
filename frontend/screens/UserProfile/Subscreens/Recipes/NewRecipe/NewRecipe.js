import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput, Button, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LocalIP } from '../../../../IPIndex'; // Ensure this path is correct
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NewRecipe = ({ }) => {
  const [image, setImage] = useState(null);
  const [recipeName, setRecipeName] = useState('');
  const navigation = useNavigation();

  function getFileName(image) {
    const fileName = image.split('/').pop();
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

  const handleSubmit = async () => {
    if (!recipeName.trim()) {
      Alert.alert('Error', 'Recipe name is required');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const recipeData = {
      name: recipeName,
      description: null,
      communityThatOwnsRecipe: null,
    };

    try {
      const response = await axios.post(`http://${LocalIP}:3000/food/createNewRecipeByUser`, recipeData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Recipe created:', response.data.data._id);
      const recipeID = response.data.data._id;

      if (image) {
        const formData = new FormData();
        formData.append('objectID', recipeID);
        formData.append('folderName', 'Recipe_Pictures');
        formData.append('file', {
          uri: image,
          name: getFileName(image),
          type: 'image/jpeg',
        });

        await axios.post(`http://${LocalIP}:3000/image/uploadPicture`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      Alert.alert('Success', 'Recipe created successfully');
      setRecipeName('');
      setImage(null);
      navigation.goBack();
    } catch (error) {
      console.error('Error creating recipe or uploading image:', error);
      Alert.alert('Error', 'Failed to create recipe');
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <KeyboardAvoidingView behavior="position" enabled>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>Add New Recipe</Text>
          <TextInput
            style={styles.input}
            placeholder="Name of Recipe"
            onChangeText={setRecipeName}
            value={recipeName}
          />
          <Button title="Pick Recipe Image" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Recipe</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007bff',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#FF815E',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
});

export default NewRecipe;
