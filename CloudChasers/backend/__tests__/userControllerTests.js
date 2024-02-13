const request = require('supertest');
const app = require('../server');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models/user');

// Mock bcrypt and jwt
bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
jwt.sign = jest.fn().mockReturnValue('fakeTokenString');

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
