import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Pressable } from "react-native";
import { SearchBar } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import RecipeBox from "../../../../components/RecipeBox";
import { styles } from "./styles";
import { useFoodLog } from "../../../../contexts/FoodLogContext";
import NewRecipe from "./NewRecipe/NewRecipe";
import { useNavigation } from '@react-navigation/native';


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
  const [search, setSearch] = useState("");
  const { getPictureURL } = useFoodLog();
  const [recipes, setRecipes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    const fetchRecipes = async () => {

      const fetchedRecipes = await getAllUserRecipes();
      console.log("fetchedRecipes:", fetchedRecipes);

      const mappedRecipes = fetchedRecipes.map((recipe) => ({
        id: recipe._id,
        title: recipe.name,
        description: recipe.description,
        image: recipe.image,
      }));
      setRecipes(mappedRecipes);
    };

    fetchRecipes();
  }, [getAllUserRecipes]);


  const filteredRecipes = recipes.filter(
    (recipe) =>
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
       <NewRecipeButton onPress={() => navigation.navigate('NewRecipe')} />

      </View>

      {filteredRecipes.length > 0 ? (
        <FlatList
          data={filteredRecipes}
          renderItem={({ item }) => (
            <RecipeBox
              id = {item.id}
              title={item.title}
              description={item.description}
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
      
    </View>
  );
}
export default Recipes;
