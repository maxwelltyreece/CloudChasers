if (process.env.NODE_ENV === 'test') {
require('dotenv').config({ path: '.env.test' });
}

const jwt = require('jsonwebtoken');

// const token = jwt.sign({ userID: 'testUserID' }, process.env.SECRET_KEY);

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/user');
const UserDay = require('../models/userDay');
const UserDayMeal = require('../models/userDayMeal');
const MealItem = require('../models/mealItem');
const FoodItem = require('../models/foodItem');
const RecipeItem = require('../models/recipeItem');
const Food = require('../models/food');

const Recipe = require('../models/recipe');

describe('recipes endpoint', () => {
	let user, community, token, food, recipe;

	beforeAll(async () => {
		await mongoose.connect(process.env.TEST_DATABASE_URL);
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
	
	beforeEach(async () => {
	food = await Food.create({
		name: 'Test Food',
		group: 'Test Group',
		calories: 100,
		privacy: 'public',
	});

	recipe = await Recipe.create({
		name: 'Test Recipe',
		description: 'A test recipe',
		createdBy: user._id,
		communityThatOwnsRecipe: community,
	});

	});
	
	afterEach(async () => {
	// Clean up the database
		await Recipe.deleteMany({});
		await Food.deleteMany({});
		await RecipeItem.deleteMany({});
		await FoodItem.deleteMany({});
	});
	
	afterAll(async () => {
		await User.deleteMany({});
		await mongoose.connection.close();
	});

	it('should create a new recipe and save it to the database', async () => {
		const recipeData = {
			name: 'Integration Test Recipe',
			description: 'A test recipe for integration testing',
			communityThatOwnsRecipe: community.toString(),
		};

		const response = await request(app)
			.post('/food/createNewRecipeByUser')
			.set('Authorization', `Bearer ${token}`)
			.send(recipeData);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('message', 'Recipe created');
		expect(response.body.data).toMatchObject({
			name: recipeData.name,
			description: recipeData.description,
			createdBy: user._id.toString(),
			communityThatOwnsRecipe: community.toString(),
		});

		const recipe = await Recipe.findOne({ name: recipeData.name });
		expect(recipe).toBeTruthy();
		expect(recipe.description).toBe(recipeData.description);
		expect(recipe.createdBy.toString()).toBe(user._id.toString());
		expect(recipe.communityThatOwnsRecipe.toString()).toBe(community.toString());
	});

	it('should add a food item to a recipe', async () => {

		const foodItemData = {
			recipeID: recipe._id.toString(),
			foodID: food._id.toString(),
			weight: 200,
		};
		
		const response = await request(app)
		.put('/food/addItemToRecipe') 
		.set('Authorization', `Bearer ${token}`)
		.send(foodItemData);
	
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('message', 'Item added to recipe');
		expect(response.body.data).toMatchObject({
			recipeID: recipe._id.toString(),
			foodItemID: expect.any(String),
		});
	
		const recipeItem = await RecipeItem.findById(response.body.data._id);
		expect(recipeItem).toBeTruthy();
		expect(recipeItem.recipeID.toString()).toBe(recipe._id.toString());
		expect(recipeItem.foodItemID.toString()).toBe(response.body.data.foodItemID);
	});

	it('should return 400 if the recipe does not exist', async () => {
		const fakeRecipeId = new mongoose.Types.ObjectId();
	  
		const response = await request(app)
		.put('/food/addItemToRecipe')
		.set('Authorization', `Bearer ${token}`)
		.send({
			recipeID: fakeRecipeId.toString(),
			foodID: food._id.toString(),
			weight: 200,
		  });
	  
		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'Recipe does not exist');
	  });
	
	it('should return 400 if the food does not exist', async () => {
		const fakeFoodId = new mongoose.Types.ObjectId();
	  
		const response = await request(app)
			.put('/food/addItemToRecipe')
			.set('Authorization', `Bearer ${token}`)
			.send({
				recipeID: recipe._id.toString(),
				foodID: fakeFoodId.toString(),
				weight: 200,
		  });
	  
		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'Food does not exist');
	  });
	
	it('should return 400 if there is an error saving the food item', async () => {
	  
		const response = await request(app)
			.put('/food/addItemToRecipe')
			.set('Authorization', `Bearer ${token}`)
			.send({
				recipeID: recipe._id.toString(),
				foodID: food._id.toString(),
				weight: -200,
		  });
	  
		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('error');
	});
	
	it('should return 400 if the recipe does not exist', async () => {
		const fakeRecipeId = new mongoose.Types.ObjectId();
	  
		const response = await request(app)
			.get('/food/getRecipe')
			.set('Authorization', `Bearer ${token}`)
			.query({ recipeID: fakeRecipeId.toString() });
		
		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'Recipe does not exist');
	});

	it('should retrieve a recipe and its associated items', async () => {
		// Create a food item to be added to the recipe
		const foodItemData = {
			foodID: food._id.toString(),
			weight: 200,
		};
		const newFoodItem = await FoodItem.create(foodItemData);
	
		// Add the food item to the recipe
		const recipeItemData = {
			foodItemID: newFoodItem._id,
			recipeID: recipe._id.toString(),
		};
		await RecipeItem.create(recipeItemData);
	  
		// Make a request to get the recipe
		const response = await request(app)
			.get('/food/getRecipe')
			.set('Authorization', `Bearer ${token}`)
			.query({ recipeID: recipe._id.toString() });
	  
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('message', 'Recipe found');
		expect(response.body.data).toHaveProperty('recipe');
		expect(response.body.data).toHaveProperty('recipeItems');
		expect(response.body.data.recipe._id.toString()).toBe(recipe._id.toString());
		expect(response.body.data.recipeItems.length).toBeGreaterThan(0);
		expect(response.body.data.recipeItems[0].foodItemID.toString()).toBe(newFoodItem._id.toString());
	});

	it('should retrieve ingredients for a specific recipe', async () => {
		// Assuming food and recipe have been created in the beforeEach block
		const foodItem = await FoodItem.create({ foodID: food._id, weight: 200 });
		await RecipeItem.create({ foodItemID: foodItem._id, recipeID: recipe._id });
	  
		const response = await request(app)
		  .get('/food/getRecipeIngredients')
		  .set('Authorization', `Bearer ${token}`)
		  .query({ recipeID: recipe._id.toString() });
	  
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty('message', 'Recipe ingredients found');
		expect(response.body.data).toEqual(expect.arrayContaining([
		  expect.objectContaining({
			name: food.name,
			id: food._id.toString(),
			weight: foodItem.weight,
			recipeItemId: expect.any(String),
		  }),
		]));
	  });
	  
	it('should return 400 if the recipe does not exist', async () => {
		const fakeRecipeId = new mongoose.Types.ObjectId();
	  
		const response = await request(app)
		  .get('/food/getRecipeIngredients')
		  .set('Authorization', `Bearer ${token}`)
		  .query({ recipeID: fakeRecipeId.toString() });
	  
		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty('message', 'Recipe does not exist');
	});
	  
	  
});


