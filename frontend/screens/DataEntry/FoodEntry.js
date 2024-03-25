import React, { useState, useEffect } from 'react';
import { Alert, View, Text, TextInput, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { styles } from './styles';
import NewFoodModal from '../../components/NewFoodModal';
import { useFoodLog } from '../../contexts/FoodLogContext';
import { useNavigation } from '@react-navigation/native';

function FoodEntry() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [foods, setFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState(null);
    const [weight, setWeight] = useState(''); 
    const [shouldRenderScrollView, setRenderScrollView] = useState(true);
    const { searchFoods, getAllUserRecipes, logDatabaseFood } = useFoodLog();
    const [mealName, setMealName] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        if (searchQuery.length >= 3) {
            searchFood();
        }
    }, [searchQuery]);

    useEffect(() => {
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
                setSearchQuery(item.name);
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
                {searchQuery.length >= 3 && shouldRenderScrollView && (
                    <View style={styles.dropdownContainer}>
                        <ScrollView style={styles.dropdown} maxHeight={200}>
                            {foods.map(renderItem)}
                        </ScrollView>
                    </View>
                )}
                <TextInput 
                    style={{...styles.searchInput, marginTop: 150, width: '100%'}}
                    placeholder="Meal Name..."
                    onChangeText={text => setMealName(text)}
                />
                <TextInput 
                    style={{...styles.searchInput, marginTop: 10, width: '100%', marginBottom: 20}}
                    placeholder="Weight in grams..."
                    onChangeText={text => setWeight(text)}
                    keyboardType="numeric"
                    value={weight}
                    returnKeyType='done'
                />
               
                <View style={styles.buttonContainer}>
                    

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={async () => {
                        if (!selectedFood || !weight || !mealName) { 
                            Alert.alert('Error', 'Please fill in all fields');
                            return;
                        }
                        await logDatabaseFood({
                            mealType: mealName,
                            foodID: selectedFood._id,
                            weight: parseInt(weight, 10)
                        });
                        Alert.alert(
                            'Food Logged',
                            'Want to add more?',
                            [
                                {
                                    text: 'Yes', 
                                    onPress: () => {
                                        setSelectedFood(null);
                                        setWeight('');
                                        setSearchQuery('');
                                    }
                                },
                                {
                                    text: 'No', 
                                    onPress: () => {
                                        setSelectedFood(null);
                                        setWeight('');
                                        setSearchQuery('');
                                        navigation.goBack();
                                    }
                                },
                            ],
                            {cancelable: false},
                        );
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
