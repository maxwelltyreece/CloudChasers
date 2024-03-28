import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import RecipeBox from '../../../components/RecipeBox/RecipeBox';
import { styles } from './styles';
import { useCommunity } from '../../../contexts/CommunityContext';

/**
 * GroupRecipes component
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.route - The route object
 * @param {Object} props.route.params - The route parameters
 * @param {Object} props.route.params.community - The community data
 * @returns {JSX.Element} The GroupRecipes component
 */
function GroupRecipes({ route }) {
	const { community } = route.params;
	const { getCommunityRecipes } = useCommunity();
	const [search, setSearch] = useState('');
	const [recipes, setRecipes] = useState([]); 
    
    /**
     * Update the search state
     * @param {string} search - The search string
     */
	const updateSearch = (search) => {
		setSearch(search);
	};

	useEffect(() => {
         /**
         * Fetch the recipes for the community
         */
		const fetchRecipes = async () => {
			const fetchedRecipes = await getCommunityRecipes(community.id);
        
			if (Array.isArray(fetchedRecipes.data)) {
				const mappedRecipes = fetchedRecipes.data.map(recipe => ({
					id: recipe._id,
					title: recipe.name,
                    description: recipe.description,
				}));
            
				setRecipes(mappedRecipes);
			} else {
				console.error('fetchedRecipes.data is not an array:', fetchedRecipes.data);
			}
		};

		fetchRecipes();
	}, [getCommunityRecipes, community.id]);
    
    // Filter the recipes based on the search string
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
                    renderItem={({ item }) => <RecipeBox id={item.id} title={item.title} description={item.description} style={styles.box} />}
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