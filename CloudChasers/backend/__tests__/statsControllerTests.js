if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' });
}

const jwt = require('jsonwebtoken');

const token = jwt.sign({ userID: 'testUserID' }, process.env.SECRET_KEY);

const request = require('supertest');
const app = require('../server');

const userDay = require('../models/userDay');
const userDayMeal = require('../models/userDayMeal');
const mealItem = require('../models/mealItem');
const foodItem = require('../models/foodItem');
const food = require('../models/food');

jest.mock('../models/user', () => ({ findById: jest.fn() }));
jest.mock('../models/userDay', () => ({ findOne: jest.fn() }));
jest.mock('../models/userDayMeal', () => ({ findAll: jest.fn() }));
jest.mock('../models/mealItem', () => ({ findAll: jest.fn() }));
jest.mock('../models/foodItem', () => ({ findAll: jest.fn() }));
jest.mock('../models/food', () => ({ findById: jest.fn() }));

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
});

describe('Daily Caloric Intake Endpoint', () => {
	it('should return 200 and the total caloric intake for the day', async () => {
		userDay.findOne.mockResolvedValue({ _id: 'testUserDayID', date: new Date().toISOString(), userID: 'testUserID' });
		userDayMeal.find.mockResolvedValue([{ name: 'Lunch', userDayID: 'testUserDayID' }, { name: 'Dinner', userDayID: 'testUserDayID2'}]);
		mealItem.find.mockResolvedValue([{ name: 'testmealItem', userDayMealID: 'testUserDayMealID' }, { name: 'testmealItem2', userDayMealID: 'testUserDayMealID2' }]);
		foodItem.find.mockResolvedValue([{ _id: 'testFoodItemID',  weight: 100, foodID: 'testFoodID' }, { _id: 'testFoodItemID2',  weight: 100, foodID: 'testFoodID' }]);
		food.findById.mockResolvedValue({ calories: 100 });

		const response = await request(app)
			.post('/stats/daily-caloric-intake')
			.set('Authorization', `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('totalCalories');
	});

	it('should return 400 if no data is found for the day', async () => {
		const response = await request(app)
			.post('/stats/daily-caloric-intake')
			.set('Authorization', `Bearer ${token}`)
			.send({ date: new Date(Date.now() - 86400000).toISOString() });

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'No data for this day.');
	});

	it('should return 400 if no meals are found for the day', async () => {
		const response = await request(app)
			.post('/stats/daily-caloric-intake')
			.set('Authorization', `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'No meals for this day.');
	});
});

