const request = require('supertest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../server');
const User = require('../models/user');

const jest = require('jest');
import { expect, describe, beforeEach, test } from 'jest';



jest.mock('../models/user');
jest.mock('bcrypt');

bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
jwt.sign = jest.fn().mockReturnValue('fakeTokenString');

beforeEach(() => {
	jest.clearAllMocks();
});

describe('POST /register', () => {
	describe('given a username, email, and password', () => {
		test('should register a new user', async () => {
			const response = await request(app).post('/register').send({
				username: 'username',
				email: 'test@email.com',
				password: 'password123'
			});
			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual({ success: true, message: 'User created' });
		});

		test('should specify json in the content type header', async () => {
			const response = await request(app).post('/register').send({
				username: 'username',
				email: 'test@email.com',
				password: 'password123'
			});
			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
		});

		test('when username already exists', async () => {
			// Set up User.findOne to simulate that the user already exists
			User.findOne.mockResolvedValueOnce({ username: 'existingUser' });
			const response = await request(app).post('/register').send({
				username: 'existingUser',
				email: 'test@email.com',
				password: 'password123'
			});
			expect(response.statusCode).toBe(400);
			expect(response.body).toEqual({ message: 'Username already used' });
		});

		test('when email already exists', async () => {
			// Set up User.findOne to simulate that the email already exists
			User.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce({ email: 'test@email.com' });
				const response = await request(app).post('/register').send({
				username: 'newUser',
				email: 'test@email.com',
				password: 'password123'
			});
			expect(response.statusCode).toBe(400);
			expect(response.body).toEqual({ message: 'Email already used' });
		});

		// test('return 400 if an error occurs', async () => {

	});
});

describe('POST /login', () => {
	beforeEach(() => {
		bcrypt.compare.mockResolvedValue(true);
	});

	describe('given a username and password', () => {

		test('should login a user', async () => {
			// Set up User.findOne to simulate that the user exists
			User.findOne.mockResolvedValueOnce({ username: 'username', password: 'hashedPassword' });
			// Set up bcrypt.compare to simulate that the password is correct
			bcrypt.compare.mockResolvedValueOnce(true);
			const response = await request(app).post('/login').send({
				username: 'username',
				password: 'password123'
			});
			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual({ data: 'fakeTokenString' });
			expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
		});

		test('should specify json in the content type header', async () => {
			// Set up User.findOne to simulate that the user exists
			User.findOne.mockResolvedValueOnce({ username: 'username', password: 'hashedPassword' });
			// Set up bcrypt.compare to simulate that the password is correct
			bcrypt.compare.mockResolvedValueOnce(true);
			const response = await request(app).post('/login').send({
				username: 'username',
				password: 'password123'
			});
			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
		});

		test('when user does not exist', async () => {
			// Set up User.findOne to simulate that the user does not exist
			User.findOne.mockResolvedValueOnce(null);
			const response = await request(app).post('/login').send({
				username: 'username',
				password: 'password123'
			});
			expect(response.statusCode).toBe(401);
			expect(response.body).toEqual({ message: 'Invalid credentials' });
		});

		test('when password is incorrect', async () => {
			// Set up User.findOne to simulate that the user exists
			User.findOne.mockResolvedValueOnce({ username: 'username', password: 'hashedPassword' });
			// Set up bcrypt.compare to simulate that the password is incorrect
			bcrypt.compare.mockResolvedValueOnce(false);
			const response = await request(app).post('/login').send({
				username: 'username',
				password: 'password123'
			});
			expect(response.statusCode).toBe(401);
			expect(response.body).toEqual({ message: 'Invalid credentials' });
		});
		// test('return 500 if an error occurs', async () => {

	});
});
