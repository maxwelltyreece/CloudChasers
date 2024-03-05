const express = require('express');

const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const statsController = require('../controllers/statsController');

router.get('/daily-caloric-intake', userMiddleware, statsController.getDailyCaloricIntake);
router.put('/streak', userMiddleware, statsController.getStreaks);

module.exports = router;