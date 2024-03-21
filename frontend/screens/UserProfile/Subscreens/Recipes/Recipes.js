import React, { useState, useEffect } from 'react';
import { View, FlatList, toLowerCase } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RecipeBox from '../../../../components/RecipeBox'
import { styles } from './styles';
import { useFoodLog } from '../../../../contexts/FoodLogContext';

function Recipes() {
    const { getAllUserRecipes } = useFoodLog();
    const [search, setSearch] = useState('');
    const { getPictureURL } = useFoodLog();
    const [recipes, setRecipes] = useState([]); 

    const updateSearch = (search) => {
        setSearch(search);
    };
    useEffect(() => {
        const fetchRecipes = async () => {
            const fetchedRecipes = await getAllUserRecipes();
            
    
            const recipesWithImages = await Promise.all(fetchedRecipes.map(async (recipe) => {
                //Line below not working
                console.log('THISrecipeID:', recipe._id);
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
            </View>

            <FlatList
                data={filteredRecipes}
                renderItem={({ item }) => <RecipeBox title={item.title} image={item.image} style={styles.box} />}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                style={styles.list}
            />
        </View>
    );
}
export default Recipes;