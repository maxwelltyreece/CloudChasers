import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import NewFoodModal from '../../components/NewFoodModal';
import { styles } from './styles';
import { useFoodLog } from '../../contexts/FoodLogContext';

function FoodEntry() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [foods, setFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [weight, setWeight] = useState(''); // New state for the weight
    const { searchFoods, getAllUserRecipes, logDatabaseFood } = useFoodLog(); // Add logDatabaseFood to the context

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const searchFood = async () => {
        setFoods([]);
        const response = await searchFoods({ name: searchQuery });
        setFoods(response.data.foods);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={[styles.item, selectedFood && item.name === selectedFood.name ? styles.selectedItem : {}]} 
            onPress={() => setSelectedFood(item)}
        >
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                onChangeText={text => setSearchQuery(text)}
            />

            <TextInput // New TextInput for the weight entry
                style={styles.searchInput}
                placeholder="Weight..."
                onChangeText={text => setWeight(text)}
                keyboardType="numeric" // Ensure the user can only enter numbers
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleModal}>
                    <Text style={styles.buttonText}>New Food</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={searchFood}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={async () => {
                        if (selectedFood && weight) { // Check if selectedFood and weight are not null
                            await logDatabaseFood({
                                mealType: 'lunch',
                                foodID: selectedFood._id,
                                weight: parseInt(weight, 10)
                            });
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={foods}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />

            <NewFoodModal
                isVisible={isModalVisible}
                toggleModal={toggleModal}
            />
        </View>
    );
}

export default FoodEntry;