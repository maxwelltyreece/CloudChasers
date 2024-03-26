import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RecipeBox from '../../../components/RecipeBox/RecipeBox';
import { styles } from './styles';
import { useCommunity } from '../../../contexts/CommunityContext';

function GroupRecipes({ route }) {
	const { community } = route.params;
	const { getCommunityRecipes } = useCommunity();
	const [search, setSearch] = useState('');
	const [recipes, setRecipes] = useState([]); 

	const updateSearch = (search) => {
		setSearch(search);
	};

	useEffect(() => {
		const fetchRecipes = async () => {
			const fetchedRecipes = await getCommunityRecipes(community.id);
			// console.log("ID: ", community.id);
			// console.log('Fetched recipes:', fetchedRecipes);
        
			if (Array.isArray(fetchedRecipes.data)) {
				const mappedRecipes = fetchedRecipes.data.map(recipe => ({
					id: recipe._id,
					title: recipe.name,
					image: recipe.image,
				}));
            
				setRecipes(mappedRecipes);
			} else {
				console.error('fetchedRecipes.data is not an array:', fetchedRecipes.data);
			}
		};

		fetchRecipes();
	}, [getCommunityRecipes, community.id]);

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
				<Text style={styles.noRecipesText}>This group currently has no recipes</Text>
			)}
		</View>
	);
}
export default GroupRecipes;