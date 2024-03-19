import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
//import Box from '../frontend/components/box';
import RecipeBox from '../../../../components/RecipeBox'
import { styles } from './styles';

const recipes = [
	{ id: '1', title: 'Charred Cabbage', image: 'image-url-1' },
	{ id: '2', title: 'Roast Chicken', image: 'image-url-2' },
	{ id: '3', title: 'Pasta with Tomato Sauce', image: 'image-url-3' },
	{ id: '4', title: 'Grilled Salmon', image: 'image-url-4' },
	{ id: '5', title: 'Tofu Stir Fry', image: 'image-url-5' },
	{ id: '6', title: 'Roast Chicken', image: 'image-url-2' },
	{ id: '7', title: 'Pasta with Tomato Sauce', image: 'image-url-3' },
	{ id: '8', title: 'Grilled Salmon', image: 'image-url-4' },
	{ id: '9', title: 'Tofu Stir Fry', image: 'image-url-5' },
	{ id: '9', title: 'Tofu Stir Fry', image: 'image-url-5' },
	{ id: '9', title: 'Tofu Stir Fry', image: 'image-url-5' },
];

function Recipes() {
	const [search, setSearch] = useState('');

	const updateSearch = (search) => {
		setSearch(search);
	};

	const filteredRecipes = recipes.filter(recipe =>
		recipe.title.toLowerCase().includes(search.toLowerCase())
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
