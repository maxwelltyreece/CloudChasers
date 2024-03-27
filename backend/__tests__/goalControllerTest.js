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
            console.log(res.error);
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

        
	});
});