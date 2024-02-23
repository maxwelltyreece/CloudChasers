const express = require('express');

const router = express.Router();
const statsController = require('../controllers/statsController');

router.post('/streaks', statsController.getStreaks);

module.exports = router;