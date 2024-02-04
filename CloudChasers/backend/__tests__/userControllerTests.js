// Import the necessary libraries
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { register, login } = require('../controllers/userController'); // Adjust the path as necessary

// Mock external dependencies
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../models/user');

// Setup common variables
const mockSend = jest.fn();
const mockStatus = jest.fn().mockReturnValue({ send: mockSend });
const mockRes = { status: mockStatus };

describe('User Registration and Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should create a new user if username is not taken', async () => {
      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      const mockReq = { body: { username: 'testUser', password: 'password' } };

      await register(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ username: 'testUser' });
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockSend).toHaveBeenCalledWith({ success: true, message: 'User created' });
    });

    it('should return a 400 if the username is already used', async () => {
      User.findOne.mockResolvedValue(true); // Simulate finding an existing user
      const mockReq = { body: { username: 'testUser', password: 'password' } };

      await register(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockSend).toHaveBeenCalledWith({ message: 'Username already used' });
    });
  });

  describe('login', () => {
    it('should return a token if credentials are valid', async () => {
      User.findOne.mockResolvedValue({ _id: 'userId', password: 'hashedPassword' });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('token');
      const mockReq = { body: { username: 'testUser', password: 'password' } };

      await login(mockReq, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ username: 'testUser' });
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith({ userId: 'userId' }, process.env.SECRET_KEY);
      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockSend).toHaveBeenCalledWith({ data: 'token' });
    });

    it('should return 401 if credentials are invalid', async () => {
      User.findOne.mockResolvedValue(null); // Simulate not finding a user
      const mockReq = { body: { username: 'testUser', password: 'password' } };

      await login(mockReq, mockRes);

      expect(mockStatus).toHaveBeenCalledWith(401);
      expect(mockSend).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });
  });

  // Additional tests for getUsers function can be added here following a similar pattern.
});
