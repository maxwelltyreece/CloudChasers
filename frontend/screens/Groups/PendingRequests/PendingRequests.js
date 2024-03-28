import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useCommunity } from '../../../contexts/CommunityContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './styles';

/**
 * PendingRequests component
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.route - The route object
 * @param {Object} props.route.params - The route parameters
 * @param {Object} props.route.params.community - The community data
 * @returns {JSX.Element} The PendingRequests component
 */
function PendingRequests({ route }) {
	const { community } = route.params;
	const { getPendingRequests, acceptRequest, denyRequest } = useCommunity();
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		const fetchRequests = async () => {
			const response = await getPendingRequests(community.id);
			setRequests(response.data);
		};

		fetchRequests();
	}, [community.id, getPendingRequests]);

	const handleAccept = async (requestId) => {
		await acceptRequest(requestId);
		const updatedRequests = await getPendingRequests(community.id);
		setRequests(updatedRequests);
	};

	const handleDeny = async (requestId) => {
		await denyRequest(requestId);
		const updatedRequests = await getPendingRequests(community.id);
		setRequests(updatedRequests.data);
	};

	return (
		<View>
			{requests.length === 0 ? (
				<Text style={styles.noRequests}>No pending requests</Text>
			) : (
				<FlatList
					data={requests}
					renderItem={({ item }) => (
						<View style={styles.container}>
							<Text style={styles.username}>{item.username}</Text>
							<View style={styles.buttonContainer}>
								<View style={styles.button}>
									<TouchableOpacity onPress={() => handleAccept(item._id)}>
										<View style={styles.iconContainer}>
											<Icon name="check" size={30} color="#FF815E" />
										</View>
									</TouchableOpacity>
								</View>
								<View style={styles.button}>
									<TouchableOpacity onPress={() => handleDeny(item._id)}>
										<View style={styles.iconContainer}>
											<Icon name="times" size={30} color="#6B6868" />
										</View>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					)}
					keyExtractor={(item) => item._id}
				/>
			)}
		</View>
	);
}

export default PendingRequests;
