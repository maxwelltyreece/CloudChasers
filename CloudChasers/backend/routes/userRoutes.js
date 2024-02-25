const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const firebaseController = require('../controllers/firebaseImageController.js');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.get('/getProfilePicURL', firebaseController.getProfilePicURL);
router.post('/uploadProfilePic', firebaseController.uploadProfilePic);

module.exports = router;
