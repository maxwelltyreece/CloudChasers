import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCommunity } from '../../contexts/CommunityContext';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		alignItems: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	member: {
		fontSize: 18,
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
			<Text style={styles.title}>
				GroupMembers of

				{community.name}
			</Text>
			{members.map((member, index) => (
				<Text key={index} style={styles.member}>
					{member.username}
				</Text>
			))}
		</View>
	);
}

export default GroupMembers;
