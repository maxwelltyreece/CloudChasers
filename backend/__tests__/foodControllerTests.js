if (process.env.NODE_ENV === "test") {
	require("dotenv").config({ path: ".env.test" });
}

const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/user");
const UserDay = require("../models/userDay");
const UserDayMeal = require("../models/userDayMeal");
const MealItem = require("../models/mealItem");
const FoodItem = require("../models/foodItem");
const RecipeItem = require("../models/recipeItem");
const RecipeQuantity = require("../models/recipeQuantity");
const Food = require("../models/food");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Recipe = require("../models/recipe");
const { array } = require("yargs");
const foodItem = require("../models/foodItem");

async function clearDatabase() {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		await collection.deleteMany();
	}
}

describe("logDatabaseFood Endpoint", () => {
	let food, user, token;

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

		user = await User.create({
			forename: "John",
			surname: "Doe",
			username: "johndoe",
			email: "johndoe@example.com",
			password: "securepassword",
			dateOfBirth: new Date(1990, 0, 1),
		});

		token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

		food = await Food.create({
			name: "Test Food",
			group: "Test Group",
			calories: 100,
			privacy: "public",
		});
	});

	beforeEach(async () => {});

	afterEach(async () => {
		await UserDay.deleteMany({});
		await UserDayMeal.deleteMany({});
		jest.restoreAllMocks();
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
		await mongoose.connection.close();
	});

	it("should return 200 and log the food for authenticated request", async () => {
		const response = await request(app)
			.post("/food/logDatabaseFood")
			.set("Authorization", `Bearer ${token}`)
			.send({
				mealType: "breakfast",
				foodID: food._id.toString(),
				weight: 100,
			});

		expect(response.error).toBe(false);
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe("Food logged");

		// Verify that the userDay, userDayMeal, and mealItem and foodItem are created in the database
		const createdUserDay = await UserDay.findOne({ userID: user._id });
		expect(createdUserDay).toBeTruthy();

		const createdUserDayMeal = await UserDayMeal.findOne({
			userDayID: createdUserDay._id,
			name: "breakfast",
		});
		expect(createdUserDayMeal).toBeTruthy();

		const createdFoodItem = await FoodItem.findOne({ foodID: food._id });
		expect(createdFoodItem).toBeTruthy();
		expect(createdFoodItem.weight).toBe(100);

		const createdMealItem = await MealItem.findOne({
			userDayMealID: createdUserDayMeal._id,
			foodItemID: createdFoodItem._id,
		});
		expect(createdMealItem).toBeTruthy();
	});
});
describe("GET /getFood", () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
	});

	beforeEach(async () => {
		await Food.create([
			{
				name: "Food 1",
				group: "Fruits",
				calories: 50,
				privacy: "public",
			},
			{
				name: "Food 2",
				group: "Vegetables",
				calories: 30,
				privacy: "public",
			},
			{
				name: "Food 3",
				group: "Grains",
				calories: 100,
				privacy: "public",
			},
			{
				name: "Food 4",
				group: "Proteins",
				calories: 200,
				privacy: "public",
			},
		]);
	});

	afterEach(async () => {
		await clearDatabase();
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	it("should retrieve paginated food items", async () => {
		const page = 1;
		const limit = 2;

		const response = await request(app).get(
			`/food/getFood?page=${page}&limit=${limit}`
		);

		expect(response.statusCode).toBe(200);
		expect(response.body.foods.length).toBe(2);
		expect(response.body.totalPages).toBe(2);
		expect(response.body.currentPage).toBe("1");

		// Order doesn't matter
		expect(response.body.foods[0]).toHaveProperty("name");
		expect(response.body.foods[1]).toHaveProperty("name");
	});

	it("should handle errors when retrieving foods", async () => {
		// Simulate an error scenario for Food.find()
		jest.spyOn(Food, "find").mockImplementationOnce(() => {
			throw new Error("Database error");
		});

		const response = await request(app).get("/food/getFood?page=1&limit=2");

		expect(response.statusCode).toBe(500);
		expect(response.body).toEqual({ error: "Error: Database error" });

		jest.restoreAllMocks();
	});
});
describe("GET /searchFoods", () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
		await Food.create([
			{
				name: "Apple",
				group: "Fruits",
				calories: 95,
				protein: 0.5,
				privacy: "public",
			},
			{
				name: "Banana",
				group: "Fruits",
				calories: 105,
				protein: 1.3,
				privacy: "public",
			},
			{
				name: "Carrot",
				group: "Vegetables",
				calories: 41,
				protein: 0.9,
				privacy: "public",
			},
		]);
	});

	afterAll(async () => {
		await Food.deleteMany({});
		await mongoose.connection.close();
	});

	test("should return foods based on text search", async () => {
		const response = await request(app).get("/food/searchFoods?name=ban");

		expect(response.statusCode).toBe(200);
		expect(response.body.foods.length).toBe(1);
		expect(response.body.foods[0].name).toBe("Banana");
	});

	test("should return foods based on numeric range search", async () => {
		const response = await request(app).get(
			"/food/searchFoods?calories[min]=50&calories[max]=100"
		);

		expect(response.statusCode).toBe(200);
		expect(
			response.body.foods.some((food) => food.name === "Apple")
		).toBeTruthy();
	});

	test("should return foods with calories greater than or equal to a min value", async () => {
		const response = await request(app).get(
			"/food/searchFoods?calories[min]=70"
		);

		expect(response.statusCode).toBe(200);
		expect(response.body.foods.length).toBe(2);
		expect(
			response.body.foods.some((food) => food.name === "Apple")
		).toBeTruthy();
		expect(
			response.body.foods.some((food) => food.name === "Banana")
		).toBeTruthy();
	});

	test("should return foods with calories less than or equal to a max value", async () => {
		const response = await request(app).get(
			"/food/searchFoods?calories[max]=70"
		);

		expect(response.statusCode).toBe(200);
		expect(response.body.foods.length).toBe(1);
		expect(
			response.body.foods.some((food) => food.name === "Carrot")
		).toBeTruthy();
	});

	test("should return foods with calories less than or equal to a max value", async () => {
		const response = await request(app).get(
			"/food/searchFoods?calories=95"
		);

		expect(response.statusCode).toBe(200);
		expect(response.body.foods.length).toBe(1);
		expect(
			response.body.foods.some((food) => food.name === "Apple")
		).toBeTruthy();
	});

	test("should handle invalid search fields", async () => {
		const response = await request(app).get(
			"/food/searchFoods?invalidField=value"
		);

		expect(response.statusCode).toBe(400);
		expect(response.body.error).toContain("Invalid field(s)");
	});

	test("should handle no matching foods", async () => {
		const response = await request(app).get(
			"/food/searchFoods?name=Zucchini"
		);

		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe("No foods found");
	});

	test("should handle errors during food search", async () => {
		// Simulate an error scenario for Food.find()
		jest.spyOn(Food, "find").mockImplementationOnce(() => {
			throw new Error("Database error");
		});

		const response = await request(app).get("/food/searchFoods?name=Apple");

		expect(response.statusCode).toBe(500);
		expect(response.body.error).toBe("Error: Database error");

		jest.restoreAllMocks();
	});
});

