import React, { useState, useCallback } from 'react';
import {
	View, Text, FlatList, TextInput, TouchableOpacity, Modal, Button
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Box from '../../../components/Box/box';
import { useCommunity } from '../../../contexts/CommunityContext';
import { styles } from './styles';

/**
 * JoinGroup component allows users to join a community.
 * It fetches available communities, filters them based on user's search input,
 * and provides a way to join a selected community.
 * @returns {JSX.Element} The rendered JoinGroup component.
 */
function JoinGroup() {
	const [searchText, setSearchText] = useState('');
	const [availableCommunities, setAvailableCommunities] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedCommunity, setSelectedCommunity] = useState(null);
	const { getAvailableCommunities, joinCommunity, getUserCommunities, getCommunityDetails } = useCommunity();
    
	/**
     * Fetches available communities when the component is focused.
     */
	useFocusEffect(
		useCallback(() => {
			const fetchAvailableCommunities = async () => {
				const communities = await getAvailableCommunities();
				setAvailableCommunities(communities);
			};

			fetchAvailableCommunities();
		}, [getAvailableCommunities])
	);
    
	/**
     * Filters available communities based on user's search input.
     */
	const filteredData = availableCommunities.filter((item) => 
		item.name.toLowerCase().includes(searchText.toLowerCase())
	);

	/**
     * Handles the press event on a community item.
     * Fetches the details of the selected community and opens a modal for joining the community.
     * @param {Object} item - The selected community item.
     */
	const handlePress = async (item) => {
		const response = await getCommunityDetails(item.id);
		setSelectedCommunity(response.data.community);
		setModalVisible(true);
	};

	/**
     * Handles the join event.
     * Joins the selected community, updates the user's communities and the list of available communities,
     * and closes the modal.
     */
	const handleJoin = () => {
		if (!selectedCommunity) {
			console.error('No community selected');
			return;
		}

		const { _id: communityId } = selectedCommunity;
		joinCommunity(communityId)
			.then(() => {
				getUserCommunities();
				setAvailableCommunities(availableCommunities.filter(({ _id }) => _id !== communityId));
				setModalVisible(false);
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
					onChangeText={setSearchText}
					value={searchText}
					placeholder="Search..."
				/>
			</View>
			<FlatList
				data={filteredData}
				renderItem={({ item }) => (
					<View style={styles.itemContainer}>
						<TouchableOpacity
							style={{ flex: 1 }}
							onPress={() => handlePress(item)}
						>
							<Box title={item.name} />
						</TouchableOpacity>
					</View>
				)}
				numColumns={2}
				contentContainerStyle={{
					paddingHorizontal: "2.5%",
				}}
			/>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>
							{selectedCommunity?.joinPrivacy === "private"
								? "Request to join"
								: "Join"}{" "}
							{selectedCommunity?.name}?
						</Text>
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.button} onPress={handleJoin}>
								<Text style={styles.buttonText}>Request to join</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.button}
								onPress={() => setModalVisible(false)}
							>
								<Text style={styles.buttonText}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

export default JoinGroup;