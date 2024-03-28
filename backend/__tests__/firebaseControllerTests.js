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

    describe('send a photo to firebase', () => {
        it('get an image from front end', async () => {
            const response = await request(app)
                .get(`/image/getPictureURL?id=${user._id}&folderName=Profile_Pictures`)
                .set('Authorization', `Bearer ${token}`);
            console.log(response.error)
            expect(response.statusCode).toBe(200);
        });
    });
});