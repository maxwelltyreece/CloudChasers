import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import NewFoodModal from '../../components/NewFoodModal';
import { styles } from './styles';
import { useFoodLog } from '../../contexts/FoodLogContext';

function FoodEntry() {
    const [isModalVisible, setModalVisible] = useState(false);
    const { getFood, getAllUserRecipes } = useFoodLog();

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

            <TouchableOpacity style={styles.button} onPress={async () => {
                const recipes = await getAllUserRecipes();
                console.log(recipes);
            }}>
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
