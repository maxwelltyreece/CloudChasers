import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCommunity } from '../../contexts/CommunityContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'left',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Montserrat_600SemiBold', 
        color: '#333',
        marginBottom: 20,
    },
    member: {
        fontSize: 18,
        fontFamily: 'Montserrat_600SemiBold', 
        color: '#333',
    },
    memberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    memberIcon: {
        marginLeft: 5,
    },
});

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
