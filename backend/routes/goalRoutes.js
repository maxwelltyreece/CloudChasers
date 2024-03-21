const express = require('express');
const router = express.Router();

const goalController = require('../controllers/goalsController');
const userMiddleware = require('../middleware/userMiddleware');

router.post('/createGoal', userMiddleware, goalController.createGoal);
router.get('/getAllGoalsOfUser', userMiddleware, goalController.getAllGoalsOfUser);
router.get('/getSingleGoalItem', userMiddleware, goalController.getSingleGoalItem);
router.get('/deleteGoal', userMiddleware, goalController.deleteGoal);
router.post('/updateGoal', userMiddleware, goalController.updateGoal);
router.get('/getMacroGoal', userMiddleware, goalController.getMacroGoal);
router.get('/getUntrackedMacroGoals', userMiddleware, goalController.getUntrackedMacroGoals);
router.post('/changeGoalMacroValue', userMiddleware, goalController.changeGoalMacroValue);


module.exports = router;