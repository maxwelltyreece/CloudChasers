const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const firebaseController = require('../controllers/firebaseController.js');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.get('/getFirebaseImage', firebaseController.getFirebaseImage);

module.exports = router;