describe("GET /getLatestLoggedFood", () => {
	let user, token;

	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
		user = await User.create({
			forename: "John",
			surname: "Doe",
			username: "johndoe",
			email: "johndoe@example.com",
			password: "securepassword",
			dateOfBirth: new Date(1990, 0, 1),
		});

		token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
	});

	beforeEach(async () => {});

	afterEach(async () => {
		await UserDay.deleteMany({});
		await UserDayMeal.deleteMany({});
		await MealItem.deleteMany({});
	});

	afterAll(async () => {
		await User.deleteMany({});
		await mongoose.connection.close();
	});

	test("should return 404 if no day logs are found", async () => {
		const response = await request(app)
			.get("/food/getLatestLoggedFood")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe("No day logs found");
	});

	test("should return 404 if no meal logs are found", async () => {
		// Create a UserDay without a corresponding UserDayMeal
		await UserDay.create({ date: new Date(), userID: user._id });

		const response = await request(app)
			.get("/food/getLatestLoggedFood")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(404);
		expect(response.body.message).toBe("No meal logs found");
	});

	test("should return the last logged meal and food items", async () => {
		// Create a sequence of UserDay, UserDayMeal, and MealItem
		const userDay = await UserDay.create({
			date: new Date(),
			userID: user._id,
		});
		const userDayMeal = await UserDayMeal.create({
			name: "Dinner",
			userDayID: userDay._id,
			order: 1,
		});

		const food = await Food.create({
			name: "Apple",
			group: "Fruits",
			calories: 52,
			protein: 0.3,
			carbs: 14,
			fat: 0.2,
			privacy: "public",
		});

		const foodItem = await FoodItem.create({
			foodID: food._id,
			weight: 100,
		});

		const mealItem = await MealItem.create({
			name: "Pizza",
			userDayMealID: userDayMeal._id,
			foodItemID: foodItem._id,
		});

		const response = await request(app)
			.get("/food/getLatestLoggedFood")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.latestUserDayMeal).toBeTruthy();
		expect(response.body.mealItems.length).toBeGreaterThan(0);
	});
});

