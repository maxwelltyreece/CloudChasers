const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const router = express.Router();
const userController = require('../controllers/userController');
const firebaseController = require('../controllers/firebaseImageController.js');


router.get('/', (req, res) => {
    res.send('Welcome to GOBL API');
});

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/users', userController.getUsers);
router.get('/userDetails', userMiddleware, userController.getUserDetail);
router.get('/userDays', userMiddleware, userController.getUserDays);

router.put('/updateProfile', userMiddleware, userController.updateProfile);



module.exports = router;
