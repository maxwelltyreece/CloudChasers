import React, { useEffect, useState } from 'react';
import {
	View, Text, StyleSheet, Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { KeyboardAvoidingView, Platform, ScrollView, FlatList, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	description: {
		fontFamily: 'Montserrat_600SemiBold',
        color: '#6B6868',
		fontSize: 16,
		textAlign: 'left',
	},
	headerButton: {
		flexDirection: 'row',
		marginRight: 16,
	},
	iconButton: {
		marginRight: 8,
	},
	feedContainer: {
		flex: 1,
		justifyContent: 'space-between',
        width: '100%',
	},
	feed: {
		flexDirection: 'column',
		alignItems: 'stretch',
		flexGrow: '1',
		width: '100%',
        paddingTop: 20,
	},
	divider: {
		height: 2,
		backgroundColor: 'lightgrey',
		marginTop: 10,
		borderRadius: 20,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		marginVertical: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		paddingLeft: 20,
		paddingRight: 12,
	},
	input: {
		backgroundColor: null,
		flex: 1,
		height: 40,
		fontFamily: 'Montserrat_600SemiBold',
	},
    messageContainer: {
        flexDirection: 'column',
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        paddingBottom: 20,
    },
    title: {
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 2,
    },
    sender: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 12,
        marginBottom: 8,
        color: 'darkgrey',
    },

    messageText: {
        fontFamily: 'Montserrat_500Medium',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#FF815E',
        borderRadius: 35,
        position: 'absolute',
        bottom: 10,
        right: 0,
    },
});

const IconButton = ({ iconName, onPress }) => (
	<Pressable 
	  style={({ pressed }) => [
		styles.iconButton,
		{
		  opacity: pressed ? 0.5 : 1,
		},
	  ]}
	  onPress={onPress}
	>
	  <Feather name={iconName} size={24} color="black" />
	</Pressable>
  );
  
    const Message = ({ title, text, sender }) => (
        <View style={styles.messageContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.sender}>{sender}</Text>
            <Text style={styles.messageText}>{text}</Text>
        </View>
    );

    function generateRandomMessage() {
        const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
        const numWords = Math.floor(Math.random() * (words.length * 10)); // Generate a random number between 1 and the number of words
        let message = '';
        for (let i = 0; i < numWords; i++) {
            message += words[Math.floor(Math.random() * words.length)] + ' '; // Add a random word to the message
        }
        return message.trim(); // Remove the trailing space
    }

    function GroupPage({ route, navigation }) {
	    const { community } = route.params; // Get the community data from the route params
        const [messages, setMessages] = useState([
            { title: 'Title 1', text: generateRandomMessage(), sender: '@User1' },
            { title: 'Title 2', text: generateRandomMessage(), sender: '@User2' },
            { title: 'Title 3', text: generateRandomMessage(), sender: '@User3' },
            { title: 'Title 4', text: generateRandomMessage(), sender: '@User4' },
            { title: 'Title 5', text: generateRandomMessage(), sender: '@User5' },
            { title: 'Title 6', text: generateRandomMessage(), sender: '@User6' },
            { title: 'Title 7', text: generateRandomMessage(), sender: '@User7' },
        ]);
	    const [input, setInput] = useState('');

	useEffect(() => {
		navigation.setOptions({
			title: community.name,
			headerTitleStyle: {
				fontFamily: 'Montserrat_700Bold',
				fontSize: 18,
			},
			headerTitleAlign: 'left',
			headerRight: () => (
				<View style={styles.headerButton}>
					<IconButton iconName="book" onPress={() => navigation.navigate('GroupSettings', { community })} />
					<IconButton iconName="settings" onPress={() => navigation.navigate('GroupSettings', { community })} />
					<IconButton iconName="users" onPress={() => navigation.navigate('GroupMembers', { community })} />
				</View>
			),
		});
	}, [navigation, community]);

	return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -300}
        >
            <Text style={styles.description}>{community.description}</Text>
            <View style={styles.divider} />
            <View style={styles.feedContainer}>
                <FlatList
                    data={messages.slice().reverse()}
                    renderItem={({ item, index }) => (
                        <Message key={index} title={item.title} text={item.text} sender={item.sender} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.feed}
                    showsVerticalScrollIndicator={false}
                />
                {/* <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Message..."
                        value={input}
                        onChangeText={text => setInput(text)}
                    />
                    <IconButton 
                        iconName="send" 
                        onPress={() => {
                            setMessages([...messages, { text: input }]);
                            setInput('');
                        }} 
                    />
                </View> */}
                <TouchableOpacity style={styles.button} onPress={() => console.log("BUTTON PRESSED")}>
                    <Feather name="plus" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default GroupPage;
