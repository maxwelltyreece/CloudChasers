import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useCommunity } from '../../../contexts/CommunityContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types'; // Import PropTypes
import { styles } from './styles';

function GroupMembers({ route }) {
	const { community } = route.params;
	const { getCommunityMembers } = useCommunity();
	const [members, setMembers] = useState([]);
	console.log(community);

	useEffect(() => {
		const fetchMembers = async () => {
			console.log(community.id);
			const membersData = await getCommunityMembers(community.id);
			setMembers(membersData.data);
		};

		fetchMembers();
	}, []);

	return (
        <View style={styles.container}>
            {members.map((member, index) => (
                console.log(member),
                <View key={index} style={styles.memberContainer}>
                    <Text style={styles.member}>
                        {member.username}
                    </Text>
                    {member.role === 'admin' && (
                        <Icon name="crown" size={20} style={styles.memberIcon} />
                    )}
                </View>
            ))}
        </View>
    );
}

export default GroupMembers;

GroupMembers.propTypes = {
    route: PropTypes.object.isRequired,
};