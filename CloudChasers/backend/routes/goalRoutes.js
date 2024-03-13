const express = require('express');
const router = express.Router();

const goalController = require('../controllers/goalsController');
const userMiddleware = require('../middleware/userMiddleware');

router.post('/createGoal', userMiddleware, goalController.createGoal);

module.exports = router;