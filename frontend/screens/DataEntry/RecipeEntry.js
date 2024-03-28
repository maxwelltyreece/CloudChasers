import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useFoodLog } from '../../contexts/FoodLogContext';
import SelectableRecipe from './DataEntryComponents/SelectableRecipe/SelectableRecipe';
import { styles } from './styles';

const RecipeEntry = () => {
    const { getAllUserRecipes } = useFoodLog();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            const fetchedRecipes = await getAllUserRecipes();
            setRecipes(fetchedRecipes);
        };

        fetchRecipes();
    }, []);

    return (
        recipes.length > 0 ? (
            <FlatList
                data={recipes}
                renderItem={({ item }) => (
                    <SelectableRecipe style={styles.box} key={item._id} id={item._id} title={item.name} />
                )}
                keyExtractor={(item) => item._id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                style={styles.list}
            />
        ) : (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No recipes found. Please add some.</Text>
            </View>
        )
    );
};

export default RecipeEntry;