describe("getUserDayMealMacros Function", () => {
	let user, userDayMeal, food, foodItem, recipe, recipeItem, recipeQuantity, userDay;

	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
				
		user = await User.create({
			forename: "John",
			surname: "Doe",
			username: "johndoe",
			email: "johndoe@example.com",
			password: "securepassword",
			dateOfBirth: new Date(1990, 0, 1),
		});

	});

	beforeEach(async () => {


		// Set up food and foodItem for direct food logging
		food = await Food.create({
			name: "Apple",
			group: "Fruits",
			calories: 52,
			protein: 0.3,
			carbs: 14,
			fat: 0.2,
			privacy: "public",
		});
		foodItem = await FoodItem.create({ foodID: food._id, weight: 100 });
		
		userDay = await UserDay.create({ date: new Date(), userID: user._id });
		
		userDayMeal = await UserDayMeal.create({ name: "Lunch", userDayID: userDay._id, order: 1 });

		recipe = await Recipe.create({ name: "Fruit Salad", description: "A healthy fruit salad"});
		recipeItem = await RecipeItem.create({
			foodItemID: foodItem._id,
			recipeID: recipe._id,
		});
		recipeQuantity = await RecipeQuantity.create({
			recipeID: recipe._id,
			mealItemID: userDayMeal._id,
			totalRecipeWeight: 150,
		});
	});

	afterEach(async () => {
		await UserDayMeal.deleteMany({});
		await UserDay.deleteMany({});
		await Food.deleteMany({});
		await FoodItem.deleteMany({});
		await Recipe.deleteMany({});
		await RecipeItem.deleteMany({});
		await RecipeQuantity.deleteMany({});
	});

	afterAll(async () => {
		await User.deleteMany({});
		await mongoose.connection.close();
	});

	test("should calculate macros for a meal with direct food logging", async () => {
		await MealItem.create({
			userDayMealID: userDayMeal._id,
			foodItemID: foodItem._id,
		});

		const macros = await getUserDayMealMacros(userDayMeal._id);

		expect(macros.calories).toBeCloseTo(52);
		expect(macros.protein).toBeCloseTo(0.3);
		expect(macros.carbs).toBeCloseTo(14);
		expect(macros.fat).toBeCloseTo(0.2);
	});

	test("should calculate macros for a meal with recipe logging", async () => {
		await MealItem.create({
			userDayMealID: userDayMeal._id,
			recipeQuantityID: recipeQuantity._id,
		});

		const macros = await getUserDayMealMacros(userDayMeal._id);

		// Expectations based on the scaled-up recipe quantities
		expect(macros.calories).toBeCloseTo(78); // 52 * 1.5
		expect(macros.protein).toBeCloseTo(0.45); // 0.3 * 1.5
		expect(macros.carbs).toBeCloseTo(21); // 14 * 1.5
		expect(macros.fat).toBeCloseTo(0.3); // 0.2 * 1.5
	});

	test("should handle errors during macro calculation", async () => {
		// Simulate an error scenario for Food.findById()
		jest.spyOn(Food, "findById").mockImplementationOnce(() => {
			throw new Error("Database error");
		});

		await expect(getUserDayMealMacros(userDayMeal._id)).rejects.toThrow(
			"Failed to get meal macros: Error: Database error"
		);

		jest.restoreAllMocks();
	});
});

// describe("getUserDayMealMacros Function", () => {
// 	let userDayMeal, food, foodItem, recipe, recipeItem, recipeQuantity;

