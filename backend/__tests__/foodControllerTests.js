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

	beforeEach(async () => {

	});

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
		// Create multiple Food documents to test pagination
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

		// Additional checks can be added to verify the content of the foods array
		expect(
			response.body.foods.some((food) => food.name === "Food 1")
		).toBeTruthy();
		expect(
			response.body.foods.some((food) => food.name === "Food 2")
		).toBeTruthy();
		// expect(response.body.foods[0].name).toBe("Food 1");
		// expect(response.body.foods[1].name).toBe("Food 2");
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

	beforeEach(async () => {
	});

	afterEach(async () => {
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
