/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Community = require('../models/community');
const CommunityUser = require('../models/communityUser');
const CommunityPost = require('../models/communityPost');
const JoinRequest = require('../models/request');

/**
 * Handles the POST /create request to create a new community.
 *
 * @async
 * @function createCommunity
 * @param {Object} req - Express request object, containing the details of the community to be created in the body.
 * @param {string} req.body.name - The name of the community.
 * @param {string} req.body.description - The description of the community.
 * @param {string} req.body.recipePrivacy - The privacy setting for recipes in the community.
 * @param {string} req.body.joinPrivacy - The privacy setting for joining the community.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it also returns the created community data.
 * @throws {Error} Will throw an error if saving the community or community user fails.
 */
exports.createCommunity = async (req, res) => {
	const { name, description, recipePrivacy, joinPrivacy } = req.body;
	try {
		const user = req.user;
		const community = await Community.findOne({ name });
		if (community) {
			return res.status(400).send({ message: 'Community already exists' });
		}
		const newCommunity = new Community({
			name,
			description,
			recipePrivacy,
			joinPrivacy,
			createdBy: user._id,
		});
       
		await newCommunity.save();
		const newCommunityUser = new CommunityUser({
			communityID: newCommunity._id,
			userID: user._id,
			role: 'admin',
		});

		await newCommunityUser.save();
		return res.status(200).json({ success: true, message: 'Community created', data: newCommunity });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

/**
 * Handles the POST /join request to join a community.
 * If community is public then user is added to the community directly.
 * If community is private then a join request is created.
 *
 * @async
 * @function joinCommunity
 * @param {Object} req - Express request object, containing the user and the ID of the community to join in the body.
 * @param {Object} req.user - The user who wants to join the community.
 * @param {string} req.body.communityId - The ID of the community to join.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it also returns the data of the new community user or the join request.
 * @throws {Error} Will throw an error if saving the new community user or the join request fails.
 */
exports.joinCommunity = async (req, res) => {
	const { communityId } = req.body;
	try {
		const user = req.user; 
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isMember = await CommunityUser.findOne({ communityID: communityId, userID: user._id });
		if (isMember) {
			return res.status(400).send({ message: 'User is already a member of the community' });
		}
		const hasRequested = await JoinRequest.findOne({ communityID: communityId, userID: user._id });
		if (hasRequested) {
			return res.status(400).send({ message: 'User has already requested to join the community' });
		}
		if (community.joinPrivacy === 'private') {
			const joinRequest = new JoinRequest({
				status: 'Pending',
				userID: user._id,
				communityID: communityId,
			});
			await joinRequest.save();
			return res.status(200).json({ success: true, message: 'Request to join sent' });
		}
		else {
			const newCommunityUser = new CommunityUser({
				communityID: community._id,
				userID: user._id,
				role: 'member',
			});
			await newCommunityUser.save();
			return res.status(200).json({ success: true, message: 'Community joined', data: newCommunityUser });
		}
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

/**
 * Handles the GET /requests request to retrieve all pending join requests for a community.
 * Only admins of the community can retrieve the pending requests.
 *
 * @async
 * @function getPendingRequests
 * @param {Object} req - Express request object, containing the user and the ID of the community in the query.
 * @param {Object} req.user - The user making the request.
 * @param {string} req.query.communityId - The ID of the community.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it also returns the data of the pending requests.
 * @throws {Error} Will throw an error if retrieving the community, the admin status, the join requests, or the usernames fails.
 */
exports.getPendingRequests = async (req, res) => {
	const { communityId } = req.query;
	try {
		const user = req.user;
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isAdmin = await CommunityUser.findOne({ communityID: communityId, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		const requests = await JoinRequest.find({ communityID: communityId, status: 'Pending' });
		const requestsMapped = await Promise.all(requests.map(async (request) => {
			const username = await User.findById(request.userID).select('username');
			return { _id: request._id, username: username.username };
		}));
		return res.status(200).json({ success: true, data: requestsMapped });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

/**
 * Handles the POST /acceptRequest request to accept a join request to a community.
 * Only admins of the community can accept join requests.
 *
 * @async
 * @function acceptRequest
 * @param {Object} req - Express request object, containing the user and the ID of the join request in the body.
 * @param {Object} req.user - The user who is accepting the request.
 * @param {string} req.body.requestId - The ID of the join request.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it also returns a success flag and a message indicating that the request has been accepted.
 * @throws {Error} Will throw an error if retrieving the join request, the community, the admin status, updating the join request, or saving the new community user fails.
 */
exports.acceptRequest = async (req, res) => {
	const { requestId } = req.body;
	try {
		const user = req.user;
		const request = await JoinRequest.findById(requestId);
		if (!request) {
			return res.status(404).send({ message: 'Request not found' });
		}
		const community = await Community.findById(request.communityID);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isAdmin = await CommunityUser.findOne({ communityID: request.communityID, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		if (request.status !== 'Pending') {
			return res.status(400).send({ message: 'Request has already been accepted or denied' });
		}
		await JoinRequest.updateOne({ _id: requestId }, { status: 'Approved' });
		
		const newCommunityUser = new CommunityUser({
			communityID: community._id,
			userID: request.userID,
			role: 'member',
		});
		await newCommunityUser.save();
		return res.status(200).json({ success: true, message: 'Request accepted' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

/**
 * Handles the POST /denyRequest request to deny a join request to a community.
 * Only admins of the community can deny join requests.
 *
 * @async
 * @function denyRequest
 * @param {Object} req - Express request object, containing the user and the ID of the join request in the body.
 * @param {Object} req.user - The user who is denying the request.
 * @param {string} req.body.requestId - The ID of the join request.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it also returns a success flag and a message indicating that the request has been denied.
 * @throws {Error} Will throw an error if retrieving the join request, the community, the admin status, or updating the join request fails.
 */

exports.denyRequest = async (req, res) => {
	const { requestId } = req.body;
	try {
		const user = req.user;
		const request = await JoinRequest.findById(requestId);
		if (!request) {
			return res.status(404).send({ message: 'Request not found' });
		}
		const community = await Community.findById(request.communityID);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isAdmin = await CommunityUser.findOne({ communityID: request.communityID, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		if (request.status !== 'Pending') {
			return res.status(400).send({ message: 'Request has already been accepted or denied' });
		}
		await JoinRequest.updateOne({ _id: requestId }, { status: 'Rejected' });
		return res.status(200).json({ success: true, message: 'Request denied' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

/**
 * Handles the GET /details request to retrieve the details of a community.
 * Takes a community ID as a query parameter and returns the community details and the number of its members.
 * @async
 * @function getCommunityDetails
 * @param {Object} req - Express request object, containing the user and the ID of the community in the query.
 * @param {Object} req.user - The user making the request.
 * @param {string} req.query.communityId - The ID of the community.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it also returns the data of the community and the number of its members.
 * @throws {Error} Will throw an error if retrieving the community or counting the community users fails.
 */
exports.getCommunityDetails = async (req, res) => {
	const { communityId } = req.query;
	try {
		const user = req.user;
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const count = await CommunityUser.countDocuments({ communityID: communityId });
		return res.status(200).json({ success: true, data: { community, members: count }});
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

/**
 * Handles the GET /members request to retrieve the members of a community.
 * Only members of the community can retrieve the members.
 * 
 * @async
 * @function getCommunityMembers
 * @param {Object} req - Express request object, containing the user and the ID of the community in the query.
 * @param {Object} req.user - The user making the request.
 * @param {string} req.query.communityId - The ID of the community.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it also returns the data of the community members, including their IDs, usernames, profile picture links, and roles.
 * @throws {Error} Will throw an error if retrieving the community, the community user, the community members, or the user details fails.
 */
exports.getCommunityMembers = async (req, res) => {
	const { communityId } = req.query;
	try {
		const user = req.user;
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isMember = await CommunityUser.findOne({ communityID: communityId, userID: user._id });
		if (!isMember) {
			return res.status(400).send({ message: 'User is not a member of the community' });
		}
		const members = await CommunityUser.find({ communityID: communityId });
	
		const users = await Promise.all(members.map(async (member) => {
			const communitymember = await User.findById(member.userID).select('username');
			const profilePictureLink = await User.findById(member.userID).select('profilePictureLink');
			const role = member.role;
			return { _id: communitymember._id, username: communitymember.username, profilePictureLink: profilePictureLink.profilePictureLink, role };
		}));
		return res.status(200).json({ success: true, data: users });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

/**
 * Handles the GET /role request to retrieve the role of a user in a community.
 *
 * @async
 * @function getUserRole
 * @param {Object} req - Express request object, containing the user and the ID of the community in the query.
 * @param {Object} req.user - The user whose role is to be retrieved.
 * @param {string} req.query.communityId - The ID of the community.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it also returns the role of the user in the community. If the user is not a member of the community, it returns 'none'.
 * @throws {Error} Will throw an error if retrieving the community or the community user fails.
 */
exports.getUserRole = async (req, res) => {
	const { communityId } = req.query;
	try {
		const user = req.user;
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const role = await CommunityUser.findOne({ communityID: communityId, userID: user._id }).select('role');
		if (!role) {
			return res.status(400).send({ success: true, data: { role: 'none' }});
		}
		return res.status(200).json({ success: true, data: role });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

/**
 * Handles the GET /all request to retrieve a list of all communities.
 *
 * @async
 * @function getAllCommunities
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it also returns an array of all communities, each represented by an object containing its ID, name, and description.
 * @throws {Error} Will throw an error if retrieving the communities fails.
 */
exports.getAllCommunities = async (req, res) => {
	try {
		const communities = await Community.find();
		return res.status(200).json({ success: true, data: communities.map(community => ({
			id: community._id,
			name: community.name,
			description: community.description,
		}))
		});
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

/**
 * Handles the GET /userCommunities request to retrieve all communities that a user is a member of.
 *
 * @async
 * @function getUserCommunities
 * @param {Object} req - Express request object, containing the user.
 * @param {Object} req.user - The user whose communities are to be retrieved.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it also returns an array of all communities the user is a member of, each represented by an object containing its ID, name, and description.
 * @throws {Error} Will throw an error if retrieving the communities fails.
 */
exports.getUserCommunities = async (req, res) => {
	try {
		const user = req.user;
		const communities = await Community.find({ 
			_id: { $in: await CommunityUser.distinct('communityID', { userID: user._id }) }
		});
        
		return res.status(200).json({ success: true, data: communities.map(community => ({
			id: community._id,
			name: community.name,
			description: community.description,
		}))});
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

/**
 * Handles the PUT /delete request to delete a community.
 * Only admins of the community can delete it.
 *
 * @async
 * @function deleteCommunity
 * @param {Object} req - Express request object, containing the user and the ID of the community in the body.
 * @param {Object} req.user - The user who is attempting to delete the community.
 * @param {string} req.body.communityId - The ID of the community to be deleted.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it returns a success flag and a message indicating that the community has been deleted. If the community does not exist or the user is not an admin of the community, it returns an appropriate message.
 * @throws {Error} Will throw an error if retrieving the community, the admin status, or deleting the community or the community users fails.
 */
exports.deleteCommunity = async (req, res) => {
	const { communityId } = req.body;
	try {
		const user = req.user;
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isAdmin = await CommunityUser.findOne({ communityID: communityId, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		await Community.deleteOne({ _id: communityId });
		await CommunityUser.deleteMany({ communityID: communityId });
    
		return res.status(200).json({ success: true, message: 'Community deleted' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

/**
 * Handles the PUT /leave request to leave a community.
 *
 * @async
 * @function leaveCommunity
 * @param {Object} req - Express request object, containing the user and the ID of the community in the body.
 * @param {Object} req.user - The user who is attempting to leave the community.
 * @param {string} req.body.communityId - The ID of the community to be left.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it returns a success flag and a message indicating that the user has left the community. If the community does not exist, the user is not a member of the community, or the user is an admin of the community, it returns an appropriate message.
 * @throws {Error} Will throw an error if retrieving the community, the community user, or deleting the community user fails.
 */
exports.leaveCommunity = async (req, res) => {
	const { communityId } = req.body;
	try {
		const user = req.user;
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isMember = await CommunityUser.findOne({ communityID: communityId, userID: user._id });
		if (!isMember) {
			return res.status(400).send({ message: 'User is not a member of the community' });
		}
		// Admins can't leave community
		if (isMember.role === 'admin') {
			return res.status(400).send({ message: 'User is an admin of the community' });
		}
		await CommunityUser.deleteOne({ communityID: communityId, userID: user._id });
    
		return res.status(200).json({ success: true, message: 'Community left' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

/**
 * Handles the PUT /removeMember request to remove a member from a community.
 * Only admins of the community can remove members.
 * 
 * @async
 * @function removeMember
 * @param {Object} req - Express request object, containing the user and the IDs of the community and the member in the body.
 * @param {Object} req.user - The user who is attempting to remove the member.
 * @param {string} req.body.communityId - The ID of the community.
 * @param {string} req.body.userId - The ID of the member to be removed.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it returns a success flag and a message indicating that the member has been removed. If the community does not exist, the user is not an admin of the community, or the member is not a member of the community, it returns an appropriate message.
 * @throws {Error} Will throw an error if retrieving the community, the admin status, the member, or deleting the member fails.
 */
exports.removeMember = async (req, res) => {
	const { communityId, userId } = req.body;
	try {
		const user = req.user;
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isAdmin = await CommunityUser.findOne({ communityID: communityId, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		const member = await CommunityUser.findOne({ communityID: communityId, userID: userId });
		if (!member) {
			return res.status(404).send({ message: 'Member not found' });
		}
		await CommunityUser.deleteOne({ communityID: communityId, userID: userId });
    
		return res.status(200).json({ success: true, message: 'Member removed' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

/**
 * Handles the PUT /updateDesc request to update the description of a community.
 *
 * @async
 * @function updateCommunityDesc
 * @param {Object} req - Express request object, containing the user and the ID of the community and the new description in the body.
 * @param {Object} req.user - The user who is attempting to update the community description.
 * @param {string} req.body.communityId - The ID of the community.
 * @param {string} req.body.description - The new description of the community.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it returns a success flag and a message indicating that the community has been updated. If the community does not exist or the user is not an admin of the community, it returns an appropriate message.
 * @throws {Error} Will throw an error if retrieving the community, the admin status, or updating the community fails.
 */
exports.updateCommunityDesc = async (req, res) => {
	const { communityId, description } = req.body;
	try {
		const user = req.user;
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isAdmin = await CommunityUser.findOne({ communityID: communityId, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		await Community.updateOne({ _id: communityId }, { description });
    
		return res.status(200).json({ success: true, message: 'Community updated' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

/**
 * Handles the PUT /updateJoinPrivacy request to update the join privacy setting of a community.
 * Only admins of the community can update the join privacy setting.
 *
 * @async
 * @function updateJoinPrivacy
 * @param {Object} req - Express request object, containing the user and the ID of the community and the new join privacy setting in the body.
 * @param {Object} req.user - The user who is attempting to update the community join privacy setting.
 * @param {string} req.body.communityId - The ID of the community.
 * @param {string} req.body.joinPrivacy - The new join privacy setting of the community.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it returns a success flag and a message indicating that the community has been updated. If the community does not exist or the user is not an admin of the community, it returns an appropriate message.
 * @throws {Error} Will throw an error if retrieving the community, the admin status, or updating the community fails.
 */
exports.updateJoinPrivacy = async (req, res) => {
	const { communityId, joinPrivacy } = req.body;
	try {
		const user = req.user;
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isAdmin = await CommunityUser.findOne({ communityID: communityId, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		await Community.updateOne({ _id: communityId }, { joinPrivacy }, { runValidators: true });
    
		return res.status(200).json({ success: true, message: 'Community updated' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

/**
 * Handles the POST /makePost request to create a new post in a community.
 * Only members of the community can create posts.
 *
 * @async
 * @function makePost
 * @param {Object} req - Express request object, containing the user and the details of the post in the body.
 * @param {Object} req.user - The user who is attempting to make the post.
 * @param {string} req.body.communityId - The ID of the community where the post is to be made.
 * @param {string} req.body.title - The title of the post.
 * @param {string} req.body.text - The text of the post.
 * @param {string} req.body.recipeID - The ID of the recipe associated with the post.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it returns a success flag, a message indicating that the post has been created, and the details of the new post. If the community does not exist or the user is not a member of the community, it returns an appropriate message.
 * @throws {Error} Will throw an error if retrieving the community, the community user, or creating the post fails.
 */
exports.makePost = async (req, res) => {
	const { communityId, title, text, recipeID } = req.body;
	try {
		const user = req.user;
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isMember = await CommunityUser.findOne({ communityID: communityId, userID: user._id });
		if (!isMember) {
			return res.status(400).send({ message: 'User is not a member of the community' });
		}
		
		const newPost = new CommunityPost({
			communityID: communityId,
			userID: user._id,
			recipeID,
			text,
			date: Date.now(),
			title,
		});
		await newPost.save();
		return res.status(200).json({ success: true, message: 'Post created', data: newPost });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

/**
 * Handles the GET /posts request to retrieve all posts from a community.
 * Only members of the community can retrieve the posts.
 *
 * @async
 * @function getCommunityPosts
 * @param {Object} req - Express request object, containing the user and the ID of the community in the query.
 * @param {Object} req.user - The user who is attempting to retrieve the posts.
 * @param {string} req.query.communityId - The ID of the community.
 * @param {Object} res - Express response object.
 * @returns {Object} Returns a response object with a status and a message. If successful, it returns a success flag and the details of the posts. If the community does not exist or the user is not a member of the community, it returns an appropriate message.
 * @throws {Error} Will throw an error if retrieving the community, the community user, the posts, or the post users fails.
 */
exports.getCommunityPosts = async (req, res) => {
	const { communityId } = req.query;
	try {
		const user = req.user;
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		const isMember = await CommunityUser.findOne({ communityID: communityId, userID: user._id });
		if (!isMember) {
			return res.status(400).send({ message: 'User is not a member of the community' });
		}
		
		const posts = await CommunityPost.find({ communityID: communityId });
		// Map user IDs to usernames + profile pic URLs
		const postsMapped = await Promise.all(posts.map(async (post) => {
			const username = await User.findById(post.userID).select('username');
			const user_profile_pic = await User.findById(post.userID).select('profilePictureLink');
			return { _id: post._id, username: username.username, recipeID: post.recipeID, user_profile_pic: user_profile_pic.profilePictureLink, title: post.title, text: post.text, date: post.date };
		}
		));

		return res.status(200).json({ success: true, data: postsMapped });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}