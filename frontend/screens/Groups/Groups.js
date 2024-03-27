import React, { useState, useEffect } from 'react';
import {
	View, Text, FlatList, TextInput, TouchableOpacity, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Box from '../../components/Box/box';
import { useCommunity } from '../../contexts/CommunityContext';
import { styles } from './styles';

function Groups() {
	const [searchText, setSearchText] = useState('');
	const navigation = useNavigation();
	const { userCommunities, getUserRole, getCommunityPosts } = useCommunity();

	function NewGroupButton() {
		return (
			<Pressable onPress={() => navigation.navigate('Group', { screen: 'NewGroup' })}>
				<Feather name="plus" size={24} color="black" />
			</Pressable>
		);
	}

	function JoinGroupButton() {
		return (
			<Pressable onPress={() => navigation.navigate('Group', { screen: 'JoinGroup' })}>
				<Feather name="users" size={24} color="black" />
			</Pressable>
		);
	}

	// eslint-disable-next-line max-len
	const filteredData = (userCommunities || []).filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

	const handlePress = async (item) => {
		const role = await getUserRole(item.id);
		const isAdmin = role === 'admin';
		navigation.navigate('Group', { screen: 'GroupPage', params: { community: item, isAdmin } });
	};
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<View style={{ ...styles.titleContainer, flexDirection: 'row', justifyContent: 'space-between' }}>
					<Text style={styles.title}>Your communities</Text>
					<NewGroupButton />
					<JoinGroupButton />
				</View>
				<TextInput
					style={styles.searchInput}
					onChangeText={(text) => setSearchText(text)}
					value={searchText}
					placeholder="Search..."
				/>
			</View>
			{filteredData.length > 0 ? (
				<FlatList
					data={filteredData}
					renderItem={({ item }) => (
						<View style={styles.itemContainer}>
							<TouchableOpacity style={{ flex: 1 }} onPress={() => handlePress(item)}>
								<Box title={item.name} />
							</TouchableOpacity>
						</View>
					)}
					numColumns={2} // Two items per row
					contentContainerStyle={{
						paddingHorizontal: '2.5%', // Offset the item margin
					}}
				/>
			) : (
				<View style={styles.noCommunitiesContainer}>
					<Text style={styles.noCommunitiesTitle}>You are in no communities</Text>
					<Pressable onPress={() => navigation.navigate('Group', { screen: 'JoinGroup' })}>
						<Text style={styles.linkText}>Join your first here</Text>
					</Pressable>
					<Text style={styles.noCommunitiesText}>or</Text>
					<Pressable onPress={() => navigation.navigate('Group', { screen: 'NewGroup' })}>
						<Text style={styles.linkText}>Create your own</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
}

export default Groups;
