/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { get } = require('mongoose');
const personalAward = require('../models/personalAward');
const personalAwardItem = require('../models/personalAwardItem');
const User = require('../models/user');
const CommunityUser = require('../models/communityUser');
const CommmunityPost = require('../models/communityPost');

exports.createAward = async (req, res) => {
	try {
		const { awardName, awardDescription } = req.body;
		const user = req.user;
		if (!await checkNameIsUnique(awardName)) {
			return res.status(400).send({ message: 'Award name already exists' });
		}
		const newAward = new personalAward({
			name: awardName,
			description: awardDescription
		});
		await newAward.save();
		return res.status(200).send({ award: newAward, message: 'Award created' });
	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
}

exports.getAllAwards = async (req, res) => {
	try {
		const awards = await getAllAwards();
		return res.status(200).send({ awards: awards });
	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
}

exports.getAward = async (req, res) => {
	try {
		const { awardID } = req.body;
		const award = await personalAward.findById(awardID);
		return res.status(200).send({ award: award });
	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
}

exports.awardUser = async (req, res) => {
	try {
		const { awardID } = req.body;
		const user = req.user;
		const award = await personalAward.findById(awardID);
		if (!award) {
			return res.status(400).send({ message: 'Award does not exist' });
		}
		if (await checkIfUserHasAward(awardID, user._id)) {
			return res.status(400).send({ message: 'User already has this award' });
		}
		const awardItem = await createAwardItem(await award._id, await user._id)
		return res.status(200).send({ message: 'User Awarded', award: awardItem});
	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
}

exports.getUserAwards = async (req, res) => {
	try {
		const user = req.user;
		const awards = await personalAwardItem.find({ userID: user._id });
		return res.status(200).send({ awards: awards });
	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
}

exports.getAwardsToBeIssued = async (req, res) => {
	try {
		const user = req.user;
		newAwards = [];
		if (await issueStreakAwardQuery(user, 5)) {
			newAwards.push('5 Day Streak');
		}
		if (await issueStreakAwardQuery(user, 10)) {
			newAwards.push('10 Day Streak');            
		}
		if (await issueStreakAwardQuery(user, 25)) {
			newAwards.push('25 Day Streak');
		}
		if (await issueJoinCommunityAwardQuery(user)) {
			newAwards.push('Join Community');
		}
		if (await issueMakePostAwardQuery(user, 1)) {
			newAwards.push('Make a Post');
		}
		if (await issueMakePostAwardQuery(user, 5)) {
			newAwards.push('Make 5 Posts');
		}
		if (await issueMakePostAwardQuery(user, 10)) {
			newAwards.push('Make 10 Posts');
		}
		var newlyIssuedAwards = {};
		for (awardName of newAwards) {
			const award = await personalAward.findOne({name: awardName });
			const newAwardID = await createAwardItem(await award._id, await user._id);
			newlyIssuedAwards[awardName] = await newAwardID._id;
		}
		return res.status(200).send(newlyIssuedAwards);
	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
}

exports.getNumberOfCompletedAwards = async (req, res) => {
	try {
		const user = req.user;
		const awards = await getUserAwards(await user._id);
		const awardsCompleted = awards.length;
		const totalAwards = await personalAward.find().countDocuments();
		return res.status(200).send({ completed : awardsCompleted, Total : totalAwards, percentage: (awardsCompleted / totalAwards) * 100 });
	} catch (error) {
		return res.status(500).send({ error: error.toString() });
	}
}

async function issueStreakAwardQuery(user, x) {
	const streak = await user.streak;
	if (streak >= x) {
		const value = !checkIfAwardByNameExists(x + ' Day Streak', await getUserAwards(await user._id)); 
		return value;
	} else return false;
}

async function issueJoinCommunityAwardQuery(user) {
	const userID = await user._id;
	const communityUsers = await CommunityUser.find({ userID: userID });
	if (communityUsers.length > 0) {
		return (checkIfAwardByNameExists('Join Community', await getAllAwards()))
	} 
	return false;
}

async function issueMakePostAwardQuery(user, x) {
	const userID = await user._id;
	const communityPosts = await CommmunityPost.find({ userID: userID });
	if (communityPosts.length >= x) {
		if (x === 1) {
			return (checkIfAwardByNameExists('Make a Post', await getAllAwards()))
		}
		return (checkIfAwardByNameExists('Make ' + x + ' Posts', await getAllAwards()))
	}
	return false;
}

async function getAllAwards() {
	const awards = await personalAward.find();
	return awards;
}

async function checkNameIsUnique(name) {
	const awards = await getAllAwards();
	for (award of awards) {
		if (award.name === name) {
			return false;
		}
	}
	return true;
}

async function createAwardItem(awardID, userID) {
	const newAward = new personalAwardItem({
		userID: userID,
		personalAwardID : awardID,
		date: new Date(),
	});
	await newAward.save();
	return newAward;
}

async function checkIfUserHasAward(awardID, userID) {
	const award = await personalAwardItem.findOne({ userID: userID, personalAwardID: awardID });
	if (award) {
		return true;
	}
	return false;
}

function checkIfAwardByNameExists(name, awards) {
	for (award of awards) {
		if (award.name === name) {
			return true;
		}
	}
	return false;
}

async function getUserAwards( userID ) {
	var awards = [];
	const personalAwardItems = await personalAwardItem.find({ userID: userID});
	for (item of personalAwardItems) {
		const awardID = await item.personalAwardID;
		const awardName = await personalAward.findOne({_id: awardID});
		awards.push(awardName);
	}
	return awards
}
