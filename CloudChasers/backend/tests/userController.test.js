const userController = require('../controllers/userController');
const userModel = require('../models/user');

test('userController.getUserById', () => {
	expect(userController.getUserById).toBe(userModel.getUserById);
});
