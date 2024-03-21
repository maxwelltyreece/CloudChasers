import React, { useState, useEffect } from 'react';
import { View, FlatList, toLowerCase } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RecipeBox from '../../../../components/RecipeBox'
import { styles } from './styles';
import { useFoodLog } from '../../../../contexts/FoodLogContext';

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