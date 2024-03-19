/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import {
	View, Text, ScrollView, StyleSheet,
} from 'react-native';
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
		width: 180,
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
	groupName: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 1,
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


// const fakeCommunities = [
// 	{ groupName: 'Pasta Lovers', description: 'A community for pasta enthusiasts' },
// 	{ groupName: 'Meat Meat Meat', description: 'A community for meat lovers' },
// 	{ groupName: 'Health Gurus', description: 'A community for health and wellness' },
// 	{ groupName: 'Veggie Heads', description: 'A community for vegetarians and vegans' },
// 	{ groupName: 'Bread Heads', description: 'A community for bread lovers and pasta and pizza and sandwiches and wraps and spreads and toast' },
// ];

function CommunityUpdates({ communities }) {
	// Check if communities is truthy and has length greater than 0
	const hasCommunities = communities && communities.length > 0;

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Communities</Text>
			<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
				{hasCommunities ? (
					communities.map((community, index) => (
						<View key={index} style={styles.updateContainer}>
							<Text style={styles.groupName} numberOfLines={1}>{community.name}</Text>
							<Text style={styles.detailText} numberOfLines={2}>
								{community.description}
							</Text>
						</View>
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

// const communityUpdates = [
// 	{ groupName: 'Pasta Lovers', likes: 120, members: 80 },
// 	{ groupName: 'Meat Meat Meat', likes: 150, members: 50 },
// 	{ groupName: 'Health Gurus', likes: 90, members: 40 },
// ];

// function CommunityUpdates() {
// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.header}>Community Updates</Text>
// 			<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
// 				{communityUpdates.map((update, index) => (
// 					<View key={index} style={styles.updateContainer}>
// 						<Text style={styles.groupName}>{update.groupName}</Text>
// 						<Text style={styles.detailText}>
//     						Likes: {update.likes} {' '} | Members:
// 							{update.members}
// 						</Text>
// 						{/* <Text style={styles.detailText}>Members: {update.members}</Text> */}
// 					</View>
// 				))}
// 			</ScrollView>
// 		</View>
// 	);
// }

// Update the function to accept `communities` prop