const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const router = express.Router();
const communityController = require('../controllers/communityController');


router.post('/create', userMiddleware, communityController.createCommunity);
router.post('/join', userMiddleware, communityController.joinCommunity);
router.get('/details', userMiddleware, communityController.getCommunityDetails);
router.get('/members', userMiddleware, communityController.getCommunityMembers);
router.get('/isAdmin', userMiddleware, communityController.getAdminStatus);
router.get('/all', userMiddleware, communityController.getAllCommunities);

module.exports = router;