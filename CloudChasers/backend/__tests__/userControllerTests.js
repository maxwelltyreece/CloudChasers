const request = require('supertest');
const app = require('../server');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock the User model functions that are called in the controller
User.findOne = jest.fn();
User.prototype.save = jest.fn().mockImplementation(() => Promise.resolve());

// Mock bcrypt and jwt
bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
jwt.sign = jest.fn().mockReturnValue('fakeTokenString');

describe('POST /register', () => {
  it('should register a new user', async () => {
    // Set up User.findOne to simulate that the user does not already exist
    User.findOne.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/register')
      .send({
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: true, message: 'User created' });
    // Add more assertions as necessary
  });

  // Add more tests for different scenarios, such as when a user already exists
});

// import supertest from 'supertest'
// import app from '../server'

// describe('POST /register', () => {
// 	describe('given a username, email, and password', () => {
// 		test('should register a new user', async () => {
// 			const response = await request(app).post('/register').send({
// 				username: 'username',
// 				email: 'test@email.com',
// 				password: 'password123'
// 			})
// 			expect(response.statusCode).toBe(200)
// 		})
// 		test('should specify json in the contect type header', async () => {
// 			const response = await request(app).post('/register').send({
// 				username: 'username',
// 				email: 'test@email.com',
// 				password: 'password123'
// 			})
// 			expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
// 		})
// 	})

// 	describe('when the user already exists', () => {

// 	})
// })