/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useCallback, useState } from 'react';
import {
	View, Text, ScrollView, Pressable
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useCommunity } from '../../../../contexts/CommunityContext';
import PropTypes from 'prop-types';
import { styles } from './styles';


/**
 * A component that displays updates from communities.
 * @param {Object} props - The component's props.
 * @param {Array} props.communities - The communities to display updates from.
 * @returns {JSX.Element} - The rendered component.
 */
function CommunityUpdates({ communities }) {
	const navigation = useNavigation();
	const { getCommunityPosts } = useCommunity();
	const [communityPostCounts, setCommunityPostCounts] = useState({});
	const hasCommunities = communities && communities.length > 0;
    /**
     * Fetches the number of posts in each community and stores them in state.
     */
	const fetchPostsCounts = async () => {
		const counts = {};
		for (const community of communities) {
			const postsData = await getCommunityPosts(community.id);
			counts[community.id] = postsData.length;
		}
		setCommunityPostCounts(counts);
	};


	useFocusEffect(
		useCallback(() => {
			if (hasCommunities) {
				fetchPostsCounts();
			}
		}, [communities])
	);

    /**
     * Handles the press event on a community.
     * @param {Object} community - The community that was pressed.
     */
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

CommunityUpdates.PropTypes = {
	communities: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
	})),
};