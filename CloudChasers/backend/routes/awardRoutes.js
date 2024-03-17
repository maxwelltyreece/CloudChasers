const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const awardController = require('../controllers/awardController');

const router = express.Router();

router.post('/createAward', userMiddleware, awardController.createAward);
router.get('/getAllAwards', userMiddleware, awardController.getAllAwards);
router.get('/getAward', userMiddleware, awardController.getAward);
router.post('/awardUser', userMiddleware, awardController.awardUser);
router.get('/getUserAwards', userMiddleware, awardController.getUserAwards);
router.get('/getAwardsToBeIssued', userMiddleware, awardController.getAwardsToBeIssued);

module.exports = router;
