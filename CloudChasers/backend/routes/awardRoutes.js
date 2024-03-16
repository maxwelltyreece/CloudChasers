const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const awardController = require('../controllers/awardController');

const router = express.Router();

router.post('/createAward', userMiddleware, awardController.createAward);
router.get('/getAwards', userMiddleware, awardController.getAwards);

module.exports = router;
