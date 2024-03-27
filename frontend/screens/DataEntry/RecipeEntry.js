import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFoodLog } from '../../contexts/FoodLogContext';
import SelectableRecipe from './DataEntryComponents/SelectableRecipe/SelectableRecipe';
import { getImageLink } from '../../services/ImageService';

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
            <View style={styles.container}>
                <Text>No recipes found. Please add some.</Text>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        paddingHorizontal: 5,
    },
    list: {
        flex: 1,
    },
    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    box: {
        width: '45%',
        aspectRatio: 1,
        margin: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Montserrat_600SemiBold',
        color: '#333',
    },
});

export default RecipeEntry;