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
const PersonalAward = require('../models/personalAward');
const PersonalAwardItem = require('../models/personalAwardItem');



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
        await PersonalAward.deleteMany({});
        await PersonalAwardItem.deleteMany({});


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
        await GoalItem.deleteMany({});
        await PersonalAward.deleteMany({});
        await PersonalAwardItem.deleteMany({});
    });

    afterEach(async () => {
        await PersonalAward.deleteMany({});
        await PersonalAwardItem.deleteMany({});
    });

    describe('get award controller', () => {
        it('create award', async () => {
            const response = await request(app)
                .post('/awards/createAward')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    awardName: 'Test Award',
                    awardDescription: 'This is a test award',
                });
            expect(response.statusCode).toBe(200);
            expect(response.body.award.name).toBe('Test Award');
            expect(response.body.award.description).toBe('This is a test award');
        });

        it('create award with existing name', async () => {
            const response = await request(app)
                .post('/awards/createAward')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    awardName: 'Test Award',
                    awardDescription: 'This is a test award',
                });
            expect(response.statusCode).toBe(200);

            const response2 = await request(app)
                .post('/awards/createAward')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    awardName: 'Test Award',
                    awardDescription: 'This is a test award',
                });
            expect(response2.statusCode).toBe(400);
            expect(response2.body.message).toBe('Award name already exists');
        });
    });

    describe('get all awards controller', () => {
        it('get all awards', async () => {
            const response = await request(app)
                .get('/awards/getAllAwards')
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.awards).toBeDefined();
        });
    });

    describe('get award ', () => {
        it('get award', async () => {
            const response = await request(app)
                .post('/awards/createAward')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    awardName: 'Test Award',
                    awardDescription: 'This is a test award',
                });
            expect(response.statusCode).toBe(200);

            const response2 = await request(app)
                .get('/awards/getAward')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    awardID: response.body.award._id,
                });
            expect(response2.statusCode).toBe(200);
            expect(response2.body.award).toBeDefined();
        });
    });

    describe('award user ', () => {
        it('award user', async () => {
            const response = await request(app)
                .post('/awards/createAward')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    awardName: 'Test Award',
                    awardDescription: 'This is a test award',
                });
            expect(response.statusCode).toBe(200);

            const response2 = await request(app)
                .post('/awards/awardUser')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    awardID: response.body.award._id,
                });
            expect(response2.statusCode).toBe(200);
            expect(response2.body.message).toBe('User Awarded');
            expect(response2.body.award).toBeDefined();
        });

        it('award user with non-existent award', async () => {
            const response = await request(app)
                .post('/awards/awardUser')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    awardID: '60b1b4b3b3b3b3b3b3b3b3b3',
                });
            console.log(response.error);
            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('Award does not exist');
        });

        it('award user with existing award', async () => {
            const response = await request(app)
                .post('/awards/createAward')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    awardName: 'Test Award',
                    awardDescription: 'This is a test award',
                });
            expect(response.statusCode).toBe(200);

            const response2 = await request(app)
                .post('/awards/awardUser')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    awardID: response.body.award._id,
                });
            expect(response2.statusCode).toBe(200);

            const response3 = await request(app)
                .post('/awards/awardUser')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    awardID: response.body.award._id,
                });
            expect(response3.statusCode).toBe(400);
            expect(response3.body.message).toBe('User already has this award');
        });
    });

    describe('get user awards', () => {
        it('get user awards', async () => {
            const response = await request(app)
                .get('/awards/getUserAwards')
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
            expect(response.body.awards).toBeDefined();
        });
    });

    describe('get awards to be issued', () => {
        it('get awards to be issued', async () => {
            const response = await request(app)
                .get('/awards/getAwardsToBeIssued')
                .set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });
    }); 
});