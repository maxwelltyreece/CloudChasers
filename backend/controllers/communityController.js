/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Community = require('../models/community');
const CommunityUser = require('../models/communityUser');
const CommunityPost = require('../models/communityPost');
const JoinRequest = require('../models/request');

// TODO:
//    ٩(^‿^)۶ 
//
// DONE:
// - Get community members
// - Get admin status
// - Get member status
// - Get list of user communities
// - Get list of communities
// - Delete community
// - Leave community
// - Update community description
// - Update community privacy settings
// - Admin can remove members
// - Get community posts/recipes
// - Join private community
// - Get pending requests
// - Accept/deny requests

exports.createCommunity = async (req, res) => {
	const { name, description, recipePrivacy, joinPrivacy } = req.body;
	try {
		const user = req.user;
		const community = await Community.findOne({ name });
		if (community) {
			return res.status(400).send({ message: 'Community already exists' });
		}
		console.log('Creating community');
		const newCommunity = new Community({
			name,
			description,
			recipePrivacy,
			joinPrivacy,
			createdBy: user._id,
		});
       
		await newCommunity.save();
		console.log('Community created', newCommunity);
		// Create CommunityUser to join community
		const newCommunityUser = new CommunityUser({
			communityID: newCommunity._id,
			userID: user._id,
			role: 'admin',
		});
		console.log('Community joined', newCommunityUser);

		await newCommunityUser.save();
		return res.status(200).json({ success: true, message: 'Community created', data: newCommunity });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

exports.joinCommunity = async (req, res) => {
	const { communityId } = req.body;
	console.log('Body:', req.body);
	console.log('Community ID server side:', communityId);
	try {
		// Get user from token
		const user = req.user; 
		// Get community
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is already in community
		const isMember = await CommunityUser.findOne({ communityID: communityId, userID: user._id });
		if (isMember) {
			return res.status(400).send({ message: 'User is already a member of the community' });
		}
		// Check if user has already requested to join community
		const hasRequested = await JoinRequest.findOne({ communityID: communityId, userID: user._id });
		if (hasRequested) {
			return res.status(400).send({ message: 'User has already requested to join the community' });
		}
		// Check if community is private
		if (community.joinPrivacy === 'private') {
			const joinRequest = new JoinRequest({
				status: 'Pending',
				userID: user._id,
				communityID: communityId,
			});
			await joinRequest.save();
			return res.status(200).json({ success: true, message: 'Request to join sent' });
		}
		else if (community.joinPrivacy === 'public') {
			console.log('Joining community');
			// Create CommunityUser to join community
			const newCommunityUser = new CommunityUser({
				communityID: community._id,
				userID: user._id,
				role: 'member',
			});
			console.log('Community joined', newCommunityUser);
			await newCommunityUser.save();

			console.log('Community joined');
			return res.status(200).json({ success: true, message: 'Community joined', data: newCommunityUser });
            
		}
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

// Get pending join requests
exports.getPendingRequests = async (req, res) => {
	const { communityId } = req.query;
	try {
		const user = req.user;
		// Get community
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is an admin of the community
		const isAdmin = await CommunityUser.findOne({ communityID: communityId, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		// Get pending requests
		const requests = await JoinRequest.find({ communityID: communityId, status: 'Pending' });
		// Map user IDs to usernames
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

// Accept join request
exports.acceptRequest = async (req, res) => {
	const { requestId } = req.body;
	try {
		const user = req.user;
		// Get request
		const request = await JoinRequest.findById(requestId);
		if (!request) {
			return res.status(404).send({ message: 'Request not found' });
		}
		// Get community
		const community = await Community.findById(request.communityID);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is an admin of the community
		const isAdmin = await CommunityUser.findOne({ communityID: request.communityID, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		// Accept request
		await JoinRequest.updateOne({ _id: requestId }, { status: 'Approved' });
		// Create CommunityUser to join community
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

// Deny join request
exports.denyRequest = async (req, res) => {
	const { requestId } = req.body;
	try {
		const user = req.user;
		// Get request
		const request = await JoinRequest.findById(requestId);
		if (!request) {
			return res.status(404).send({ message: 'Request not found' });
		}
		// Get community
		const community = await Community.findById(request.communityID);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is an admin of the community
		const isAdmin = await CommunityUser.findOne({ communityID: request.communityID, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		// Deny request
		await JoinRequest.updateOne({ _id: requestId }, { status: 'Rejected' });
		return res.status(200).json({ success: true, message: 'Request denied' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};
// Should this be restricted to community members?
exports.getCommunityDetails = async (req, res) => {
	const { communityId } = req.query;
	try {
		const user = req.user;
		// Get community
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Get member count
		const count = await CommunityUser.countDocuments({ communityID: communityId });
		return res.status(200).json({ success: true, data: { community, members: count }});
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
};

exports.getCommunityMembers = async (req, res) => {
	const { communityId } = req.query;
	try {
		const user = req.user;
		// Get community
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is a member of the community
		const isMember = await CommunityUser.findOne({ communityID: communityId, userID: user._id });
		if (!isMember) {
			return res.status(400).send({ message: 'User is not a member of the community' });
		}
		// Get members
		const members = await CommunityUser.find({ communityID: communityId });
		// Map member IDs to usernames + pic URLs
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

exports.getUserRole = async (req, res) => {
	const { communityId } = req.query;
	try {
		const user = req.user;
		// Get community
		console.log(communityId);
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Get user role
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

// Exclude communities that user is already a member of?
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

// Get all communities that the user is a member/admin of
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

// Delete community
exports.deleteCommunity = async (req, res) => {
	const { communityId } = req.body;
	try {
		const user = req.user;
		// Get community
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is admin
		const isAdmin = await CommunityUser.findOne({ communityID: communityId, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		// Delete community object
		await Community.deleteOne({ _id: communityId });
		// Delete all CommunityUser objects for the community
		await CommunityUser.deleteMany({ communityID: communityId });
    
		return res.status(200).json({ success: true, message: 'Community deleted' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

// Leave community
exports.leaveCommunity = async (req, res) => {
	const { communityId } = req.body;
	try {
		const user = req.user;
		// Get community
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is a member
		const isMember = await CommunityUser.findOne({ communityID: communityId, userID: user._id });
		if (!isMember) {
			return res.status(400).send({ message: 'User is not a member of the community' });
		}
		// If user is admin then they cannot leave community
		if (isMember.role === 'admin') {
			return res.status(400).send({ message: 'User is an admin of the community' });
		}
		// Leave community
		await CommunityUser.deleteOne({ communityID: communityId, userID: user._id });
    
		return res.status(200).json({ success: true, message: 'Community left' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

// Remove member from community
exports.removeMember = async (req, res) => {
	const { communityId, userId } = req.body;
	try {
		const user = req.user;
		// Get community
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is admin
		const isAdmin = await CommunityUser.findOne({ communityID: communityId, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		// Remove member
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

// Update group description
exports.updateCommunityDesc = async (req, res) => {
	const { communityId, description } = req.body;
	try {
		const user = req.user;
		// Get community
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is admin
		const isAdmin = await CommunityUser.findOne({ communityID: communityId, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		// Update community
		await Community.updateOne({ _id: communityId }, { description });
    
		return res.status(200).json({ success: true, message: 'Community updated' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

// Update join privacy settings
exports.updateJoinPrivacy = async (req, res) => {
	const { communityId, joinPrivacy } = req.body;
	try {
		const user = req.user;
		// Get community
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is admin
		const isAdmin = await CommunityUser.findOne({ communityID: communityId, userID: user._id, role: 'admin' });
		if (!isAdmin) {
			return res.status(400).send({ message: 'User is not an admin of the community' });
		}
		// Update community
		await Community.updateOne({ _id: communityId }, { joinPrivacy }, { runValidators: true });

    
		return res.status(200).json({ success: true, message: 'Community updated' });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

exports.makePost = async (req, res) => {
	const { communityId, title, text, recipeID } = req.body;
	try {
		const user = req.user;
		// Get community
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is a member of the community
		const isMember = await CommunityUser.findOne({ communityID: communityId, userID: user._id });
		if (!isMember) {
			return res.status(400).send({ message: 'User is not a member of the community' });
		}
		// Create post
		const newPost = new CommunityPost({
			communityID: communityId,
			userID: user._id,
			recipeID,
			text,
			data: Date.now(),
			title,
		});
		await newPost.save();
		return res.status(200).json({ success: true, message: 'Post created', data: newPost });
	}
	catch (error) {
		return res.status(400).json({ error: error.toString() });
	}
}

exports.getCommunityPosts = async (req, res) => {
	const { communityId } = req.query;
	try {
		const user = req.user;
		// Get community
		const community = await Community.findById(communityId);
		if (!community) {
			return res.status(404).send({ message: 'Community not found' });
		}
		// Check if user is a member of the community
		const isMember = await CommunityUser.findOne({ communityID: communityId, userID: user._id });
		if (!isMember) {
			return res.status(400).send({ message: 'User is not a member of the community' });
		}
		// Get posts
		const posts = await CommunityPost.find({ communityID: communityId });
		// Map user IDs to usernames + pic URLs
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