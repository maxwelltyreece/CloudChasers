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
jest.mock('../models/userDayMeal', () => ({ find: jest.fn() }));
jest.mock('../models/mealItem', () => ({ find: jest.fn() }));
jest.mock('../models/foodItem', () => ({ findById: jest.fn() }));
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
		userDay.findOne.mockResolvedValue({ _id: 'testUserDayID', date: new Date().toISOString(), userID: 'testUserID', save: jest.fn().mockResolvedValue(true)});
		userDayMeal.find.mockResolvedValue([ { _id: 'testUserDayMealID', name: 'Dinner', userDayID: 'testUserDayID2', save: jest.fn().mockResolvedValue(true)}]);
		mealItem.find.mockResolvedValue([{ _id: 'testMealItemID', name: 'testmealItem', foodItemID: 'testFoodItemID', userDayMealID: 'testUserDayMealID', save: jest.fn().mockResolvedValue(true) }, { _id: 'testMealItemID2', name: 'testmealItem2', foodItemID: 'testFoodItemID', userDayMealID: 'testUserDayMealID', save: jest.fn().mockResolvedValue(true) }]);
		// foodItem.findById.mockResolvedValue([{ _id: 'testFoodItemID',  weight: 100, foodID: 'testFoodID', save: jest.fn().mockResolvedValue(true) }, { _id: 'testFoodItemID2',  weight: 100, foodID: 'testFoodID2',save: jest.fn().mockResolvedValue(true) }]);
		// food.findById.mockResolvedValue([{ _id: 'testFoodID', calories: 100, save: jest.fn().mockResolvedValue(true) }, { _id: 'testFoodID2', calories: 200, save: jest.fn().mockResolvedValue(true) }]);
		foodItem.findById.mockResolvedValue({ _id: 'testFoodItemID',  weight: 200, foodID: 'testFoodID', save: jest.fn().mockResolvedValue(true) });
		food.findById.mockResolvedValue({ _id: 'testFoodID', calories: 100, save: jest.fn().mockResolvedValue(true) });

		const response = await request(app)
			.get('/stats/dailyCaloricIntake?date=' + new Date().toISOString())
			.set('Authorization', `Bearer ${token}`)
			// .send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('totalCalories');
		expect(response.body.totalCalories).toBe(400);
	});

	it('should return 400 if no data is found for the day', async () => {
		const response = await request(app)
			.get('/stats/dailyCaloricIntake?date=' + new Date(Date.now() - 86400000).toISOString())
			.set('Authorization', `Bearer ${token}`)
			// .send({ date: new Date(Date.now() - 86400000).toISOString() });

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'No data for this day.');
	});

	it('should return 400 if no meals are found for the day', async () => {
		const response = await request(app)
			.get('/stats/dailyCaloricIntake?date=' + new Date().toISOString())
			.set('Authorization', `Bearer ${token}`)
			// .send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'No meals for this day.');
	});
});

