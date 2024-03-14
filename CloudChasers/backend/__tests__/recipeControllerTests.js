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