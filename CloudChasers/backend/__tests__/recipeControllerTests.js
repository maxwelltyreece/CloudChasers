if (process.env.NODE_ENV === 'test') {
require('dotenv').config({ path: '.env.test' });
}

const jwt = require('jsonwebtoken');

// const token = jwt.sign({ userID: 'testUserID' }, process.env.SECRET_KEY);

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/user');
const userDay = require('../models/userDay');
const userDayMeal = require('../models/userDayMeal');
const mealItem = require('../models/mealItem');
const foodItem = require('../models/foodItem');
const food = require('../models/food');

const Recipe = require('../models/recipe');

describe('POST /recipes', () => {
	let user, community, token;

	beforeAll(async () => {
		await mongoose.connect('mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/mockDatabase?retryWrites=true&w=majority');

		// Create a test user
		user = await User.create({
			forename: 'John',
			surname: 'Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			password: 'securepassword',
			dateOfBirth: new Date(1990, 0, 1),
			});

		token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

		community = new mongoose.Types.ObjectId();
		});

	afterEach(async () => {
		// Clean up the database
		const collections = await mongoose.connection.db.collections();
		for (let collection of collections) {
			await collection.deleteMany({});
		}
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	it('should create a new recipe and save it to the database', async () => {
		const recipeData = {
			name: 'Integration Test Recipe',
			description: 'A test recipe for integration testing',
			communityThatOwnsRecipe: community.toString(),
		};

		const response = await request(app)
			.post('/food/createNewRecipeByUser')
			.set('Authorization', `Bearer ${token}`)
			.send(recipeData);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('message', 'Recipe created');
		expect(response.body.data).toMatchObject({
			name: recipeData.name,
			description: recipeData.description,
			createdBy: user._id.toString(),
			communityThatOwnsRecipe: community.toString(),
		});

		const recipe = await Recipe.findOne({ name: recipeData.name });
		expect(recipe).toBeTruthy();
		expect(recipe.description).toBe(recipeData.description);
		expect(recipe.createdBy.toString()).toBe(user._id.toString());
		expect(recipe.communityThatOwnsRecipe.toString()).toBe(community.toString());
	});

	});

