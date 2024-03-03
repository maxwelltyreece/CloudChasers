const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Community = require('../models/community');
const CommunityUser = require('../models/communityUser');

// TODO:
// - Join private community
// - Get pending requests
// - Get community posts
// - Delete community
// - Leave community
// - Update community details
// - Get list of communities
// 
// DONE:
// - Get community members
// - Get admin status
// - Get member status
// - Get list of user communities

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
            createdBy: user,
        });
        console.log('Community created', newCommunity);
        await newCommunity.save();

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
    catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
};
// Should this be restricted to community members?
exports.getCommunityDetails = async (req, res) => {
    const { communityId } = req.body;
    try {
        const user = req.user;
        // Get community
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).send({ message: 'Community not found' });
        }
        return res.status(200).json({ success: true, data: community });
    }
    catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
};

exports.getCommunityMembers = async (req, res) => {
    const { communityId } = req.body;
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
        // Map member IDs to usernames
        const users = await Promise.all(members.map(member => User.findById(member.userID).select('username')));

        return res.status(200).json({ success: true, data: users });
        
    }
    catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
};

exports.getUserRole = async (req, res) => {
    const { communityId } = req.body;
    try {
        const user = req.user;
        // Get community
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