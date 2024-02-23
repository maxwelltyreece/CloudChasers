const { getStats } = require('../controllers/statsController');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');
jest.mock('../models/user');

const mockReq = (body = {}) => ({ body });

const mockRes = () => {
	const res = {};
	res.status = jest.fn().mockReturnValue(res);
	res.send = jest.fn().mockReturnValue(res);
	return res;
};

describe('Streaks', () => {
	it('should return 404 if user is not found', async () => {
		const req = mockReq({ token: 'testToken', today: new Date().toISOString() });
		const res = mockRes();

		jwt.verify.mockImplementation(() => ({ userId: 'testUserId' }));
		User.findById.mockResolvedValue(null);

		await getStats(req, res);

		expect(res.status).toHaveBeenCalledWith(404);
		expect(res.send).toHaveBeenCalledWith({ message: 'User not found' });
	});
	
	it('should return streak of one for fresh user', async () => {
		const req = mockReq({ token: 'testToken', today: new Date().toISOString() });
		const res = mockRes();
		const user = {
			_id: 'testUserId',
			lastLogin: new Date(),
			streak: 0,
			save: jest.fn().mockResolvedValue(true),
		};

		jwt.verify.mockImplementation(() => ({ userId: 'testUserId' }));
		User.findById.mockResolvedValue(user);

		await getStats(req, res);

		expect(user.streak).toBe(1);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith({ streak: 1, message: 'Streak updated' });
	});

	it('should return streak of two for user who logged in yesterday', async () => {
		const req = mockReq({ token: 'testToken', today: new Date().toISOString() });
		const res = mockRes();
		const user = {
			_id: 'testUserId',
			lastLogin: new Date(new Date().setDate(new Date().getDate() - 1)),
			streak: 1,
			save: jest.fn().mockResolvedValue(true),
		};

		jwt.verify.mockImplementation(() => ({ userId: 'testUserId' }));
		User.findById.mockResolvedValue(user);

		await getStats(req, res);

		expect(user.streak).toBe(2);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith({ streak: 2, message: 'Streak updated' });
	});

	it('should reset streak for user who logged in two days ago', async () => {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 2);
		const req = mockReq({ token: 'testToken', today: new Date().toISOString() });
		const res = mockRes();
		const user = {
			_id: 'testUserId',
			lastLogin: yesterday,
			streak: 5,
			save: jest.fn().mockResolvedValue(true),
		};

		jwt.verify.mockImplementation(() => ({ userId: 'testUserId' }));
		User.findById.mockResolvedValue(user);

		await getStats(req, res);

		expect(user.streak).toBe(1);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith({ streak: 1, message: 'Streak updated' });
	});

	// TODO: Add tests for timezone adjustments
	
});

