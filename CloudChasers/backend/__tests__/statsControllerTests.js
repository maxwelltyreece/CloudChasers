const request = require('supertest');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

jest.mock('jsonwebtoken');
jest.mock('../models/user');

describe('getStreaks', () => {
	it('should increment streaks on consecutive logins', async () => {
		const user = {
			_id: 'testID',
			lastLogin: new Date() - 1, // yesterday
			streaks: 1,
			save: jest.fn().mockResolvedValue(true),
		};
		User.findById.mockResolvedValue(user);
		jwt.verify.mockReturnValue({userId: user._id});

		const today = new Date();

		const req = { body: { token: 'testToken' } };
		const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

		await getStreaks(req, res, today);

		expect(user.streaks).toBe(2);
		expect(user.save).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith({ streak: 2, message: 'Streak updated' });
	}); 
});