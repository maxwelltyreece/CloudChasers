import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useCommunity } from '../../../contexts/CommunityContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { styles } from './styles';

const ICON_SIZE = 20;

/**
 * ItemSeparator component
 * @returns {JSX.Element} The ItemSeparator component
 */
function ItemSeparator() {
	return <View style={styles.separator} />;
}

/**
 * MemberItem component
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.item - The item data
 * @param {string} props.item.username - The username of the member
 * @param {string} props.item.role - The role of the member
 * @returns {JSX.Element} The MemberItem component
 */
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

/**
 * Key extractor function for the FlatList
 * @param {Object} item - The item data
 * @returns {string} The key for the item
 */
const keyExtractor = (item) => item.username;

/**
 * GroupMembers component
 * @param {Object} props - The properties passed to the component
 * @param {Object} props.route - The route object
 * @param {Object} props.route.params - The route parameters
 * @param {Object} props.route.params.community - The community data
 * @returns {JSX.Element} The GroupMembers component
 */
function GroupMembers({ route }) {
	const { community } = route.params;
	const { getCommunityMembers } = useCommunity();
	const [members, setMembers] = useState([]);

	useEffect(() => {
        /**
         * Fetch the members for the community
         */
		const fetchMembers = async () => {
			const membersData = await getCommunityMembers(community.id);
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

MemberItem.propTypes = {
	item: PropTypes.shape({
		username: PropTypes.string,
		role: PropTypes.string,
	}).isRequired,
};

GroupMembers.propTypes = {
	route: PropTypes.object.isRequired,
};