import React, { useState } from 'react';
import { KeyboardAvoidingView, View, TextInput, TouchableOpacity, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { useCommunity } from '../../../contexts/CommunityContext';
import { styles } from './styles';

// eslint-disable-next-line no-unused-vars
function NewPostPage({ navigation, route }) {
	const { makePost } = useCommunity();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [tab, setTab] = useState('message');
	const { communityId } = route.params;
	// console.log("THIS IS ID",communityId);

	const handlePost = async () => {
		const postData = {
			communityId,
			title,
			text: content,
			recipeID: null,
		};
    
		const response = await makePost(postData);
		if (response.success) {
			navigation.goBack();
		} else {
			console.error(response.error);
		}
	};

	return (
		<KeyboardAvoidingView 
			behavior={Platform.OS === "ios" ? "padding" : "height"} 
			style={styles.container}
		>
			<TextInput
				style={styles.input}
				placeholder="Title"
				value={title}
				onChangeText={setTitle}
			/>
			<View style={styles.tabContainer}>
				<TouchableOpacity 
					style={styles.tabButton} 
					onPress={() => setTab('message')}
				>
					<Icon name="font" size={14} color={tab === 'message' ? '#FF815E' : 'gray'} />
					<Text style={[styles.tabText, tab === 'message' && styles.activeTab]}>Message</Text>
				</TouchableOpacity>
				<TouchableOpacity 
					style={styles.tabButton} 
					onPress={() => setTab('recipe')}
				>
					<Icon name="book" size={14} color={tab === 'recipe' ? '#FF815E' : 'gray'} />
					<Text style={[styles.tabText, tab === 'recipe' && styles.activeTab]}>Recipe</Text>
				</TouchableOpacity>
			</View>
			{tab === 'message' ? (
				<TextInput
					style={styles.messageInput}
					placeholder="Message"
					value={content}
					onChangeText={setContent}
					multiline
					blurOnSubmit={true}
				/>
			) : (
				<Text>
                   !TODO: Show Recipes to Post.
				</Text>
			)}
			<TouchableOpacity style={styles.button} onPress={handlePost}>
				<Text style={styles.buttonText}>Post</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
}

export default NewPostPage;

NewPostPage.propTypes = {
	navigation: PropTypes.shape({
		goBack: PropTypes.func.isRequired,
	}).isRequired,
	route: PropTypes.shape({
		params: PropTypes.shape({
			communityId: PropTypes.string.isRequired,
		}),
	}).isRequired,
};