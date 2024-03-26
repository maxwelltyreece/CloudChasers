/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
        const {goalName, measurement, minTargetMass, maxTargetMass} = req.body;
        const user = req.user;
        requiredFields = ['goalName', 'measurement'];
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

        preExsistingGoals = await getAllGoalsOfUser(await user._id);
        var nameTaken = false;
        var macroTracked = false;
        for (let i = 0; i < preExsistingGoals.length; i++) {
            if (preExsistingGoals[i].name == goalName) {
                nameTaken = true;
            }
            if (preExsistingGoals[i].measurement == measurement) {
                macroTracked = true;
            }
        }
        if (nameTaken) {
            return res.status(400).send({ message: 'Goal name already taken' });
        } else if (macroTracked) {
            return res.status(400).send({ message: 'Macro already tracked' });
        }

        const newGoal = new Goal({
            name: goalName,
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
        const goals = await getAllGoalsOfUser(await user._id);
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
        await GoalItem.findOneAndDelete({ goalID: goalID })
        return res.status(200).send({ message: 'Goal deleted' });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}

exports.updateGoal = async (req, res) => {
    try {
        const { goalID, goalName, measurement, minTargetMass, maxTargetMass } = req.body;
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
        var goal = null;
        for (let i = 0; i < goals.length; i++) {
            const goalMeasurement = await goals[i].measurement;
            const lowerCaseMacro = macro.substring(0).toLowerCase();
            if (goalMeasurement == lowerCaseMacro) {
                var minMax = await getMinAndMaxFromGoal(goals[i]);
                goal = {
                    lowerCaseMacro : await goals[i].measurement,
                    goalID: await goals[i]._id,
                    minTargetMass: await minMax.Min,
                    maxTargetMass: await minMax.Max
                }
            }
        }
        if (!goal) {
            return res.status(404).send({ message: 'No goal for this macro' });
        }
        res.status(200).send({ goal : goal });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}

exports.getUntrackedMacroGoals = async (req, res) => {
    try {
        const user = req.user;
        const goals = await getAllGoalsOfUser(await user._id);
        const untrackedMacros = getUntrackedMacros(goals);
        return res.status(200).send({ untrackedMacros: untrackedMacros });
    } catch (error) {
        return res.status(500).send({ error: error.toString() });
    }
}


// This function is used to change the min and max values of a goal
// It takes in the macro of the goal you want to change, the new min and max values for that goal
// It then updates the goal if valid min and max values are given
exports.changeGoalMacroValue = async (req, res) => {
    try {
        const user = req.user;
        const { macro, newMinValue, newMaxValue } = req.body;
        const macroLowerCase = macro.toLowerCase();
        const macroList = ["protein", "carbs", "fat", "fibre", "sugar", "sodium", "water", "calories"];
        if (!macroList.includes(macroLowerCase)) {
            return res.status(400).send({ message: 'Macro not found' });
        }

        const goals = await getAllGoalsOfUser(await user._id);
        var goal = goals.filter(goal => goal.measurement == macroLowerCase);
        if (goal.length == 0) {
            return res.status(404).send({ message: 'No goal for this macro' });
        }
        goal = goal[0];
        // console.log(goal.minTargetMass, goal.maxTargetMass);
        if (!checkValidMinMaxValues(newMinValue, newMaxValue)) {
            return res.status(400).send({ message: 'Invalid min or max values' });
        }
        goal.minTargetMass = newMinValue;
        goal.maxTargetMass = newMaxValue;
        await goal.save();
        return res.status(200).send({ message: 'Macro value changed', goal: goal });
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

async function getUntrackedMacros(goal){
    var untrackedMacros = ["protein", "carbs", "fat", "fibre", "sugar", "sodium", "water", "calories"];
    for (let i = 0; i < goal.length; i++) {
        const goalMeasurement = await goal[i].measurement;
        untrackedMacros = untrackedMacros.filter(macro => macro != goalMeasurement);
    }
    return untrackedMacros;
}

function checkValidMinMaxValues(min, max) {
    if (!min && !max) {
        return false;
    } else if (min < 0 || max < 0) {
        return false;
    } else if (min > max && max != null) {
        return false;
    }
    return true; 
}