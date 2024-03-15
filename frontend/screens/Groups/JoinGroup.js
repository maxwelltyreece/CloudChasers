import React, { useState } from 'react';

import {
	View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
/* eslint-disable no-unused-vars */
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Box from '../../components/box';
import { useCommunity } from '../../contexts/CommunityContext';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
	},
	titleContainer: {
		alignSelf: 'stretch',
		paddingHorizontal: '5%',
	},
	title: {
		fontFamily: 'Montserrat_700Bold',
		fontSize: 24,
		marginBottom: 20,
	},
	searchInput: {
		fontFamily: 'Montserrat_600SemiBold',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		paddingLeft: 10,
		marginBottom: 20,
		borderRadius: 10,
	},
	itemContainer: {
		flex: 1,
		maxWidth: '50%',
		aspectRatio: 1,
		margin: '2.5%',
	},
});

function JoinGroup() {
	const [searchText, setSearchText] = useState('');
	const [availableCommunities, setAvailableCommunities] = useState([]);
	const navigation = useNavigation();
	const { getAvailableCommunities, joinCommunity, getUserCommunities } = useCommunity();
	useFocusEffect(
        React.useCallback(() => {
            const fetchAvailableCommunities = async () => {
                const communities = await getAvailableCommunities();
                setAvailableCommunities(communities);
            };

            fetchAvailableCommunities();
        }, [])
    );

	// eslint-disable-next-line max-len
	const filteredData = availableCommunities.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));

	const handlePress = (item) => {
		console.log('Joining community: ', item.name);
		const communityId = item.id;
		console.log('Community ID: ', communityId);
		joinCommunity(communityId)
			.then(() => {
				getUserCommunities();
				// eslint-disable-next-line max-len
				setAvailableCommunities(availableCommunities.filter((community) => community.id !== communityId));
			})
			.catch((error) => {
				console.error('Error joining community: ', error);
			});
	};

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Join a community</Text>
				<TextInput
					style={styles.searchInput}
					onChangeText={(text) => setSearchText(text)}
					value={searchText}
					placeholder="Search..."
				/>
			</View>
			<FlatList
				data={filteredData}
				renderItem={({ item }) => (
					<View style={styles.itemContainer}>
						<TouchableOpacity style={{ flex: 1 }} onPress={() => handlePress(item)}>
							<Box title={item.name} />
						</TouchableOpacity>
					</View>
				)}
				numColumns={2}
				contentContainerStyle={{
					paddingHorizontal: '2.5%',
				}}
			/>
		</View>
	);
}

export default JoinGroup;
