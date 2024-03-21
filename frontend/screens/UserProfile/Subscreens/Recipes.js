import React, { useState, useEffect } from 'react';
import { View, FlatList, toLowerCase, Text, Pressable } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RecipeBox from '../../../components/RecipeBox';
import { Feather } from '@expo/vector-icons';
// frontend/components/RecipeBox.js
import { styles } from './styles';
import { useFoodLog } from '../../../contexts/FoodLogContext'
import ActionButton from './subscreensComponents/ActionButton.js';
import RecipeModal from './subscreensComponents/RecipeModal.js'; 
import { getPictureURL } from '../../../../backend/controllers/firebaseImageController.js';


function NewRecipeButton({ onPress }) {
    return (
        <View style={{ padding: 10, borderRadius: 50 }}> 
            <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
                <Feather name="plus" size={24} color="black" />
            </Pressable>
        </View>
    );
}

function Recipes() {
    const { getAllUserRecipes } = useFoodLog();
    const [search, setSearch] = useState('');
    const [recipes, setRecipes] = useState([]); 
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const updateSearch = (search) => {
        setSearch(search);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible); 
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            const fetchedRecipes = await getAllUserRecipes();
            
    
            const recipesWithImages = await Promise.all(fetchedRecipes.map(async (recipe) => {
                
                //Line below not working
                console.log('recipeID:', recipe._id);
                const imageUrl = await getPictureURL(recipe._id, "Recipe_Pictures"); 
                console.log('imageUrl:', imageUrl);
                return {
                    ...recipe,
                    image: imageUrl,
                };
            }));
    
            setRecipes(recipesWithImages);
        };
    
        fetchRecipes();
    }, [getAllUserRecipes]);
    

	const filteredRecipes = recipes.filter(recipe =>
		recipe.title && recipe.title.toLowerCase().includes(search.toLowerCase())
	);
    

    const toggleRecipeModal = () => {
        setIsModalVisible(!isModalVisible);
    };


    

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <SearchBar
            placeholder="Search..."
            onChangeText={updateSearch}
            value={search}
            inputStyle={styles.searchInput}
            inputContainerStyle={{
              backgroundColor: "transparent",
              borderBottomWidth: 0,
              borderTopWidth: 0,
            }}
            containerStyle={{
              flex: 1,
              backgroundColor: "transparent",
              borderBottomWidth: 0,
              borderTopWidth: 0,
              shadowColor: "transparent",
            }}
          />
          <NewRecipeButton onPress={toggleRecipeModal} />
        </View>

        {filteredRecipes.length > 0 ? (
    <FlatList
        data={filteredRecipes}
        renderItem={({ item }) => (
            <RecipeBox
                title={item.name}
                image={item.image}
                style={styles.box}
            />
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        style={styles.list}
    />
) : (
    <Text style={styles.noRecipesText}>No recipes currently</Text>
)}


       
        <RecipeModal 
            isVisible={isModalVisible} 
            onClose={toggleRecipeModal} />
      </View>
    );
}

export default Recipes;