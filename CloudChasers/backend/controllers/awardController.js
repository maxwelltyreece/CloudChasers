const { get } = require('mongoose');
const personalAward = require('../models/personalAward');
const personalAwardItem = require('../models/personalAwardItem');

exports.createAward = async (req, res) => {
    try {
        const { awardName, awardDescription } = req.body;
        const user = req.user;
        console.log(await checkNameIsUnique(awardName));
        if (!await checkNameIsUnique(awardName)) {
            return res.status(400).send({ message: 'Award name already exists' });
        }
        const newAward = new personalAward({
            name: awardName,
            description : awardDescription
        });
        await newAward.save();
        return res.status(200).send({ award: newAward, message: 'Award created' });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}

exports.getAwards = async (req, res) => {
    try {
        const awards = await getAllAwards();
        return res.status(200).send({ awards: awards });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}

exports.getAward = async (req, res) => {
    try {
        const { awardID } = req.query;
        const award = await personalAward.findById(awardID);
        return res.status(200).send({ award: award });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}

exports.awardUser = async (req, res) => {
    try {
        const { awardID, userID } = req.body;
        const user = req.user;
        const award = await personalAward.findById(awardID);
        const newAward = new personalAwardItem({
            awardID: awardID,
            userID: userID
        });
        await newAward.save();
        return res.status(200).send({ message: 'Awarded user' });
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
