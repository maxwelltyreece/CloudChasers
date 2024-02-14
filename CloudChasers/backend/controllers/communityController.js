const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Community = require('../models/community');
const CommunityUser = require('../models/communityUser');

exports.createCommunity = async (req, res) => {
    const { token, name, description, recipePrivacy, joinPrivacy } = req.body;
    try {
        // Check if community exists
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
        console.log('Community created');
        return res.status(200).json({ success: true, message: 'Community created', data: newCommunity });
    }
    catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
};
