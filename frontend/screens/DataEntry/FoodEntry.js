import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import NewFoodModal from '../../components/NewFoodModal';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, 
        paddingHorizontal: 20,
        backgroundColor: '#F0F0F0',
        paddingVertical: 25,
        paddingTop: 100,
    },

    label: {
        marginBottom: 5,
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#FF815E',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
    },
    searchInput: {
        fontFamily: 'Montserrat_600SemiBold',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        marginBottom: 20,
        borderRadius: 10,
    
    },
    buttonContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    
    },
});



function FoodEntry() {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

  return (
    <View style={styles.container}>
        <TextInput
            style={styles.searchInput}
            
            placeholder="Search..."
        />

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
                <Text style={styles.buttonText}>New Food</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>   

        </View>

        <NewFoodModal
            isVisible={isModalVisible}
            toggleModal={toggleModal}
            

        />
      
    </View>
  );
}

export default FoodEntry;
