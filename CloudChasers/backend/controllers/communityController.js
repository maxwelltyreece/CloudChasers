const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Community = require('../models/community');
const CommunityUser = require('../models/communityUser');

exports.createCommunity = async (req, res) => {
    const { token, name, description, recipePrivacy, joinPrivacy } = req.body;
    try {
        // Get user from token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
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
            userID: decoded.userId,
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
    const { token, communityId } = req.body;
    try {
        // Get user from token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        // Get community
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).send({ message: 'Community not found' });
        }
        // Check if user is already in community
        const isMember = await CommunityUser.findOne({ communityID: communityId, userID: decoded.userId });
        if (isMember) {
            return res.status(400).send({ message: 'User is already a member of the community' });
        }

        console.log('Joining community');
        // Create CommunityUser to join community
        const newCommunityUser = new CommunityUser({
            communityID: community._id,
            userID: decoded.userId,
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
        
