const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const router = express.Router();
const communityController = require('../controllers/communityController');


router.post('/create', userMiddleware, communityController.createCommunity);
router.post('/join', userMiddleware, communityController.joinCommunity);
router.get('/details', userMiddleware, communityController.getCommunityDetails);

module.exports = router;
