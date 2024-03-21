if (process.env.NODE_ENV === "test") {
	require("dotenv").config({ path: ".env.test" });
}

const jwt = require("jsonwebtoken");

const token = jwt.sign({ userID: "testUserID" }, process.env.SECRET_KEY);

const jest = require('jest');
import { expect, it, describe, beforeEach } from 'jest';



const request = require("supertest");
const app = require("../server");

const userDay = require("../models/userDay");
const userDayMeal = require("../models/userDayMeal");
const mealItem = require("../models/mealItem");
const foodItem = require("../models/foodItem");
const food = require("../models/food");
const recipe = require("../models/recipe");
const recipeItem = require("../models/recipeItem");
const recipeQuantity = require("../models/recipeQuantity");
const user = require("../models/user");


jest.mock("../models/user", () => ({ findById: jest.fn() }));
jest.mock("../models/userDay", () => ({ findOne: jest.fn() }));
jest.mock("../models/userDayMeal", () => ({ find: jest.fn() }));
jest.mock("../models/mealItem", () => ({ find: jest.fn() }));
jest.mock("../models/foodItem", () => ({ findById: jest.fn() }));
jest.mock("../models/food", () => ({ findById: jest.fn() }));
jest.mock("../models/recipe", () => ({ findById: jest.fn() }));
jest.mock("../models/recipeItem", () => ({ find: jest.fn() }));
jest.mock("../models/recipeQuantity", () => ({ findById: jest.fn() }));

jest.mock("../models/user", () => ({
	findById: jest.fn().mockResolvedValue({
		_id: "testUserID",
		lastLogin: new Date(Date.now() - 86400000).toISOString(),
		streak: 1,
		save: jest.fn().mockResolvedValue(true),
	}),
}));

