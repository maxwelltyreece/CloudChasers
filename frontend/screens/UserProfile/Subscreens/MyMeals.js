import React, {useState} from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RecipeBox from '../../../components/RecipeBox';
import ActionButton from './subscreensComponents/ActionButton.js';

const recipes = [
  // Your recipes
];

function MyMeals() {
  const [search, setSearch] = useState('');
  
  const updateSearch = (search) => {
    setSearch(search);
  };
  
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  const handlePress = () => {
    console.log("ActionButton clicked!");
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

      <ActionButton
        buttonColor="blue"
        onPress={handlePress}
      />
    </View>
  );
}

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
  searchInput: {
    fontFamily: 'Montserrat_600SemiBold',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    showCancel: true,
    padding: 10,
    borderRadius: 10,
  },
  titleContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: '5%',
  },
  noRecipesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default MyMeals;
