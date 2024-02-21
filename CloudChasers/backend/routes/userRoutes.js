const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const communityController = require('../controllers/communityController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.get('/userDetails', userController.getUserDetail);
router.put('/updateProfile', userController.updateProfile);

router.post('/createCommunity', communityController.createCommunity);
router.post('/joinCommunity', communityController.joinCommunity);
router.get('/communityDetails', communityController.getCommunityDetails);

module.exports = router;
