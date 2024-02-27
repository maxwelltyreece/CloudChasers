const express = require('express');

const router = express.Router();
const userMiddleware = require('../middleware/userMiddleware');
const statsController = require('../controllers/statsController');

router.post('/streaks', userMiddleware, statsController.getStreaks);

module.exports = router;