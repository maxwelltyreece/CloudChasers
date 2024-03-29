const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');

const router = express.Router();
const communityController = require('../controllers/communityController');

router.post('/create', userMiddleware, communityController.createCommunity);
router.post('/join', userMiddleware, communityController.joinCommunity);
router.post('/makePost', userMiddleware, communityController.makePost);
router.post('/acceptRequest', userMiddleware, communityController.acceptRequest);
router.post('/denyRequest', userMiddleware, communityController.denyRequest);

router.get('/details', userMiddleware, communityController.getCommunityDetails);
router.get('/members', userMiddleware, communityController.getCommunityMembers);
router.get('/role', userMiddleware, communityController.getUserRole);
router.get('/all', userMiddleware, communityController.getAllCommunities);
router.get('/userCommunities', userMiddleware, communityController.getUserCommunities);
router.get('/posts', userMiddleware, communityController.getCommunityPosts);
router.get('/requests', userMiddleware, communityController.getPendingRequests);

router.put('/delete', userMiddleware, communityController.deleteCommunity);
router.put('/leave', userMiddleware, communityController.leaveCommunity);
router.put('/removeMember', userMiddleware, communityController.removeMember);
router.put('/updateDesc', userMiddleware, communityController.updateCommunityDesc);
router.put('/updateJoinPrivacy', userMiddleware, communityController.updateJoinPrivacy);

module.exports = router;
