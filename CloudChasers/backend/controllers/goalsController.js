const Goal = require('../models/goal');
const goalItem = require('../models/goalItem');
const GoalItem = require('../models/goalItem');
const User = require('../models/user');
const UserDay = require('../models/userDay');
const app = require('../server');
const mongoose = require('mongoose');
const request = require('supertest');

exports.createGoal = async (req, res) => {
    try {
        const {goalName, description, measurement, minTargetMass, maxTargetMass} = req.body;
        const user = req.user;
        requiredFields = ['goalName', 'description', 'measurement'];
        var missingFields = [];
        requiredFields.forEach(field => {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        });
        

        if (missingFields.length > 0) {
            return res.status(400).send({ message: `Missing required fields: ${missingFields.join(', ')}` });
        } else if (!minTargetMass && !maxTargetMass) {
            return res.status(400).send({ message: 'Minimum target mass or maximum target mass is required' });
        } else if (minTargetMass < 0 || maxTargetMass < 0) {
            return res.status(400).send({ message: 'Minimum target mass or maximum mass must be larger than 0' });
        } else if (minTargetMass > maxTargetMass && maxTargetMass != null) {
            return res.status(400).send({ message: 'Minimum target mass cannot be greater than maximum target mass' });
        } 
        const newGoal = new Goal({
            name: goalName,
            description: description,
            measurement: measurement,
            minTargetMass: minTargetMass,
            maxTargetMass: maxTargetMass
        });
        await newGoal.save();

        const newGoalItem = new GoalItem({
            goalID: await newGoal._id,
            userID: await user._id,
        }); 
        await newGoalItem.save();

        return res.status(200).send({ goal: newGoal, message: 'Goal created' });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}

exports.getAllGoalsOfUser = async (req, res) => {
    try {
        const user = req.user;
        const goals = await GoalItem.find({ userID: user._id });
        for (let i = 0; i < goals.length; i++) {
            const goal = await Goal.findById(goals[i].goalID);
            goals[i] = {
                goalID: goals[i].goalID,
                name: goal.name,
                description: goal.description,
                measurement: goal.measurement,
                minTargetMass: goal.minTargetMass,
                maxTargetMass: goal.maxTargetMass
            }
        }
        return res.status(200).send({ goals: goals });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}

exports.getSingleGoalItem = async (req, res) => {
    try {
        const { goalID } = req.body;
        const user = req.user;
        const goal = await Goal.findById(goalID);
        if (!goal) {
            return res.status(404).send({ message: 'Goal not found' });
        }
        return res.status(200).send({ goal: goal });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}

exports.deleteGoal = async (req, res) => {
    try {
        const { goalID } = req.body;
        const user = req.user;
        const goal = await Goal.findById(goalID);
        if (!goal) {
            return res.status(404).send({ message: 'Goal not found' });
        }
        await Goal.findByIdAndDelete(goalID);
        return res.status(200).send({ message: 'Goal deleted' });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}

exports.updateGoal = async (req, res) => {
    try {
        const { goalID, goalName, description, measurement, minTargetMass, maxTargetMass } = req.body;
        const user = req.user;
        var goal = await Goal.findById(goalID);
        var userIDWithGoalAccess = await getUserIDsWhoHaveAccessToGoal(goalID);
        if (!goal) {
            return res.status(404).send({ message: 'Goal not found' });
        }
        var userID = await user._id;
        userID = await userID.toString();
        if (!userIDWithGoalAccess.includes(userID)) {
            return res.status(403).send({ message: 'You are not authorized to update this goal' });
        }
        if (goalName) {
            goal.name = goalName;
        }
        if (description) {
            goal.description = description;
        }
        if (measurement) {
            goal.measurement = measurement;
        }
        if (minTargetMass) {
            goal.minTargetMass = minTargetMass;
        }
        if (maxTargetMass) {
            goal.maxTargetMass = maxTargetMass;
        }
        await goal.save();
        return res.status(200).send({ message: 'Goal updated' });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}

exports.getMacroGoal = async (req, res) => {
    try { 
        const user = req.user;
        const { macro } = req.body;
        const goals = await getAllGoalsOfUser(await user._id)
        for (let i = 0; i < goals.length; i++) {
            var minMax = await getMinAndMaxFromGoal(goals[i]);
            goals[i] = {
                goalID: await goals[i]._id,
                minTargetMass: await minMax.Min,
                maxTargetMass: await minMax.Max
            }
        }
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}

async function getUserIDsWhoHaveAccessToGoal(goalID) {
    var goalItem = await GoalItem.find({ goalID: goalID });
    for (let i = 0; i < goalItem.length; i++) {
        goalItem[i] = await goalItem[i].userID;
        goalItem[i] = await goalItem[i]._id;
        goalItem[i] = await goalItem[i].toString();
    }
    return goalItem;
}

async function getAllGoalsOfUser(userID) {
    var goals = await GoalItem.find({ userID: userID });
    for (let i = 0; i < goals.length; i++) {
        goals[i] = await Goal.findById(goals[i].goalID);
    }
    return goals;
}

async function getMinAndMaxFromGoal(goal) {
    var minMax = {
        "Min": await goal.minTargetMass,
        "Max": await goal.maxTargetMass
    }
    return minMax;
}