const express = require('express');

const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const statsController = require('../controllers/statsController');

router.post('/streak', userMiddleware, statsController.getStreaks);
router.post('/daily-caloric-intake', userMiddleware, statsController.getDailyCaloricIntake);

module.exports = router;