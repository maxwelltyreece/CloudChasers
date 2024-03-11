if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' });
}

const jwt = require('jsonwebtoken');

const token = jwt.sign({ userID: 'testUserID' }, process.env.SECRET_KEY);

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const userDay = require('../models/userDay');
const userDayMeal = require('../models/userDayMeal');
const mealItem = require('../models/mealItem');
const foodItem = require('../models/foodItem');
const food = require('../models/food');

jest.mock('../models/user', () => ({ findById: jest.fn() }));
// Mock UserDay model
jest.mock('../models/userDay', () => ({findOne: jest.fn(), save: jest.fn()}));
jest.mock('../models/userDayMeal', () => ({ findOne: jest.fn() }));
jest.mock('../models/food', () => ({ findById: jest.fn() }));
jest.mock(userDay, () => {
	return jest.fn().mockImplementation(() => {
		return {
			findOne: jest.fn().mockResolvedValue(null),
			save: jest.fn().mockResolvedValue(true),
		}
	})
});
jest.mock('../models/user', () => ({
	findById: jest.fn().mockResolvedValue({
		_id: 'testUserID',
		save: jest.fn().mockResolvedValue(true),
	}),
}));


describe('logDatabaseFood Endpoint', () => {
	it('should return 200 and log the food for authenticated request', async () => {
		const foodID = new mongoose.Types.ObjectId();
		const userDayID = new mongoose.Types.ObjectId();
		const userDayMealID = new mongoose.Types.ObjectId();
		userDay.findOne.mockResolvedValue({ _id: userDayID });
		userDayMeal.findOne.mockResolvedValue({ _id: userDayMealID , name: 'breakfast' , userDayID: 'testUserDayID' });
		// userDay.findOne.mockResolvedValue(null);
		// userDay.save.mockResolvedValue(true);
		// userDayMeal.findOne.mockResolvedValue(null);
		food.findById.mockResolvedValue({ _id: foodID, name: "butter", calories: 100, save: jest.fn().mockResolvedValue(true) });


		const response = await request(app)
			.post('/food/logDatabaseFood')
			.set('Authorization', `Bearer ${token}`)
			.send({ 
				mealType: 'breakfast', 
				food_id: 'testFoodID', 
				weight: 100
			})
			
		expect(response.error).toBe(false);
		expect(response.body.message).toBe('Food logged');
		expect(response.statusCode).toBe(200);
	});

	
});