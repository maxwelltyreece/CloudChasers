const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const router = express.Router();
const userController = require('../controllers/userController');
const communityController = require('../controllers/communityController');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);

router.get('/userDetails', userMiddleware, userController.getUserDetail);
router.put('/updateProfile', userMiddleware, userController.updateProfile);
router.get('/userDays', userMiddleware, userController.getUserDays);

router.post('/createCommunity', userMiddleware, communityController.createCommunity);
router.post('/joinCommunity', userMiddleware, communityController.joinCommunity);
router.get('/communityDetails', userMiddleware, communityController.getCommunityDetails);

module.exports = router;
