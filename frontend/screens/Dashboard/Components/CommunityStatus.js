/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react';
import {
	View, Text, ScrollView, StyleSheet, Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCommunity } from '../../../contexts/CommunityContext';
import PropTypes from 'prop-types';


const styles = StyleSheet.create({
	container: {
		// backgroundColor: '#EC6641',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '95%',
		height: '20%',
		// marginVertical: '1%',
		// marginBottom: '14%',
		borderRadius: 15,
		padding: 10,
		right: 0,
		// shadowColor: '#000',
		// shadowOffset: { width: 0, height: 1 },
		// shadowOpacity: 0.22,
		// shadowRadius: 2.22,
		// elevation: 3,
		// backgroundColor: 'pink',
	},
	scrollContainer: {
		// if you need to style the scroll view
		// backgroundColor: 'red',
		width: '100%',
	},
	header: {
		fontSize: 22,
		fontWeight: 'bold',
		// marginLeft: 10,
		marginBottom: 12,
	},
	updateContainer: {
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		padding: 10,
		marginRight: 8,
		// marginBottom: 50,
		// width: '18%',
		width: 190,
		// height: '80%',
		// height: 60,
		height: 'auto',
		maxHeight: 70,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
	communityItemHeader: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center',
		marginBottom: 1,
	},
	groupNameSection: {
		justifyContent: 'center',
		alignContent: 'flex-start',
		alignItems: 'flex-start',
		width: '60%',
	},
	postCountSection: {
		flexDirection: 'row',
		alignContent: 'flex-end',
		alignItems: 'flex-end',
		width: '40%',
		backgroundColor: '#F0F0F0',
		borderRadius: 10,
		paddingHorizontal: 5,
		paddingVertical: 2,
		left: 2,
		bottom: 3,
	},
	groupName: {
		fontSize: 16,
		fontWeight: 'bold',
		right: 2,
	},
	postCount: {
		fontSize: 11.5,
		fontWeight: '600',
		
	},
	detailText: {
		fontSize: 12.7,
		// marginBottom: 20,
	},
	noCommunitiesText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#666',
		textAlign: 'center',
	},
});


function CommunityUpdates({ communities }) {
	const navigation = useNavigation();
	const { getCommunityPosts } = useCommunity();
	const [communityPostCounts, setCommunityPostCounts] = useState({});
	const hasCommunities = communities && communities.length > 0;

	useEffect(() => {
		const fetchPostsCounts = async () => {
			const counts = {};
			for (const community of communities) {
				const postsData = await getCommunityPosts(community.id);
				counts[community.id] = postsData.length;
			}
			setCommunityPostCounts(counts);
		};

		if (hasCommunities) {
			fetchPostsCounts();
		}
	}, [communities]);

	const handlePress = (community) => {
		navigation.navigate('Group', { screen: 'GroupPage', params: { community: community } });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Communities</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
				{hasCommunities ? (
					communities.map((community, index) => (
						<Pressable
							key={index}
							onPress={() => handlePress(community)}
							style={styles.updateContainer}
							testID='community-widget'
						>

							<View style={styles.communityItemHeader}>
								<View style={styles.groupNameSection}>
									<Text style={styles.groupName} numberOfLines={1}>{community.name}</Text>
								</View>
								<View style={styles.postCountSection}>
									<Text style={styles.postCount} numberOfLines={1}>Posts: {communityPostCounts[community.id] || 0}</Text>
								</View>
							</View>
							<Text style={styles.detailText} numberOfLines={2}>
								{community.description}
							</Text>

						</Pressable>
					))
				) : (
					// Render a "No communities" message if there are no communities
					<View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
						<Text style={styles.noCommunitiesText}>No communities</Text>
					</View>
				)}
			</ScrollView>
		</View>
	);
}

export default CommunityUpdates;

CommunityUpdates.propTypes = {
	communities: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
	})),
};