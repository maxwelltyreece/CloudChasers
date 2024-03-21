import React, { useState } from 'react';
import { View, Text, StyleSheet,Alert, Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LocalIP } from '../../../../IPIndex';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecipeModal = ({ isVisible, onClose }) => {

  function getFileName(image){
    console.log("RHIS ONGGets to here");
    const fileName = image.split('/').pop();
    console.log(fileName);
    return fileName;
  }

   const [image, setImage] = useState(null);
   const [recipeName, setRecipeName] = useState('');
   var recipeID = '';
   const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });



    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }

    getFileName(result.assets[0].uri);

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
          communityThatOwnsRecipe: null
        }
        axios.post(`http://${LocalIP}:3000/food/createNewRecipeByUser`, recipeData,{ headers: { Authorization: `Bearer ${token}`}},
        ).then((response) => {
          console.log('Recipe created:', response.data.data._id);
          recipeID = response.data.data._id;
          console.log("Recipe ID = " + recipeID);
          if (image == null){
            onClose();
            return;
          }
          const formData = new FormData();
          console.log("Recipe ID = " + recipeID);
          formData.append('objectID', recipeID);
          formData.append('folderName', 'Recipe_Pictures');
          formData.append('file', {
            uri: image,
            name: getFileName(image),
            type: 'image',
          
          });
          axios.post(`http://${LocalIP}:3000/image/uploadPicture`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          onClose();
        
        }).catch((error) => {
          console.error('Error creating recipe:', error);
        });
       }

return (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isVisible}
    onRequestClose={onClose}
  >
    <TouchableWithoutFeedback onPressOut={Modal.onRequestClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalView}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalText}>Add New Recipe</Text>

              <TextInput
                style={styles.input}
                placeholder="Name of Recipe"
                onChangeText={(text) => setRecipeName(text)}
                value={recipeName}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />

              <TextInput
                style={[styles.input, styles.inputDescription]}
                placeholder="Description"
                multiline={true}
                returnKeyType="done"
                blurOnSubmit={true}
                onSubmitEditing={Keyboard.dismiss}
              />

              <View style={[styles.button]}>
                <Button title="Pick Recipe Image" onPress={pickImage} />
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </View>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={handleSubmit}
              >
                <Text style={styles.textStyle}>Submit Recipe</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </TouchableWithoutFeedback>
  </Modal>
);
};


const styles = StyleSheet.create({
 centeredView: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 22,
 },
 closeButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  borderRadius: 15,
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
},
closeButtonText: {
  color: 'black',
  fontWeight: 'bold',
  fontSize: 18,
},

 modalView: {
   margin: 20,
   backgroundColor: 'white',
   borderRadius: 20,
   padding: 35,
   width: 350,
   height: 600,
   alignItems: 'center',
   shadowColor: '#000',
   shadowOffset: {
     width: 0,
     height: 2,
   },
   shadowOpacity: 0.25,
   shadowRadius: 4,
   elevation: 5,
 },
 input: {
   height: 40,
   margin: 12,
   borderWidth: 1,
   padding: 10,
   width: '100%',
   borderRadius: 5,
 },
 inputDescription: {
   height: 100, 
   textAlignVertical: 'top', // Align text to top in multiline
 },
 button: {
   borderRadius: 20,
   padding: 10,
   elevation: 2,
 },
 buttonClose: {
   backgroundColor: "#FF815E",
 },
 textStyle: {
   color: "white",
   fontWeight: "bold",
   textAlign: "center",
 },
 modalText: {
   marginBottom: 15,
   fontFamily: 'Montserrat_600SemiBold',
   fontSize: 20,
   textAlign: "center",
 }
});


export default RecipeModal;