import React, { useState } from 'react';
import { KeyboardAvoidingView, View, TextInput, TouchableOpacity, Text, Platform, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useCommunity } from '../../../contexts/CommunityContext';
import { styles } from './styles';

/**
 * NewPostPage component for creating a new post.
 * @param {Object} props - Component props.
 * @param {Object} props.navigation - Navigation object from react-navigation.
 * @param {Object} props.route - Route object from react-navigation.
 * @returns {JSX.Element} Rendered component.
 */
function NewPostPage({ navigation, route }) {
    const { makePost } = useCommunity();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { communityId } = route.params;

    /**
     * Handles the creation of a new post.
     */
    const handlePost = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Error', 'Cannot post without a title or message.');
            return;
        }

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
            <TextInput
                style={styles.messageInput}
                placeholder="Message"
                value={content}
                onChangeText={setContent}
                multiline
                blurOnSubmit={true}
            />
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