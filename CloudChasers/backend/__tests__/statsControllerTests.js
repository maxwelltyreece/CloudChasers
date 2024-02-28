// const request = require('supertest');
// const app = require('../server'); 
// const jwt = require('jsonwebtoken');

// jest.mock('jsonwebtoken', () => ({
// 	verify: jest.fn().mockReturnValue({ userID: 'testUserID' }),
// }));

// jest.mock('../models/user', () => ({
// 	findById: jest.fn().mockImplementation((id) => {
// 		if (id === 'testUserID') {
// 			return Promise.resolve({
// 				_id: 'testUserID',
// 				lastLogin: new Date.toISOString(),
// 				streak: 1,
// 				save: jest.fn().mockResolvedValue(true),
// 			});
// 		}
// 		return Promise.resolve(null);
// 	}),
// }));

// describe('Streaks', () => {
// 	afterAll(() => {
// 		jest.resetAllMocks();
// 	});

// 	it('should return 401 if no token is provided', async () => {
// 		const response = await request(app)
// 		.post('/stats/streak');
// 		expect(response.statusCode).toBe(401);
// 		expect(response.body).toHaveProperty('message', 'Unauthorized2');
// 	});

// 	it('should return 404 if user is not found', async () => {
// 		jwt.verify = jest.fn().mockReturnValue({ userID: 'nonExistentUserID' });
// 		const response = await request(app)
// 			.post('/stats/streak')
// 			.set('Authorization', 'Bearer mockedToken');
			
// 		expect(response.statusCode).toBe(404);
// 		expect(response.body).toHaveProperty('message', 'User not found');
// 	});

// 	it('should return 200 and update the streak for authenticated request', async () => {
// 		const response = await request(app)
// 			.post('/stats/streak')
// 			.set('Authorization', 'Bearer mockedToken')
// 			.send({ today: new Date().toISOString() });

// 		expect(response.statusCode).toBe(200);
// 		expect(response.body).toHaveProperty('streak');
// 		expect(response.body.streak).toBe(2);
// 	});
// });


// const request = require('supertest');
// const app = require('../server'); 
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');

// const mockUser = {
// 	_id: 'testUserID',
// 	lastLogin: new Date().toISOString(),
// 	streak: 1,
// 	save: jest.fn().mockResolvedValue(true),
// };

// beforeEach(() => {
// 	User.findOne = jest.fn().mockResolvedValue(() => mockUser);
// 	User.prototype.save = jest.fn().mockResolvedValue(true);
// 	mockUser.lastLogin = new Date().toISOString();
// });


// beforeEach(() => {
// 	jwt.verify = jest.fn().mockReturnValue({ userID: 'testUserID' });
// 	User.findById = jest.fn().mockResolvedValue({
// 		_id: 'testUserID',
// 		lastLogin: new Date(Date.now() - 86400000).toISOString(),
// 		streak: 0,
// 		save: jest.fn().mockResolvedValue(true),
// 	});
// });
// describe('Streaks Endpoint', () => {
// 	it('should return 200 and update the streak for authenticated request', async () => {
// 		// mockUser.lastLogin = new Date(Date.now() - 86400000).toISOString();
// 		const token = 'mockedToken'; 

// 		const response = await request(app)
// 			.post('/stats/streak')
// 			.set('Authorization', `Bearer ${token}`)
// 			.send({ today: new Date().toISOString()});

// 		expect(response.statusCode).toBe(200);
// 		expect(response.body).toHaveProperty('streak');
// 		expect(response.body.streak).toBe(2); 
// 	});
// });

if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' });
}

const jwt = require('jsonwebtoken');

const token = jwt.sign({ userID: 'testUserID' }, process.env.SECRET_KEY);

const request = require('supertest');
const app = require('../server');

jest.mock('../models/user', () => ({
	findById: jest.fn().mockResolvedValue({
		_id: 'testUserID',
		lastLogin: new Date(Date.now() - 86400000).toISOString(),
		streak: 1,
		save: jest.fn().mockResolvedValue(true),
	}),
}));

describe('Streaks Endpoint', () => {
	it('should return 200 and update the streak for authenticated request', async () => {
		const response = await request(app)
			.post('/stats/streak')
			.set('Authorization', `Bearer ${token}`)
			.send({ today: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('streak');
		expect(response.body.streak).toBe(2);
	});

	it('should return consecutive days streak', async () => {
		const response = await request(app)
			.post('/stats/streak')
			.set('Authorization', `Bearer ${token}`)
			.send({ today: new Date(Date.now() + 86400000).toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('streak');
		expect(response.body.streak).toBe(3);
	});

	it('should not update streak if the date is the same', async () => {
		const response = await request(app)
			.post('/stats/streak')
			.set('Authorization', `Bearer ${token}`)
			.send({ today: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('streak');
		expect(response.body.streak).toBe(3);
	});
});