// 	beforeAll(async () => {
// 		await mongoose.connect(process.env.DATABASE_URL);
// 	});

// 	beforeEach(async () => {
// 		// Set up a user day meal
// 		userDayMeal = await UserDayMeal.create({ name: "Lunch", order: 1 });

// 		// Set up food and foodItem for direct food logging
// 		food = await Food.create({
// 			name: "Apple",
// 			calories: 52,
// 			protein: 0.3,
// 			carbs: 14,
// 			fat: 0.2,
// 		});
// 		foodItem = await FoodItem.create({ foodID: food._id, weight: 100 }); // 100g apple

// 		// Set up a recipe, recipe item, and food item for recipe logging
// 		recipe = await Recipe.create({ name: "Fruit Salad" });
// 		recipeItem = await RecipeItem.create({
// 			foodItemID: foodItem._id,
// 			recipeID: recipe._id,
// 		});
// 		recipeQuantity = await RecipeQuantity.create({
// 			recipeID: recipe._id,
// 			mealItemID: userDayMeal._id,
// 			totalRecipeWeight: 150,
// 		}); // 150g of the recipe
// 	});

// 	afterEach(async () => {
// 		await UserDayMeal.deleteMany({});
// 		await Food.deleteMany({});
// 		await FoodItem.deleteMany({});
// 		await Recipe.deleteMany({});
// 		await RecipeItem.deleteMany({});
// 		await RecipeQuantity.deleteMany({});
// 	});

// 	afterAll(async () => {
// 		await mongoose.connection.close();
// 	});

// 	test("should calculate macros for a meal with direct food logging", async () => {
// 		await MealItem.create({
// 			userDayMealID: userDayMeal._id,
// 			foodItemID: foodItem._id,
// 		});

// 		const macros = await getUserDayMealMacros(userDayMeal._id);

// 		expect(macros.calories).toBeCloseTo(52);
// 		expect(macros.protein).toBeCloseTo(0.3);
// 		expect(macros.carbs).toBeCloseTo(14);
// 		expect(macros.fat).toBeCloseTo(0.2);
// 	});

// 	test("should calculate macros for a meal with recipe logging", async () => {
// 		await MealItem.create({
// 			userDayMealID: userDayMeal._id,
// 			recipeQuantityID: recipeQuantity._id,
// 		});

// 		const macros = await getUserDayMealMacros(userDayMeal._id);

// 		// Expectations based on the scaled-up recipe quantities
// 		expect(macros.calories).toBeCloseTo(78); // 52 * 1.5
// 		expect(macros.protein).toBeCloseTo(0.45); // 0.3 * 1.5
// 		expect(macros.carbs).toBeCloseTo(21); // 14 * 1.5
// 		expect(macros.fat).toBeCloseTo(0.3); // 0.2 * 1.5
// 	});

// 	test("should handle errors during macro calculation", async () => {
// 		// Simulate an error scenario for Food.findById()
// 		jest.spyOn(Food, "findById").mockImplementationOnce(() => {
// 			throw new Error("Database error");
// 		});

// 		await expect(getUserDayMealMacros(userDayMeal._id)).rejects.toThrow(
// 			"Failed to get meal macros: Error: Database error"
// 		);

// 		jest.restoreAllMocks();
// 	});
// });

// describe('searchFoods Endpoint', () => {
// 	beforeEach(() => {
// 		jest.clearAllMocks();
// 	});

// 	it('should return 200 and the correct foods for a valid request', async () => {

// 		const response = await request(app)
// 			.get('/food/searchFoods')
// 			.query({ page: 1, limit: 2, name: 'a' });

// 		expect(response.error).toBe(false);
// 		expect(response.body.foods).toEqual([
// 			{ _id: 'mockedId1', name: 'apple', calories: 50 },
// 			{ _id: 'mockedId2', name: 'banana', calories: 100 }
// 		]);
// 		expect(response.body.totalPages).toBe(1);
// 		expect(response.body.page).toBe("1");
// 		expect(response.body.limit).toBe("2");
// 		expect(response.statusCode).toBe(200);
// 	});

