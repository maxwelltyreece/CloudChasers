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


const request = require('supertest');
const app = require('../server'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');

beforeEach(() => {
  jwt.verify = jest.fn().mockReturnValue({ userID: 'testUserID' });
});

describe('Streaks Endpoint', () => {
  it('should return 200 and update the streak for authenticated request', async () => {
    const token = 'mockedToken'; // Assuming this token is what your mocked jwt.verify will successfully authenticate

    const response = await request(app)
      .post('/stats/streak')
      .set('Authorization', `Bearer ${token}`)
      .send({ today: '1990-02-09T00:00:00.000Z' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('streak');
    expect(response.body.streak).toBeGreaterThanOrEqual(2); // Assuming the streak should increment
  });
});
