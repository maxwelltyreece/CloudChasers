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
const createUserDayMeal = require('../controllers/foodController').createUserDayMeal;
jest.mock('../models/user', () => ({ findById: jest.fn() }));
// Mock UserDay model
jest.mock('../models/userDay', () => ({findOne: jest.fn(), save: jest.fn()}));
jest.mock('../models/userDayMeal', () => ({ findOne: jest.fn() }));


jest.mock('../models/food', () => {
	return {
	  findById: jest.fn(),
	  find: jest.fn().mockImplementation(() => {
		return {
			skip: jest.fn().mockReturnThis(), // Ensure chaining by returning 'this'
			limit: jest.fn().mockResolvedValue([
				{ _id: 'mockedId1', name: 'apple', calories: 50 },
				{ _id: 'mockedId2', name: 'banana', calories: 100 },
			]),
		};
	  }),
	  countDocuments: jest.fn().mockResolvedValue(2),
	};
});

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

	beforeEach(() => {
		jest.clearAllMocks();
	});

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

describe('searchFoods Endpoint', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return 200 and the correct foods for a valid request', async () => {

		const response = await request(app)
			.get('/food/searchFoods')
			.query({ page: 1, limit: 2, name: 'a' });

		expect(response.error).toBe(false);
		expect(response.body.foods).toEqual([
			{ _id: 'mockedId1', name: 'apple', calories: 50 },
			{ _id: 'mockedId2', name: 'banana', calories: 100 }
		]);
		expect(response.body.totalPages).toBe(1);
		expect(response.body.page).toBe("1");
		expect(response.body.limit).toBe("2");
		expect(response.statusCode).toBe(200);
	});


    it('should return 404 when no foods are found', async () => {
        // Mock Food.find to return an empty array
        food.find.mockImplementation(() => {
            return {
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue([])
            };
        });

        food.countDocuments.mockResolvedValue(0);

        const response = await request(app)
            .get('/food/searchFoods')
            .query({ name: 'nonexistent' });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('No foods found');
    });

	it('should return 400 for invalid query parameters', async () => {
		const response = await request(app)
		  .get('/food/searchFoods')
		  .query({ invalidField: 'invalidValue', anotherInvalidField: 'anotherValue' });
	
		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBeDefined();
		expect(response.body.error).toContain('Invalid field(s):');
		expect(response.body.error).toContain('invalidField');
		expect(response.body.error).toContain('anotherInvalidField');
	  });

	it('should handle search with exact match for numeric fields', async () => {
	// Mocking the Food model's response for an exact match
	food.find.mockImplementationOnce(() => ({
		skip: jest.fn().mockReturnThis(),
		limit: jest.fn().mockResolvedValue([{ _id: 'mockedId1', name: 'apple', calories: 100 }])
	}));
	food.countDocuments.mockResolvedValueOnce(1);

	const response = await request(app)
		.get('/food/searchFoods')
		.query({ page: 1, limit: 10, calories: 100 });

	expect(response.statusCode).toBe(200);
	expect(response.body.foods).toHaveLength(1);
	expect(response.body.foods[0].calories).toBe(100);
	});

	it('should handle search with greater than condition for numeric fields', async () => {
	// Mocking the Food model's response for a $gte query
	food.find.mockImplementationOnce(() => ({
		skip: jest.fn().mockReturnThis(),
		limit: jest.fn().mockResolvedValue([{ _id: 'mockedId2', name: 'banana', calories: 150 }])
	}));
	food.countDocuments.mockResolvedValueOnce(1);

	const response = await request(app)
		.get('/food/searchFoods')
		.query({ page: 1, limit: 10, calories: { min: 150 } });

	expect(response.statusCode).toBe(200);
	expect(response.body.foods).toHaveLength(1);
	expect(response.body.foods[0].calories).toBeGreaterThanOrEqual(150);
	});

	it('should handle search with less than condition for numeric fields', async () => {
	// Mocking the Food model's response for a $lte query
	food.find.mockImplementationOnce(() => ({
		skip: jest.fn().mockReturnThis(),
		limit: jest.fn().mockResolvedValue([{ _id: 'mockedId3', name: 'orange', calories: 49 }])
	}));
	food.countDocuments.mockResolvedValueOnce(1);

	const response = await request(app)
		.get('/food/searchFoods')
		.query({ page: 1, limit: 10, calories: { max: 50 } });

	expect(response.statusCode).toBe(200);
	expect(response.body.foods).toHaveLength(1);
	expect(response.body.foods[0].calories).toBeLessThanOrEqual(50);
	});

	it('should handle search with inbetween conditions conditions for numeric fields', async () => {
		// Mocking the Food model's response for a $gte and $lte query
		food.find.mockImplementationOnce(() => ({
			skip: jest.fn().mockReturnThis(),
			limit: jest.fn().mockResolvedValue([{ _id: 'mockedId4', name: 'pear', calories: 75 }])
		}));
		food.countDocuments.mockResolvedValueOnce(1);
	
		const response = await request(app)
			.get('/food/searchFoods')
			.query({ page: 1, limit: 10, calories: { min: 50, max: 100 } });
	
		expect(response.statusCode).toBe(200);
		expect(response.body.foods).toHaveLength(1);
		expect(response.body.foods[0].calories).toBeGreaterThanOrEqual(50);
		expect(response.body.foods[0].calories).toBeLessThanOrEqual(100);
	});
});

  