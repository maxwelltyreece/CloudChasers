import React, { useState, useEffect } from 'react';
import { View, FlatList, toLowerCase, Text, Pressable } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RecipeBox from '../../../components/RecipeBox';
import { Feather } from '@expo/vector-icons';
// frontend/components/RecipeBox.js
import { styles } from './styles';
import { useFoodLog } from '../../../contexts/FoodLogContext'
import ActionButton from './subscreensComponents/ActionButton.js';

function NewRecipeButton() {
    return (
        <View style={{ padding: 10, borderRadius: 50 }}> 
        <Pressable onPress={() => console.log('Pressed')} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
            <Feather name="plus" size={24} color="black" />
        </Pressable>
    </View>
    );
}

function Recipes() {
    const { getAllUserRecipes } = useFoodLog();
    const [search, setSearch] = useState('');
    const [recipes, setRecipes] = useState([]); 

    const updateSearch = (search) => {
        setSearch(search);
    };
    useEffect(() => {
		const fetchRecipes = async () => {
			const fetchedRecipes = await getAllUserRecipes();
			console.log('fetchedRecipes:', fetchedRecipes);
		
			const mappedRecipes = fetchedRecipes.map(recipe => ({
				id: recipe._id,
				title: recipe.name,
				image: recipe.image,
			}));
		
			setRecipes(mappedRecipes);
		};
	
		fetchRecipes();
	}, [getAllUserRecipes]);

	const filteredRecipes = recipes.filter(recipe =>
		recipe.title && recipe.title.toLowerCase().includes(search.toLowerCase())
	);

    

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <SearchBar
                    placeholder="Search..."
                    onChangeText={updateSearch}
                    value={search}
                    inputStyle={styles.searchInput}
                    inputContainerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 0,
                        borderTopWidth: 0,
                    }}
                    containerStyle={{
                        backgroundColor: 'transparent',
                        borderBottomWidth: 0,
                        borderTopWidth: 0,
                        shadowColor: 'transparent',
                    }}

                    />
                    <NewRecipeButton/>
            </View>

            {filteredRecipes.length > 0 ? (
                <FlatList
                    data={filteredRecipes}
                    renderItem={({ item }) => <RecipeBox title={item.title} image={item.image} style={styles.box} />}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    style={styles.list}
                />
      ) : (
            <Text style={styles.noRecipesText}>No recipes currently</Text>
      )}

        {/* <ActionButton
            shadow={false}
      /> */}
        </View>
    );
}


export default Recipes;