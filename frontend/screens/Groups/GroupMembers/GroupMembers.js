import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useCommunity } from '../../../contexts/CommunityContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { styles } from './styles';

const ICON_SIZE = 20;

function ItemSeparator() {
	return <View style={styles.separator} />;
}

function MemberItem({ item }) {
	return (
		<View style={styles.memberContainer}>
			<View style={styles.iconAndName}>
				<Icon name={item.role === 'admin' ? "crown" : "user"} size={ICON_SIZE} style={styles.memberIcon} />
				<Text style={styles.member}>{item.username}</Text>
			</View>
		</View>
	);
}

const keyExtractor = (item) => item.username;

function GroupMembers({ route }) {
	const { community } = route.params;
	const { getCommunityMembers } = useCommunity();
	const [members, setMembers] = useState([]);

	useEffect(() => {
		const fetchMembers = async () => {
			// console.log('Fetching members for community:');
			const membersData = await getCommunityMembers(community.id);
			// console.log('Members:', membersData);
			setMembers(membersData.data);
		};

		fetchMembers();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={members}
				renderItem={({ item }) => <MemberItem item={item} />}
				keyExtractor={keyExtractor}
				ItemSeparatorComponent={ItemSeparator}
			/>
		</View>
	);
}

export default GroupMembers;

MemberItem.PropTypes = {
	item: PropTypes.shape({
		username: PropTypes.string,
		role: PropTypes.string,
	}).isRequired,
};

GroupMembers.PropTypes = {
	route: PropTypes.object.isRequired,
};