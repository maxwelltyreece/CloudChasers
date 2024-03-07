import React, { useState } from 'react';
import {
	View, Text, TextInput, Pressable, StyleSheet,
} from 'react-native';
import { useCommunity } from '../../contexts/CommunityContext';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 10,
		marginBottom: 20,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	checkbox: {
		height: 20,
		width: 20,
		borderRadius: 3,
		borderWidth: 2,
		borderColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
	},
	checkboxIndicator: {
		height: 12,
		width: 12,
		backgroundColor: '#000',
	},
	buttonContainer: {
		marginTop: 20,
		padding: 10,
		backgroundColor: '#007BFF',
		alignItems: 'center',
		borderRadius: 5,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
	},
});

function CustomCheckbox({ label, isChecked, onCheck }) {
	return (
		<Pressable onPress={onCheck} style={styles.checkboxContainer}>
			<View style={styles.checkbox}>
				{isChecked && <View style={styles.checkboxIndicator} />}
			</View>
			<Text>{label}</Text>
		</Pressable>
	);
}

function NewGroup() {
	const [communityName, setCommunityName] = useState('');
	const [communityDescription, setCommunityDescription] = useState('');
	const [isPrivateCommunity, setIsPrivateCommunity] = useState(false);
	const [areRecipesPrivate, setAreRecipesPrivate] = useState(false);

	const { createCommunity } = useCommunity();

	const handleButtonPress = async () => {
		const communityData = {
			name: communityName,
			description: communityDescription,
			joinPrivacy: isPrivateCommunity ? 'private' : 'public',
			recipePrivacy: areRecipesPrivate ? 'private' : 'public',
		};
		await createCommunity(communityData);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Create New Community</Text>
			<TextInput
				style={styles.input}
				placeholder="Community Name"
				value={communityName}
				onChangeText={setCommunityName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Community Description"
				value={communityDescription}
				onChangeText={setCommunityDescription}
			/>
			<CustomCheckbox
				label="Private Community"
				isChecked={isPrivateCommunity}
				onCheck={() => setIsPrivateCommunity(!isPrivateCommunity)}
			/>
			<CustomCheckbox
				label="Make Recipes Private"
				isChecked={areRecipesPrivate}
				onCheck={() => setAreRecipesPrivate(!areRecipesPrivate)}
			/>
			<Pressable style={styles.buttonContainer} onPress={handleButtonPress}>
				<Text style={styles.buttonText}>Submit</Text>
			</Pressable>
		</View>
	);
}

export default NewGroup;
