const request = require('supertest');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const app = require('../server'); 

jest.mock('jsonwebtoken');
jest.mock('../models/user');

describe('GET /streaks', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 404 if user not found', async () => {
    jwt.verify.mockReturnValueOnce({ userId: 'someUserId' });
    User.findById.mockResolvedValueOnce(null);

    const res = await request(app).post('/streaks').send({ token: 'someToken' });

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ message: 'User not found' });
  });

  it('should return 200 and update streak if user found', async () => {
    const mockUser = {
      _id: 'someUserId',
      lastLogin: new Date('2022-01-01T00:00:00Z'),
      streak: 1,
      save: jest.fn().mockResolvedValueOnce(),
    };
    jwt.verify.mockReturnValueOnce({ userId: 'someUserId' });
    User.findById.mockResolvedValueOnce(mockUser);

    jest.setSystemTime(new Date('2022-01-02T00:00:00Z'));

    const res = await request(app).post('/streaks').send({ token: 'someToken' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ streak: 2, message: 'Streak updated' });
    expect(mockUser.save).toHaveBeenCalled();
  });
});