if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' });
}

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const token = jwt.sign({ userID: 'testUserID' }, process.env.SECRET_KEY);

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/user');
const UserDay = require('../models/userDay');
const UserDayMeal = require('../models/userDayMeal');
const MealItem = require('../models/mealItem');
const FoodItem = require('../models/foodItem');
const RecipeItem = require('../models/recipeItem');
const RecipeQuantity = require('../models/recipeQuantity');
const Food = require('../models/food');

const Recipe = require('../models/recipe');
describe('POST /register', () => {
	beforeAll(async () => {
	  await mongoose.connect(process.env.DATABASE_URL);
	});
  
	beforeEach(async () => {
	  // Clear the users before each test to ensure a clean state
	  await User.deleteMany({});
	});
  
	afterAll(async () => {
		await User.deleteMany({});
		await mongoose.disconnect();
	});
  
	it('should register a new user', async () => {
		const newUser = {
			forename: 'forename',
			surname: 'surname',
			username: 'newUsername',
			email: 'example@email.com',
			password: 'password123',
			dateOfBirth: '1990-01-01',
			lastLogin: '2022-01-01',
		};
  
		// No need to check for existing user as the beforeEach ensures the DB is clean
		const response = await request(app).post('/register').send(newUser);
	
		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe('User created');
	
		// Verify the user was created in the database
		const user = await User.findOne({ username: newUser.username });
		expect(user).toBeTruthy();
		expect(user.username).toBe(newUser.username);
		expect(user.email).toBe(newUser.email);
		expect(bcrypt.compareSync(newUser.password, user.password)).toBe(true); // Ensure password is hashed
	});
  
	it('should specify json in the content type header', async () => {
		const newUser = {
			forename: 'forename',
			surname: 'surname',
			username: 'usernameJson',
			email: 'json@example.com',
			password: 'password1234',
			dateOfBirth: '1990-01-01',
			lastLogin: '2022-01-01',
		};
	
		const response = await request(app).post('/register').send(newUser);
		expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
	});
  
	it('when username already exists, should return a 400 error', async () => {
		const existingUser = {
			forename: 'forename',
			surname: 'surname',
			username: 'existingUsername',
			email: 'exist@example.com',
			password: 'password12345',
			dateOfBirth: '1990-01-01',
			lastLogin: '2022-01-01',
		};
	
		// Create a user directly in the database
		await new User(existingUser).save();
	
		// Try to register a user with the same username
		existingUser.email = 'newemail@example.com'; // Change email to avoid email duplication error
		const response = await request(app).post('/register').send(existingUser);
	
		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe('Username already used');
	});
  
	it('when email already exists, should return a 400 error', async () => {
		const existingUser = {
			forename: 'forename',
			surname: 'surname',
			username: 'uniqueUsername',
			email: 'emailExist@example.com',
			password: 'password67890',
			dateOfBirth: '1990-01-01',
			lastLogin: '2022-01-01',
		};
	
		// Create a user directly in the database
		await new User(existingUser).save();
	
		// Try to register a user with the same email
		existingUser.username = 'newUniqueUsername'; // Change username to avoid username duplication error
		const response = await request(app).post('/register').send(existingUser);
	
		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe('Email already used');
	});
});
  
// describe('POST /login', () => {
// 	beforeEach(() => {
// 		bcrypt.compare.mockResolvedValue(true);
// 	});

// 	describe('given a username and password', () => {

// 		test('should login a user', async () => {
// 			// Set up User.findOne to simulate that the user exists
// 			User.findOne.mockResolvedValueOnce({ username: 'username', password: 'hashedPassword' });
// 			// Set up bcrypt.compare to simulate that the password is correct
// 			bcrypt.compare.mockResolvedValueOnce(true);
// 			const response = await request(app).post('/login').send({
// 				username: 'username',
// 				password: 'password123'
// 			});
// 			expect(response.statusCode).toBe(200);
// 			expect(response.body).toEqual({ data: 'fakeTokenString' });
// 			expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
// 		});

// 		test('should specify json in the content type header', async () => {
// 			// Set up User.findOne to simulate that the user exists
// 			User.findOne.mockResolvedValueOnce({ username: 'username', password: 'hashedPassword' });
// 			// Set up bcrypt.compare to simulate that the password is correct
// 			bcrypt.compare.mockResolvedValueOnce(true);
// 			const response = await request(app).post('/login').send({
// 				username: 'username',
// 				password: 'password123'
// 			});
// 			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
// 		});

// 		test('when user does not exist', async () => {
// 			// Set up User.findOne to simulate that the user does not exist
// 			User.findOne.mockResolvedValueOnce(null);
// 			const response = await request(app).post('/login').send({
// 				username: 'username',
// 				password: 'password123'
// 			});
// 			expect(response.statusCode).toBe(401);
// 			expect(response.body).toEqual({ message: 'Invalid credentials' });
// 		});

// 		test('when password is incorrect', async () => {
// 			// Set up User.findOne to simulate that the user exists
// 			User.findOne.mockResolvedValueOnce({ username: 'username', password: 'hashedPassword' });
// 			// Set up bcrypt.compare to simulate that the password is incorrect
// 			bcrypt.compare.mockResolvedValueOnce(false);
// 			const response = await request(app).post('/login').send({
// 				username: 'username',
// 				password: 'password123'
// 			});
// 			expect(response.statusCode).toBe(401);
// 			expect(response.body).toEqual({ message: 'Invalid credentials' });
// 		});
// 		// test('return 500 if an error occurs', async () => {

// 	});
// });
