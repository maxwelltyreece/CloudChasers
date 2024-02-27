const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);

router.get('/userDetails', userMiddleware, userController.getUserDetail);
router.put('/updateProfile', userMiddleware, userController.updateProfile);
router.get('/userDays', userMiddleware, userController.getUserDays);



module.exports = router;
