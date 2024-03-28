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
const Community = require('../models/community');
const CommunityUser = require('../models/communityUser');
const CommmunityPost = require('../models/communityPost');
const communityPost = require('../models/communityPost');



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
        await Community.deleteMany({});
        await CommunityUser.deleteMany({});
        await CommmunityPost.deleteMany({});


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
        await CommmunityPost.deleteMany({});
    });

    afterEach(async () => {
        await PersonalAward.deleteMany({});
        await PersonalAwardItem.deleteMany({});
        await Community.deleteMany({});
        await CommunityUser.deleteMany({});
        await CommmunityPost.deleteMany({});
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

        it('get awards to be issued after making streaks', async () => {
            const award1 = await PersonalAward.create({
                name: '5 Day Streak',
                description: 'Award for reaching a streak of 5 days',
            });

            const award2 = await PersonalAward.create({
                name : '10 Day Streak',
                description: 'Award for reaching a streak of 10 days',
            });

            const award3 = await PersonalAward.create({
                name: '25 Day Streak',
                description: 'Award for reaching a streak of 25 days',
            });

            const award4 = await PersonalAward.create({
                name: 'Make a Post',
                description: 'Award for making a post',
            });

            const award5 = await PersonalAward.create({
                name: 'Make 5 Posts',
                description: 'Award for making 5 posts',
            });

            const award6 = await PersonalAward.create({
                name: 'Make 10 Posts',
                description: 'Award for making 10 posts',
            });

            const award7 = await PersonalAward.create({
                name : 'Join Community',
                description: 'Award for joining a community',
            });

            const community = await Community.create({
                name: 'Test Community',
                description: 'This is a test community',
                recipePrivacy: 'public',
                joinPrivacy: 'public',
            });

            const communityUser = await CommunityUser.create({
                communityID: community._id,
                userID: user._id,
                role : 'member',
            });

            for (let i = 0; i < 10; i++) {
                await communityPost.create({
                    communityID: community._id,
                    userID: user._id,
                    text : 'This is a test post',
                    date : new Date(),
                    title: 'Test Post',
                });
            }           

            user.streak = 25;
            user.save();
            const response = await request(app)
                .get('/awards/getAwardsToBeIssued')
                .set('Authorization', `Bearer ${token}`);
            console.log(response.error);
            expect(response.statusCode).toBe(200);
        });
    }); 

    describe("get number of completed awards", () => {
        it("get number of completed awards", async () => {
            const response = await request(app)
                .get("/awards/getNumberOfCompletedAwards")
                .set("Authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });
    });
});