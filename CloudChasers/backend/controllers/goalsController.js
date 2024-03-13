const Goal = require('../models/goal');
const GoalItem = require('../models/goalItem');
const User = require('../models/user');
const UserDay = require('../models/userDay');
const mongoose = require('mongoose');

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
        } else if (minTargetMass > maxTargetMass) {
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