describe("Streaks Endpoint", () => {
	it("should return 200 and update the streak for authenticated request", async () => {
		const response = await request(app)
			.post("/stats/streak")
			.set("Authorization", `Bearer ${token}`)
			.send({ today: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("streak");
		expect(response.body.streak).toBe(2);
	});

	it("should return consecutive days streak", async () => {
		const response = await request(app)
			.post("/stats/streak")
			.set("Authorization", `Bearer ${token}`)
			.send({ today: new Date(Date.now() + 86400000).toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("streak");
		expect(response.body.streak).toBe(3);
	});

	it("should not update streak if the date is the same", async () => {
		const response = await request(app)
			.post("/stats/streak")
			.set("Authorization", `Bearer ${token}`)
			.send({ today: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("streak");
		expect(response.body.streak).toBe(3);
	});

	it("should reset streak if the date is not consecutive", async () => {
		const response = await request(app)
			.post("/stats/streak")
			.set("Authorization", `Bearer ${token}`)
			.send({ today: new Date(Date.now() + 86400000 * 2).toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("streak");
		expect(response.body.streak).toBe(1);
	});

	it("should return 400 if the date is invalid", async () => {
		const response = await request(app)
			.post("/stats/streak")
			.set("Authorization", `Bearer ${token}`)
			.send({ today: "invalid date" });

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty("error");
	});

	it("should return 500 if an error occurs during streak update", async () => {
		jest.spyOn(user, "save").mockImplementation(() => {
			throw new Error("database save error");
		});

		const response = await request(app)
			.post("/stats/streak")
			.set('Authorization', `Bearer ${token}`)
			.send({ today: new Date().toISOString() });
		expect(response.statusCode).toBe(500);
		expect(response.body).toHaveProperty("error");
	});
	
});

describe("Daily Nutrient Intake Endpoint", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should return 400 if no data is found for the day", async () => {
		const response = await request(app)
			.get("/stats/dailyCaloricIntake")
			.set("Authorization", `Bearer ${token}`)
			.send({ date: new Date(Date.now() + 86400000 * 2).toISOString() });

		expect(response.statusCode).toBe(400);
		expect(response.body).toHaveProperty("message", "No data for this day.");
	});

	it("should return 200 and the total caloric intake for the day", async () => {
		userDay.findOne.mockResolvedValue({ _id: "testUserDayID", date: new Date().toISOString(), userID: "testUserID", save: jest.fn().mockResolvedValue(true)});
		userDayMeal.find.mockResolvedValue([ { _id: "testUserDayMealID", name: "Dinner", userDayID: "testUserDayID2", save: jest.fn().mockResolvedValue(true)}]);
		mealItem.find.mockResolvedValue([{ _id: "testMealItemID", name: "testmealItem", foodItemID: "testFoodItemID", userDayMealID: "testUserDayMealID", save: jest.fn().mockResolvedValue(true) }, { _id: "testMealItemID2", name: "testmealItem2", foodItemID: "testFoodItemID", userDayMealID: "testUserDayMealID", save: jest.fn().mockResolvedValue(true) }]);
		// foodItem.findById.mockResolvedValue([{ _id: "testFoodItemID",  weight: 100, foodID: "testFoodID", save: jest.fn().mockResolvedValue(true) }, { _id: "testFoodItemID2",  weight: 100, foodID: "testFoodID2",save: jest.fn().mockResolvedValue(true) }]);
		// food.findById.mockResolvedValue([{ _id: "testFoodID", calories: 100, save: jest.fn().mockResolvedValue(true) }, { _id: "testFoodID2", calories: 200, save: jest.fn().mockResolvedValue(true) }]);
		foodItem.findById.mockResolvedValue({ _id: "testFoodItemID",  weight: 200, foodID: "testFoodID", save: jest.fn().mockResolvedValue(true) });
		food.findById.mockResolvedValue({ _id: "testFoodID", calories: 100, save: jest.fn().mockResolvedValue(true) });
		recipe.findById.mockResolvedValue({ _id: "testRecipeID", save: jest.fn().mockResolvedValue(true) });
		recipeItem.find.mockResolvedValue({ _id: "testRecipeItemID", foodItemID: "testFoodItemID", recipeID: "testRecipeID", save: jest.fn().mockResolvedValue(true) });
		recipeQuantity.findById.mockResolvedValue({ _id: "testRecipeQuantityID", mealItemID: "testMealItemID", recipeID: "testRecipeID", totalRecipeWeight: "100", save: jest.fn().mockResolvedValue(true) });

		const response = await request(app)
			.get("/stats/dailyCaloricIntake")
			.set("Authorization", `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("totalCalories");
		expect(response.body.totalCalories).toBe(400);
	});

	it("should return 200 and the correct total caloric intake for the day for recipes", async () => {
		userDay.findOne.mockResolvedValue({ _id: "testUserDayID", date: new Date().toISOString(), userID: "testUserID", save: jest.fn().mockResolvedValue(true)});
		userDayMeal.find.mockResolvedValue([ { _id: "testUserDayMealID", name: "Dinner", userDayID: "testUserDayID2", save: jest.fn().mockResolvedValue(true)}]);
		mealItem.find.mockResolvedValue([{ _id: "testMealItemID", name: "testMealName", recipeQuantityID: "testRecipeQuantityID", userDayMealID: "testUserDayMealID", save: jest.fn().mockResolvedValue(true) }]);
		recipeQuantity.findById.mockResolvedValue({ _id: "testRecipeQuantityID", recipeID: "testRecipeID", quantity: 420, totalRecipeWeight: 100, save: jest.fn().mockResolvedValue(true) });
		recipe.findById.mockResolvedValue({ _id: "testRecipeID", save: jest.fn().mockResolvedValue(true) });
		recipeItem.find.mockResolvedValue([{ _id: "testRecipeItemID", foodItemID: "testFoodItemID", recipeID: "testRecipeID", save: jest.fn().mockResolvedValue(true) }]);
		foodItem.findById.mockResolvedValue({ _id: "testFoodItemID",  weight: 125, foodID: "testFoodID", save: jest.fn().mockResolvedValue(true) });
		food.findById.mockResolvedValue({ _id: "testFoodID", calories: 69, save: jest.fn().mockResolvedValue(true) });

		const response = await request(app)
			.get("/stats/dailyCaloricIntake")
			.set("Authorization", `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("totalCalories");
		expect(response.body.totalCalories).toBe(289.8);
	}); 

	it("should return 200 and the correct total water intake for the day", async () => {
		userDay.findOne.mockResolvedValue({ _id: "testUserDayID", date: new Date().toISOString(), userID: "testUserID", save: jest.fn().mockResolvedValue(true)});
		userDayMeal.find.mockResolvedValue([ { _id: "testUserDayMealID", name: "Dinner", userDayID: "testUserDayID2", save: jest.fn().mockResolvedValue(true)}]);
		mealItem.find.mockResolvedValue([{ _id: "testMealItemID", name: "testmealItem", foodItemID: "testFoodItemID", userDayMealID: "testUserDayMealID", save: jest.fn().mockResolvedValue(true) }]);
		foodItem.findById.mockResolvedValue({ _id: "testFoodItemID",  weight: 200, foodID: "testFoodID", save: jest.fn().mockResolvedValue(true) });
		food.findById.mockResolvedValue({ _id: "testFoodID", water: 100, save: jest.fn().mockResolvedValue(true) });

		const response = await request(app)
			.get("/stats/dailyWaterIntake")
			.set("Authorization", `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("totalWater");
		expect(response.body.totalWater).toBe(200);
	});

	it("should return 200 and the correct total protein intake for the day", async () => {
		userDay.findOne.mockResolvedValue({ _id: "testUserDayID", date: new Date().toISOString(), userID: "testUserID", save: jest.fn().mockResolvedValue(true)});
		userDayMeal.find.mockResolvedValue([ { _id: "testUserDayMealID", name: "Dinner", userDayID: "testUserDayID2", save: jest.fn().mockResolvedValue(true)}]);
		mealItem.find.mockResolvedValue([{ _id: "testMealItemID", name: "testmealItem", foodItemID: "testFoodItemID", userDayMealID: "testUserDayMealID", save: jest.fn().mockResolvedValue(true) }]);
		foodItem.findById.mockResolvedValue({ _id: "testFoodItemID",  weight: 200, foodID: "testFoodID", save: jest.fn().mockResolvedValue(true) });
		food.findById.mockResolvedValue({ _id: "testFoodID", protein: 100, save: jest.fn().mockResolvedValue(true) });

		const response = await request(app)
			.get("/stats/dailyProteinIntake")
			.set("Authorization", `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("totalProtein");
		expect(response.body.totalProtein).toBe(200);
	});

	it("should return 200 and the correct total carb intake for the day", async () => {
		userDay.findOne.mockResolvedValue({ _id: "testUserDayID", date: new Date().toISOString(), userID: "testUserID", save: jest.fn().mockResolvedValue(true)});
		userDayMeal.find.mockResolvedValue([ { _id: "testUserDayMealID", name: "Dinner", userDayID: "testUserDayID2", save: jest.fn().mockResolvedValue(true)}]);
		mealItem.find.mockResolvedValue([{ _id: "testMealItemID", name: "testmealItem", foodItemID: "testFoodItemID", userDayMealID: "testUserDayMealID", save: jest.fn().mockResolvedValue(true) }]);
		foodItem.findById.mockResolvedValue({ _id: "testFoodItemID",  weight: 200, foodID: "testFoodID", save: jest.fn().mockResolvedValue(true) });
		food.findById.mockResolvedValue({ _id: "testFoodID", carbs: 100, save: jest.fn().mockResolvedValue(true) });

		const response = await request(app)
			.get("/stats/dailyCarbIntake")
			.set("Authorization", `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("totalCarbs");
		expect(response.body.totalCarbs).toBe(200);
	});

	it("should return 200 and the correct total fat intake for the day", async () => {
		userDay.findOne.mockResolvedValue({ _id: "testUserDayID", date: new Date().toISOString(), userID: "testUserID", save: jest.fn().mockResolvedValue(true)});
		userDayMeal.find.mockResolvedValue([ { _id: "testUserDayMealID", name: "Dinner", userDayID: "testUserDayID2", save: jest.fn().mockResolvedValue(true)}]);
		mealItem.find.mockResolvedValue([{ _id: "testMealItemID", name: "testmealItem", foodItemID: "testFoodItemID", userDayMealID: "testUserDayMealID", save: jest.fn().mockResolvedValue(true) }]);
		foodItem.findById.mockResolvedValue({ _id: "testFoodItemID",  weight: 200, foodID: "testFoodID", save: jest.fn().mockResolvedValue(true) });
		food.findById.mockResolvedValue({ _id: "testFoodID", fat: 100, save: jest.fn().mockResolvedValue(true) });

		const response = await request(app)
			.get("/stats/dailyFatIntake")
			.set("Authorization", `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("totalFat");
		expect(response.body.totalFat).toBe(200);
	});

	it("should return 200 and the correct total sugar intake for the day", async () => {
		userDay.findOne.mockResolvedValue({ _id: "testUserDayID", date: new Date().toISOString(), userID: "testUserID", save: jest.fn().mockResolvedValue(true)});
		userDayMeal.find.mockResolvedValue([ { _id: "testUserDayMealID", name: "Dinner", userDayID: "testUserDayID2", save: jest.fn().mockResolvedValue(true)}]);
		mealItem.find.mockResolvedValue([{ _id: "testMealItemID", name: "testmealItem", foodItemID: "testFoodItemID", userDayMealID: "testUserDayMealID", save: jest.fn().mockResolvedValue(true) }]);
		foodItem.findById.mockResolvedValue({ _id: "testFoodItemID",  weight: 200, foodID: "testFoodID", save: jest.fn().mockResolvedValue(true) });
		food.findById.mockResolvedValue({ _id: "testFoodID", sugar: 100, save: jest.fn().mockResolvedValue(true) });

		const response = await request(app)
			.get("/stats/dailySugarIntake")
			.set("Authorization", `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("totalSugar");
		expect(response.body.totalSugar).toBe(200);
	});

	it("should return 200 and the correct total sodium intake for the day", async () => {
		userDay.findOne.mockResolvedValue({ _id: "testUserDayID", date: new Date().toISOString(), userID: "testUserID", save: jest.fn().mockResolvedValue(true)});
		userDayMeal.find.mockResolvedValue([ { _id: "testUserDayMealID", name: "Dinner", userDayID: "testUserDayID2", save: jest.fn().mockResolvedValue(true)}]);
		mealItem.find.mockResolvedValue([{ _id: "testMealItemID", name: "testmealItem", foodItemID: "testFoodItemID", userDayMealID: "testUserDayMealID", save: jest.fn().mockResolvedValue(true) }]);
		foodItem.findById.mockResolvedValue({ _id: "testFoodItemID",  weight: 200, foodID: "testFoodID", save: jest.fn().mockResolvedValue(true) });
		food.findById.mockResolvedValue({ _id: "testFoodID", sodium: 100, save: jest.fn().mockResolvedValue(true) });

		const response = await request(app)
			.get("/stats/dailySodiumIntake")
			.set("Authorization", `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("totalSodium");
		expect(response.body.totalSodium).toBe(200);
	});

	it("should return 200 and the correct total fiber (fibre) intake for the day", async () => {
		userDay.findOne.mockResolvedValue({ _id: "testUserDayID", date: new Date().toISOString(), userID: "testUserID", save: jest.fn().mockResolvedValue(true)});
		userDayMeal.find.mockResolvedValue([ { _id: "testUserDayMealID", name: "Dinner", userDayID: "testUserDayID2", save: jest.fn().mockResolvedValue(true)}]);
		mealItem.find.mockResolvedValue([{ _id: "testMealItemID", name: "testmealItem", foodItemID: "testFoodItemID", userDayMealID: "testUserDayMealID", save: jest.fn().mockResolvedValue(true) }]);
		foodItem.findById.mockResolvedValue({ _id: "testFoodItemID",  weight: 200, foodID: "testFoodID", save: jest.fn().mockResolvedValue(true) });
		food.findById.mockResolvedValue({ _id: "testFoodID", fibre: 100, save: jest.fn().mockResolvedValue(true) });

		const response = await request(app)
			.get("/stats/dailyFibreIntake")
			.set("Authorization", `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("totalFibre");
		expect(response.body.totalFibre).toBe(200);
	});

	it("should return 500 if an error occurs", async () => {
		jest.spyOn(userDay, "findOne").mockRejectedValue(new Error("test error"));
		const response = await request(app)
			.get("/stats/dailyCaloricIntake")
			.set("Authorization", `Bearer ${token}`)
			.send({ date: new Date().toISOString() });

		expect(response.statusCode).toBe(500);
		expect(response.body).toHaveProperty("error");
	});
});