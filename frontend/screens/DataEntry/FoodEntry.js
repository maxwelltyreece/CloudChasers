import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styles } from './styles';
import NewFoodModal from '../../components/NewFoodModal';
import { useFoodLog } from '../../contexts/FoodLogContext';

function FoodEntry() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [foods, setFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [weight, setWeight] = useState(''); 
    const [shouldRenderScrollView, setRenderScrollView] = useState(true); // New boolean state
    const { searchFoods, getAllUserRecipes, logDatabaseFood } = useFoodLog(); 

    useEffect(() => {
        if (searchQuery.length >= 3) {
            // Call the function to update the list
            searchFood();
        }
    }, [searchQuery]);

    useEffect(() => {
        // Check if foods array has only one item
        if (foods.length === 1) {
            setRenderScrollView(false);
        } else {
            setRenderScrollView(true);
        }
    }, [foods]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const searchFood = async () => {
        const response = await searchFoods({ name: searchQuery });
        setFoods(response.data.foods);
    };

    const renderItem = (item) => (
        <TouchableOpacity 
            style={styles.item} 
            onPress={() => {
                setSelectedFood(item);
                setSearchQuery(item.name); // Update searchQuery to reflect selected food
            }}
            key={item._id}
        >
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.semiCircle} />
                <View style={{flexDirection: 'row',}}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={text => setSearchQuery(text)}
                    />

                    <TouchableOpacity style={{ ...styles.button, marginLeft: 5, alignSelf: 'flex-start', height: 40, paddingVertical: 8, backgroundColor: '#F0F0F0'}} onPress={toggleModal}>
                        <FontAwesome5 name='plus' color='#c7c7c7' size={20}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.button, marginLeft: 5, alignSelf: 'flex-start', height: 40, paddingVertical: 8, backgroundColor: '#F0F0F0'}}>
                        <FontAwesome5 name='utensils' color='#c7c7c7' size={20}/>
                    </TouchableOpacity>
                </View>
                

                {searchQuery.length >= 3 && shouldRenderScrollView && ( // Render scroll view only if shouldRenderScrollView is true
                    <View style={styles.dropdownContainer}>
                        <ScrollView style={styles.dropdown} maxHeight={200}>
                            {foods.map(renderItem)}
                        </ScrollView>
                    </View>
                )}

                <TextInput 
                    style={{...styles.searchInput, marginTop: 200, width: '100%', marginBottom: 55}}
                    placeholder="Weight..."
                    onChangeText={text => setWeight(text)}
                    keyboardType="numeric"
                />
               
                <View style={styles.buttonContainer}>
                    

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

                <NewFoodModal
                    isVisible={isModalVisible}
                    toggleModal={toggleModal}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default FoodEntry;
