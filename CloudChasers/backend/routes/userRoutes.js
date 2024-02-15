const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);
router.get('/userDetails', userController.getUserDetail)
router.put('/updateProfile', userController.updateProfile)

module.exports = router;
