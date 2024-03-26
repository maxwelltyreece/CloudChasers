import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalIP } from '../screens/IPIndex';
import axios from 'axios';

/**
 * Create a new community with the provided data.
 * @param {Object} communityData - The data for the new community.
 * @returns {Promise} Axios Response Promise with the created community.
 */
export async function createCommunity(communityData) {
	try {
		const token = await AsyncStorage.getItem('token');
		const response = await axios.post(`http://${LocalIP}:3000/community/create`, communityData, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (response.status !== 200) {
			console.error(`HTTP error! status: ${response.status}`);
			return false;
		}

		const jsonResponse = response.data;
		if (jsonResponse.success) {
			// console.log(jsonResponse.message);
			return jsonResponse;
		}
		console.error(jsonResponse.message);
		return false;
	} catch (error) {
		console.error('There was a problem with the axios operation: ', error);
		return false;
	}
}

/**
 * Join a community by its ID.
 * @param {string} communityId - The ID of the community to join.
 * @returns {Promise} Axios Response Promise with the join operation result.
 */
export async function joinCommunity(communityId) {
	try {
		const token = await AsyncStorage.getItem('token');
		const response = await axios.post(`http://${LocalIP}:3000/community/join`, { communityId }, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error('There was a problem with the axios operation: ', error);
		return false;
	}
}

/**
 * Get details of a community by its ID.
 * @param {string} communityId - The ID of the community to get details of.
 * @returns {Promise} Axios Response Promise with the community details.
 */
export async function getCommunityDetails(communityId) {
	try {
		const token = await AsyncStorage.getItem('token');
		const response = await axios.get(`http://${LocalIP}:3000/community/details`, {
			params: {
				communityId: communityId
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error('There was a problem with the axios operation: ', error);
		return false;
	}
}

/**
 * Get the user's role in a community by its ID.
 * @param {string} communityId - The ID of the community to get the user's role in.
 * @returns {Promise} Axios Response Promise with the user's role.
 */
export async function getUserRole(communityId) {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`http://${LocalIP}:3000/community/role`, {
        params: {
            communityId: communityId
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

/**
 * Get all communities.
 * @returns {Promise} Axios Response Promise with all communities.
 */
export async function getAllCommunities() {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.get(`http://${LocalIP}:3000/community/all`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
}

/**
 * Get all communities that the user is a part of.
 * @returns {Promise} Axios Response Promise with the user's communities.
 */
export async function getUserCommunities() {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.get(`http://${LocalIP}:3000/community/userCommunities`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
}

/**
 * Delete a community by its ID.
 * @param {string} communityId - The ID of the community to delete.
 * @returns {Promise} Axios Response Promise with the delete operation result.
 */
export async function deleteCommunity(communityId) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.put(`http://${LocalIP}:3000/community/delete`, { communityId }, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	return response.data;
}

/**
 * Leave a community by its ID.
 * @param {string} communityId - The ID of the community to leave.
 * @returns {Promise} Axios Response Promise with the leave operation result.
 */
export async function leaveCommunity(communityId) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.put(`http://${LocalIP}:3000/community/leave`, { communityId }, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	return response.data;
}

/**
 * Update the description of a community by its ID.
 * @param {string} communityId - The ID of the community to update.
 * @param {string} description - The new description.
 * @returns {Promise} Axios Response Promise with the update operation result.
 */
export async function updateCommunityDesc(communityId, description) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.put(`http://${LocalIP}:3000/community/updateDesc`, { communityId, description }, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	return response.data;
}

/**
 * Update the join privacy of a community by its ID.
 * @param {string} communityId - The ID of the community to update.
 * @param {string} joinPrivacy - The new join privacy.
 * @returns {Promise} Axios Response Promise with the update operation result.
 */
export async function updateJoinPrivacy(communityId, joinPrivacy) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.put(`http://${LocalIP}:3000/community/updateJoinPrivacy`, { communityId, joinPrivacy }, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	return response.data;
}

/**
 * Get the image of a community by its ID.
 * @param {string} Id - The ID of the community to get the image of.
 * @param {string} folderName - The name of the folder where the image is stored.
 * @returns {Promise} Axios Response Promise with the community image.
 */
export async function getCommunityImage(Id, folderName) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.get(`http://${LocalIP}:3000/image/getImage`, {
		params: {
			Id: Id,
			folderName: folderName
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
}

/**
 * Make a post in a community.
 * @param {Object} postData - The data for the new post.
 * @returns {Promise} Axios Response Promise with the post operation result.
 */
export async function makePost(postData) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.post(`http://${LocalIP}:3000/community/makePost`, postData, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
}

/**
 * Get all posts in a community by its ID.
 * @param {string} communityId - The ID of the community to get posts from.
 * @returns {Promise} Axios Response Promise with the community posts.
 */
export async function getCommunityPosts(communityId) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.get(`http://${LocalIP}:3000/community/posts`, {
		params: {
			communityId: communityId
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
}

/**
 * Remove a member from a community.
 * @param {string} communityId - The ID of the community to remove the member from.
 * @param {string} memberId - The ID of the member to remove.
 * @returns {Promise} Axios Response Promise with the remove operation result.
 */
export async function removeMember(communityId, memberId) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.put(`http://${LocalIP}:3000/community/removeMember`, { communityId, memberId }, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
}

/**
 * Get all members in a community by its ID.
 * @param {string} communityId - The ID of the community to get members from.
 * @returns {Promise} Axios Response Promise with the community members.
 */
export async function getCommunityMembers(communityId) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.get(`http://${LocalIP}:3000/community/members`, {
		params: {
			communityId: communityId
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
}

/**
 * Accept a join request to a community.
 * @param {string} requestId - The ID of the join request to accept.
 * @returns {Promise} Axios Response Promise with the accept operation result.
 */
export async function acceptRequest(requestId) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.post(`http://${LocalIP}:3000/community/acceptRequest`, { requestId }, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
}

/**
 * Deny a join request to a community.
 * @param {string} requestId - The ID of the join request to deny.
 * @returns {Promise} Axios Response Promise with the deny operation result.
 */
export async function denyRequest(requestId) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.post(`http://${LocalIP}:3000/community/denyRequest`, { requestId }, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
}

/**
 * Get all pending join requests to a community by its ID.
 * @param {string} communityId - The ID of the community to get join requests from.
 * @returns {Promise} Axios Response Promise with the community join requests.
 */
export async function getPendingRequests(communityId) {
	const token = await AsyncStorage.getItem('token');
	const response = await axios.get(`http://${LocalIP}:3000/community/requests`, {
		params: {
			communityId: communityId
		},
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
}

/**
 * Get all recipes in a community by its ID.
 * @param {string} communityId - The ID of the community to get recipes from.
 * @returns {Promise} Axios Response Promise with the community recipes.
 */
export async function getCommunityRecipes(communityId) {
	try {
		const token = await AsyncStorage.getItem('token');
		const response = await axios.get(`http://${LocalIP}:3000/food/getCommunityRecipes`, {
			params: {
				communityID: communityId
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error('Error getting community recipes:', error);
		throw error;
	}
}