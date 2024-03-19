import React, { useState } from 'react';
import { View, Text, StyleSheet,Alert, Modal, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


const RecipeModal = ({ isVisible, onClose }) => {
   const [image, setImage] = useState(null);
   const [recipeName, setRecipeName] = useState('');
   const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });

    if (!result.cancelled) {
        setImage(result.uri);
    }
    }   

    const handleSubmit = () => {
        if (!recipeName.trim()) {
          Alert.alert('Error', 'Recipe name is required');
          return;
        }
        onClose();
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
                      <TouchableOpacity
                          style={styles.closeButton}
                          onPress={onClose}
                        >
                          <Text style={styles.closeButtonText}>X</Text>
                      </TouchableOpacity>
                        <Text style={styles.modalText}>Add New Recipe</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Name of Recipe"
                            onChangeText={text => setRecipeName(text)}
                            value={recipeName}
                        />

                        <TextInput
                            style={[styles.input, styles.inputDescription]}
                            placeholder="Description"
                            multiline={true}
                            // onChangeText={onChangeRecipeDescription}
                            // value={recipeDescription}
                        />
                        <View style={[styles.button]}>
                            <Button title="Pick Recipe Image" onPress={pickImage}/>
                            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
  backgroundColor: 'lightgrey', 
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