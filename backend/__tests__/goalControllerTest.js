if (process.env.NODE_ENV === 'test') {
	require('dotenv').config({ path: '.env.test' });
}

const jwt = require('jsonwebtoken');

const token = jwt.sign({ userID: 'testUserID' }, process.env.SECRET_KEY);
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
const Goal = require('../models/goal');
const GoalItem = require('../models/goalItem');


describe('Award Controller Tests', () => {
	let user, community, token, food, recipe;

	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
		await User.deleteMany({});
		await Recipe.deleteMany({});
		await Food.deleteMany({});
		await RecipeItem.deleteMany({});
		await FoodItem.deleteMany({});
		await RecipeQuantity.deleteMany({});
		await UserDay.deleteMany({});
		await UserDayMeal.deleteMany({});
		await MealItem.deleteMany({});
		await Goal.deleteMany({});
		await GoalItem.deleteMany({});


		community = new mongoose.Types.ObjectId();
		user = await User.create({
			forename: 'John',
			surname: 'Doe',
			username: 'johndoe',
			email: 'johndoe@example.com',
			password: 'securepassword',
			dateOfBirth: new Date(1990, 0, 1),
		});
		token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
	});

	afterAll(async () => {
		await User.deleteMany({});
		await Recipe.deleteMany({});
		await Food.deleteMany({});
		await RecipeItem.deleteMany({});
		await FoodItem.deleteMany({});
		await RecipeQuantity.deleteMany({});
		await UserDay.deleteMany({});
		await UserDayMeal.deleteMany({});
		await MealItem.deleteMany({});
		await Goal.deleteMany({});
	});

	afterEach(async () => {
		await Goal.deleteMany({});
		await GoalItem.deleteMany({});
	});


	describe('Create goal', () => {
		it('should create a new goal in the database & create a new goal item', async () => {
			const awardToSend = {
				goalName: 'Test Award',
				measurement: 'protein',
				minTargetMass: 0,
				maxTargetMass: 100,
			};
			const res = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send(
					awardToSend
				);
			expect(res.statusCode).toEqual(200);
			const createdGoal = res.body.goal;
			expect(createdGoal.name).toEqual('Test Award');
			expect(createdGoal.measurement).toEqual('protein');
			expect(createdGoal.minTargetMass).toEqual(0);
			expect(createdGoal.maxTargetMass).toEqual(100);
		});

		it('should fail to create a goal whilst missing goalName', async () => {
			const res = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send({
					measurement: 'protein',
					minTargetMass: 0,
					maxTargetMass: 100,
				});
			expect(res.statusCode).toEqual(400);
			expect(res.body.message).toEqual('Missing required fields: goalName');
		});

		it('should fail to create a goal whilst missing measurement', async () => {
			const res = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalName: 'Test Award',
					minTargetMass: 0,
					maxTargetMass: 100,
				});
			expect(res.statusCode).toEqual(400);
			expect(res.body.message).toEqual('Missing required fields: measurement');
		});

		it('should still be able to create a goal whilst missing minTargetMass', async () => {
			const res = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalName: 'Test Award',
					measurement: 'protein',
					maxTargetMass: 100,
				});
			expect(res.statusCode).toEqual(200);
			expect(res.body.message).toEqual('Goal created');
		});

		it('should still be able to create a goal whilst missing maxTargetMass & minTargetMass', async () => {
			const res = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalName: 'Test Award',
					measurement: 'protein',
				});
			expect(res.statusCode).toEqual(400);
			expect(res.body.message).toEqual('Minimum target mass or maximum target mass is required');
		});

		it('should fail to create a goal whilst minTargetMass is less than 0', async () => {
			const res = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalName: 'Test Award',
					measurement: 'protein',
					minTargetMass: -1,
					maxTargetMass: 100,
				});
			expect(res.statusCode).toEqual(400);
			expect(res.body.message).toEqual('Minimum target mass or maximum mass must be larger than 0');
		});

		it('should fail to create a goal whilst maxTargetMass is smaller than minTargetMass', async () => {
			const res = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalName: 'Test Award',
					measurement: 'protein',
					minTargetMass: 100,
					maxTargetMass: 50,
				});
			expect(res.statusCode).toEqual(400);
			expect(res.body.message).toEqual('Minimum target mass cannot be greater than maximum target mass');
		});

		it('should fail to create a goal with a name that already exists', async () => {
			const initalRes = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalName: 'Test Award',
					measurement: 'protein',
					minTargetMass: 0,
					maxTargetMass: 100,
				});

			const res = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalName: 'Test Award',
					measurement: 'protein',
					minTargetMass: 0,
					maxTargetMass: 100,
				});
			expect(res.statusCode).toEqual(400);
			expect(res.body.message).toEqual('Goal name already taken');
		});

		it('should fail to create a goal with a measurement that already exists', async () => {
			const initalRes = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalName: 'Test Award',
					measurement: 'protein',
					minTargetMass: 0,
					maxTargetMass: 100,
				});

			const res = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalName: 'Test Award 2',
					measurement: 'protein',
					minTargetMass: 0,
					maxTargetMass: 100,
				});
			expect(res.statusCode).toEqual(400);
			expect(res.body.message).toEqual('Macro already tracked');
		});
	});

	describe('Get all goals of user', () => {
		it('should get all goals of a user', async () => {
			const awardToSend = {
				goalName: 'Test Award',
				measurement: 'protein',
				minTargetMass: 0,
				maxTargetMass: 100,
			};
			const res = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send(
					awardToSend
				);
			const res2 = await request(app)
				.get('/goals/getAllGoalsOfUser')
				.set('Authorization', `Bearer ${token}`);
			expect(res2.statusCode).toEqual(200);
			expect(res2.body.goals.length).toEqual(1);
		});
	});

	describe('Get single goal item', () => {
		it('should get a single goal item', async () => {
			const awardToSend = {
				goalName: 'Test Award',
				measurement: 'protein',
				minTargetMass: 0,
				maxTargetMass: 100,
			};
			const createGoalRes = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send(
					awardToSend
				);
			expect(createGoalRes.statusCode).toEqual(200);
			const newlyCreatedGoalID = await createGoalRes.body.goal;

			const res = await request(app)
				.get('/goals/getSingleGoalItem')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalID: newlyCreatedGoalID,
				});
			expect(res.statusCode).toEqual(200);
			expect(res.body.goal.name).toEqual('Test Award');
		});

		it('should fail to get a single goal item with an invalid goalID', async () => {
			const res = await request(app)
				.get('/goals/getSingleGoalItem')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalID: '60b1b4b3b3b3b3b3b3b3b3b3',
				});
			expect(res.statusCode).toEqual(404);
			expect(res.body.message).toEqual('Goal not found');
		});
	});

	describe('Delete goal', () => {
		it('should delete a goal', async () => {
			const awardToSend = {
				goalName: 'Test Award',
				measurement: 'protein',
				minTargetMass: 0,
				maxTargetMass: 100,
			};
			const createGoalRes = await request(app)
				.post('/goals/createGoal')
				.set('Authorization', `Bearer ${token}`)
				.send(
					awardToSend
				);
			expect(createGoalRes.statusCode).toEqual(200);
			const newlyCreatedGoalID = await createGoalRes.body.goal._id;
			console.log(newlyCreatedGoalID);

			const res = await request(app)
				.get('/goals/deleteGoal')
				.set('Authorization', `Bearer ${token}`)
				.send({
					goalID: newlyCreatedGoalID,
				});
			console.log(res);
			expect(res.statusCode).toEqual(200);
			expect(res.body.message).toEqual('Goal deleted');
		});
	});
});