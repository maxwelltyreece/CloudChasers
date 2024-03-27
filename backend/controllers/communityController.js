/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Community = require('../models/community');
const CommunityUser = require('../models/communityUser');
const CommunityPost = require('../models/communityPost');
const JoinRequest = require('../models/request');

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

n
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