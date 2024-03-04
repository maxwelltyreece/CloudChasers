const express = require('express');

const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const statsController = require('../controllers/statsController');

router.put('/streak', userMiddleware, statsController.getStreaks);
router.get('/daily-caloric-intake', userMiddleware, statsController.getDailyCaloricIntake);

module.exports = router;