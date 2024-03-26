import React, { useEffect, useState } from 'react';

import {
	View, Text, Pressable, ActivityIndicator,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { KeyboardAvoidingView, Platform, FlatList, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useCommunity } from '../../../contexts/CommunityContext';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';

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

// function generateRandomWord() {
//     const words = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'];
//     return words[Math.floor(Math.random() * words.length)];
// }

// function generateRandomMessage() {
//     const numWords = Math.max(1, Math.floor(Math.random() * Math.random() * 50));
//     let message = '';
//     for (let i = 0; i < numWords; i++) {
//         message += generateRandomWord() + ' ';
//     }
//     return message.trim();
// }

function GroupPage({ route, navigation }) {
	const { community, isAdmin } = route.params;
	const { getCommunityPosts, getPendingRequests, getCommunityDetails } = useCommunity();
	const [messages, setMessages] = useState([]);
	const [requestsCount, setRequestsCount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [newDescription, setNewDescription] = useState('');

	useFocusEffect(
		React.useCallback(() => {
			const fetchRequestsAndPosts = async () => {
				setLoading(true);
				if (isAdmin) {
					const requests = await getPendingRequests(community.id);
					setRequestsCount(requests.data.length);
				}
				const posts = await getCommunityPosts(community.id);
				setMessages(posts);

				// console.log('Community ID:', community.id);
				try {
					const communityDetails = await getCommunityDetails(community.id);
					// console.log('Community details:', communityDetails.data.community);
					setNewDescription(communityDetails.data.community.description);
				} catch (error) {
					console.error('Error fetching community details:', error);
				}

				setLoading(false);
			};

			fetchRequestsAndPosts();

			return () => {
				setMessages([]);
				setNewDescription(''); // Reset the description when the page is left
			};
		}, [community.id, getPendingRequests, getCommunityPosts, isAdmin])
	);

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
					<IconButton iconName="book" onPress={() => navigation.navigate('GroupRecipes', { community })} />
					{isAdmin && (
						<View style={styles.mailButton}>
							<IconButton iconName="mail" onPress={() => navigation.navigate('PendingRequests', { community })} />
							{requestsCount > 0 && (
								<View style={styles.requestsCount}>
									<Text style={styles.requestsCountText}>{requestsCount}</Text>
								</View>
							)}
						</View>
					)}
					<IconButton iconName="settings" onPress={() => navigation.navigate('GroupSettings', { community })} />
					<IconButton iconName="users" onPress={() => navigation.navigate('GroupMembers', { community })} />
				</View>
			),
		});
	}, [navigation, community, isAdmin, requestsCount]);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator testID="loading-indicator" size="large" />
			</View>
		);
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -300}
		>
			<Text style={styles.description}>{newDescription}</Text>
			<View style={styles.divider} />
			<View style={styles.feedContainer}>
				<FlatList
					data={messages.slice().reverse()}
					renderItem={({ item, index }) => (
						<Message key={index} title={item.title} text={item.text} sender={item.username} />
					)}
					keyExtractor={(item, index) => index.toString()}
					contentContainerStyle={styles.feed}
					showsVerticalScrollIndicator={false}
					ListEmptyComponent={<Text style={styles.description}>No posts yet</Text>} // Add this line
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						navigation.navigate('NewPostPage', { communityId: community.id });
					}}                
				>
					<Feather name="plus" size={30} color="white" />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

export default GroupPage;


IconButton.propTypes = {
	iconName: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
};

Message.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	sender: PropTypes.string.isRequired,
};

GroupPage.propTypes = {
	route: PropTypes.shape({
		params: PropTypes.shape({
			community: PropTypes.shape({
				id: PropTypes.string,
				name: PropTypes.string,
				description: PropTypes.string,
			}),
			isAdmin: PropTypes.bool,
			posts: PropTypes.arrayOf(PropTypes.object),
		}),
	}).isRequired,
	navigation: PropTypes.shape({
		setOptions: PropTypes.func.isRequired,
		navigate: PropTypes.func.isRequired,
	}).isRequired,
};

