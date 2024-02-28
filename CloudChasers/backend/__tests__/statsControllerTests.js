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

	it('should reset streak if the date is not consecutive', async () => {
		const response = await request(app)
			.post('/stats/streak')
			.set('Authorization', `Bearer ${token}`)
			.send({ today: new Date(Date.now() + 86400000 * 2).toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('streak');
		expect(response.body.streak).toBe(1);
	});

	it('should return 400 if no date is provided', async () => {
		const response = await request(app)
			.post('/stats/streak')
			.set('Authorization', `Bearer ${token}`);

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'Date not provided');
	});
});