//     it('should return 404 when no foods are found', async () => {
//         // Mock Food.find to return an empty array
//         food.find.mockImplementation(() => {
//             return {
//                 skip: jest.fn().mockReturnThis(),
//                 limit: jest.fn().mockResolvedValue([])
//             };
//         });

//         food.countDocuments.mockResolvedValue(0);

//         const response = await request(app)
//             .get('/food/searchFoods')
//             .query({ name: 'nonexistent' });

//         expect(response.statusCode).toBe(404);
//         expect(response.body.message).toBe('No foods found');
//     });

// 	it('should return 400 for invalid query parameters', async () => {
// 		const response = await request(app)
// 		  .get('/food/searchFoods')
// 		  .query({ invalidField: 'invalidValue', anotherInvalidField: 'anotherValue' });

// 		expect(response.statusCode).toBe(400);
// 		expect(response.body.error).toBeDefined();
// 		expect(response.body.error).toContain('Invalid field(s):');
// 		expect(response.body.error).toContain('invalidField');
// 		expect(response.body.error).toContain('anotherInvalidField');
// 	  });

// 	it('should handle search with exact match for numeric fields', async () => {
// 	// Mocking the Food model's response for an exact match
// 	food.find.mockImplementationOnce(() => ({
// 		skip: jest.fn().mockReturnThis(),
// 		limit: jest.fn().mockResolvedValue([{ _id: 'mockedId1', name: 'apple', calories: 100 }])
// 	}));
// 	food.countDocuments.mockResolvedValueOnce(1);

// 	const response = await request(app)
// 		.get('/food/searchFoods')
// 		.query({ page: 1, limit: 10, calories: 100 });

// 	expect(response.statusCode).toBe(200);
// 	expect(response.body.foods).toHaveLength(1);
// 	expect(response.body.foods[0].calories).toBe(100);
// 	});

// 	it('should handle search with greater than condition for numeric fields', async () => {
// 	// Mocking the Food model's response for a $gte query
// 	food.find.mockImplementationOnce(() => ({
// 		skip: jest.fn().mockReturnThis(),
// 		limit: jest.fn().mockResolvedValue([{ _id: 'mockedId2', name: 'banana', calories: 150 }])
// 	}));
// 	food.countDocuments.mockResolvedValueOnce(1);

// 	const response = await request(app)
// 		.get('/food/searchFoods')
// 		.query({ page: 1, limit: 10, calories: { min: 150 } });

// 	expect(response.statusCode).toBe(200);
// 	expect(response.body.foods).toHaveLength(1);
// 	expect(response.body.foods[0].calories).toBeGreaterThanOrEqual(150);
// 	});

// 	it('should handle search with less than condition for numeric fields', async () => {
// 	// Mocking the Food model's response for a $lte query
// 	food.find.mockImplementationOnce(() => ({
// 		skip: jest.fn().mockReturnThis(),
// 		limit: jest.fn().mockResolvedValue([{ _id: 'mockedId3', name: 'orange', calories: 49 }])
// 	}));
// 	food.countDocuments.mockResolvedValueOnce(1);

// 	const response = await request(app)
// 		.get('/food/searchFoods')
// 		.query({ page: 1, limit: 10, calories: { max: 50 } });

// 	expect(response.statusCode).toBe(200);
// 	expect(response.body.foods).toHaveLength(1);
// 	expect(response.body.foods[0].calories).toBeLessThanOrEqual(50);
// 	});

// 	it('should handle search with inbetween conditions conditions for numeric fields', async () => {
// 		// Mocking the Food model's response for a $gte and $lte query
// 		food.find.mockImplementationOnce(() => ({
// 			skip: jest.fn().mockReturnThis(),
// 			limit: jest.fn().mockResolvedValue([{ _id: 'mockedId4', name: 'pear', calories: 75 }])
// 		}));
// 		food.countDocuments.mockResolvedValueOnce(1);

// 		const response = await request(app)
// 			.get('/food/searchFoods')
// 			.query({ page: 1, limit: 10, calories: { min: 50, max: 100 } });

// 		expect(response.statusCode).toBe(200);
// 		expect(response.body.foods).toHaveLength(1);
// 		expect(response.body.foods[0].calories).toBeGreaterThanOrEqual(50);
// 		expect(response.body.foods[0].calories).toBeLessThanOrEqual(100);
// 	});
// });
