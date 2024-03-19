import React, { useState } from 'react';
import { KeyboardAvoidingView, View, TextInput, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#E8E8E8', // change the border color to a lighter shade
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        fontFamily: 'Montserrat_600SemiBold',
        backgroundColor: '#F8F8F8', // add a light background color
    },
    messageInput: {
        height: 200,
        borderColor: '#E8E8E8', // change the border color to a lighter shade
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        fontFamily: 'Montserrat_600SemiBold',
        backgroundColor: '#F8F8F8', // add a light background color
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#FF815E',
        borderRadius: 25,
        marginTop: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
    },
    tabButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderColor: 'gray',
        borderRightWidth: 1,
        borderRadius: 0,
    },
    activeTab: {
        color: '#FF815E',
    },
    tabText: {
        paddingLeft: 10,
        color: '#6B6868',
        fontSize: 14,
        fontFamily: 'Montserrat_700Bold',
    },
});


// eslint-disable-next-line no-unused-vars
function NewPostPage({ navigation, communityId }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tab, setTab] = useState('message');

    const handlePost = () => {
        navigation.goBack();
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
    communityId: PropTypes.number.isRequired,
};