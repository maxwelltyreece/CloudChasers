import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable } from 'react-native';
import proptypes from 'prop-types';

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'flex-end',
        padding: 10,
        width: 150, 
        aspectRatio: 1, 
        margin: 8,
      },

  text: {
    fontSize: 20,
  },
  image: {
    position: 'absolute', // Position image absolute to cover the whole box
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Cover the entire area of the box
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Position the title at the bottom of the box
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
    color: 'white', // Ensure the title is visible on the image
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Optional: Add shadow to text for better readability
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
    height: 400,
  },
  modalImage: {
    width: 250,
    height: 250, 
    resizeMode: 'contain', 
  },
  
});

function RecipeBox({ title, image }) {
  const [modalVisible, setModalVisible] = useState(false);
  const imageUrl = "https://firebasestorage.googleapis.com/v0/b/gobl-b4e3d.appspot.com/o/Recipe_Pictures%2F65fc78d19e672bbcbb30ca4b.jpg?alt=media&token=0d6af43d-3343-49b4-bc5f-abd74f5bca4d";

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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>{title}</Text>
            
            <Image source={{ uri: imageUrl }} style={styles.modalImage} />
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
}


export default RecipeBox;

RecipeBox.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
};
