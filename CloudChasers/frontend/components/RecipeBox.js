import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Modal, Pressable } from 'react-native';

const styles = StyleSheet.create({
    box: {
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'flex-end',
        padding: 10,
        width: '48%', 
        aspectRatio: 1, 
        margin: 8,
        },
        
    text: {
    fontSize: 20,
    },
    image: {
        width: '70%',
        height: '70%',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 16,
        fontFamily: 'Montserrat_700Bold',
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
  
});

function RecipeBox({ title, image }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.box}>
      <Pressable onPress={() => setModalVisible(true)}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Text style={styles.title}>{title}</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.text}>{title}</Text>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.text}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default RecipeBox;