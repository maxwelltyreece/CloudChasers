if (process.env.NODE_ENV === "test") {
	require("dotenv").config({ path: ".env.test" });
}

const jwt = require("jsonwebtoken");


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

const Recipe = require("../models/recipe");
const userDayMeal = require("../models/userDayMeal");

//todo: delete item from recipe

describe("Recipe Management", () => {
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


		community = new mongoose.Types.ObjectId();
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


	beforeEach(async () => {
		food = await Food.create({
			name: "Test Food",
			group: "Test Group",
			calories: 100,
			privacy: "public",
		});

		recipe = await Recipe.create({
			name: "Test Recipe",
			description: "A test recipe",
			createdBy: user._id,
			communityThatOwnsRecipe: community,
		});
	});


	// Clean up the database
	afterEach(async () => {
		await Recipe.deleteMany({});
		await Food.deleteMany({});
		await RecipeItem.deleteMany({});
		await FoodItem.deleteMany({});
		await RecipeQuantity.deleteMany({});
		await UserDay.deleteMany({});
		await UserDayMeal.deleteMany({});
		await MealItem.deleteMany({});
		jest.restoreAllMocks();
	});


	afterAll(async () => {
		await User.deleteMany({});
		await mongoose.connection.close();
	});

	describe("Recipe Creation and Deletion", () => {
		// Create new recipe
		it("should create a new recipe and save it to the database", async () => {
			const recipeData = {
				name: "Integration Test Recipe",
				description: "A test recipe for integration testing",
				communityThatOwnsRecipe: community.toString(),
			};

			const response = await request(app)
				.post("/food/createNewRecipeByUser")
				.set("Authorization", `Bearer ${token}`)
				.send(recipeData);

			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty("message", "Recipe created");
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
			expect(recipe.communityThatOwnsRecipe.toString()).toBe(
				community.toString()
			);
		});

		it("should return an error if recipe creation fails", async () => {
			// Mock the save function to simulate a failure
			const saveMock = jest.spyOn(Recipe.prototype, "save");
			saveMock.mockImplementationOnce(() =>
				Promise.reject(new Error("Failed to save recipe"))
			);

			const recipeData = {
				name: "Faulty Recipe",
				description: "This recipe should cause an error",
				communityThatOwnsRecipe: community.toString(),
			};


			const response = await request(app)
				.post("/food/createNewRecipeByUser")
				.set("Authorization", `Bearer ${token}`)
				.send(recipeData);


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Failed to save recipe");

			// Ensure that no new recipe was created
			const recipe = await Recipe.findOne({ name: recipeData.name });
			expect(recipe).toBeNull();
			saveMock.mockRestore();
		});
	});

	describe("Recipe Item Manipulation", () => {
		// Tests for adding, deleting, and updating recipe items
		it("should add a food item to a recipe", async () => {
			const foodItemData = {
				recipeID: recipe._id.toString(),
				foodID: food._id.toString(),
				weight: 200,
			};


			const response = await request(app)
				.put("/food/addItemToRecipe")
				.set("Authorization", `Bearer ${token}`)
				.send(foodItemData);


			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty(
				"message",
				"Item added to recipe"
			);
			expect(response.body.data).toMatchObject({
				recipeID: recipe._id.toString(),
				foodItemID: expect.any(String),
			});

			const recipeItem = await RecipeItem.findById(
				response.body.data._id
			);
			expect(recipeItem).toBeTruthy();
			expect(recipeItem.recipeID.toString()).toBe(recipe._id.toString());
			expect(recipeItem.foodItemID.toString()).toBe(
				response.body.data.foodItemID
			);
		});

		it("should return 400 if the recipe does not exist", async () => {
			const fakeRecipeId = new mongoose.Types.ObjectId();


			const response = await request(app)
				.put("/food/addItemToRecipe")
				.set("Authorization", `Bearer ${token}`)
				.send({
					recipeID: fakeRecipeId.toString(),
					foodID: food._id.toString(),
					weight: 200,
				});


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty(
				"message",
				"Recipe does not exist"
			);
		});

		it("should return 400 if the food does not exist", async () => {
			const fakeFoodId = new mongoose.Types.ObjectId();


			const response = await request(app)
				.put("/food/addItemToRecipe")
				.set("Authorization", `Bearer ${token}`)
				.send({
					recipeID: recipe._id.toString(),
					foodID: fakeFoodId.toString(),
					weight: 200,
				});

			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty(
				"message",
				"Food does not exist"
			);
		});

		it("should return 400 if there is an error saving the food item", async () => {
			const response = await request(app)
				.put("/food/addItemToRecipe")
				.set("Authorization", `Bearer ${token}`)
				.send({
					recipeID: recipe._id.toString(),
					foodID: food._id.toString(),
					weight: -200,
				});


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
		});

		// Delete item from recipe
		it("should delete a recipe item from the recipe", async () => {
			const recipe = await Recipe.create({
				name: "Recipe",
				description: "Description",
				createdBy: user._id,
			});
			const foodItem = await FoodItem.create({
				foodID: food._id,
				weight: 100,
			});
			const recipeItem = await RecipeItem.create({
				recipeID: recipe._id,
				foodItemID: foodItem._id,
			});

			const response = await request(app)
				.delete("/food/deleteItemFromRecipe")
				.set("Authorization", `Bearer ${token}`)
				.send({ recipeItemID: recipeItem._id.toString() });


			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty(
				"message",
				"Recipe Item deleted"
			);

			const deletedRecipeItem = await RecipeItem.findById(recipeItem._id);
			expect(deletedRecipeItem).toBeNull();
		});

		it("should return 400 if the recipe item does not exist", async () => {
			const fakeRecipeItemId = new mongoose.Types.ObjectId();
			const response = await request(app)
				.delete("/food/deleteItemFromRecipe")
				.set("Authorization", `Bearer ${token}`)
				.send({ recipeItemID: fakeRecipeItemId.toString() });


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty(
				"message",
				"Recipe Item does not exist"
			);
		});

		it("should handle errors during recipe retrieval", async () => {
			const recipe = await Recipe.create({
				name: "Recipe",
				description: "Description",
				createdBy: user._id,
			});
			const foodItem = await FoodItem.create({
				foodID: food._id,
				weight: 100,
			});
			const recipeItem = await RecipeItem.create({
				recipeID: recipe._id,
				foodItemID: foodItem._id,
			});

			// Mock the Recipe.findById to throw an error
			jest.spyOn(RecipeItem, "findByIdAndDelete").mockImplementationOnce(
				() => {
					throw new Error("Database error");
				}
			);

			const response = await request(app)
				.delete("/food/deleteItemFromRecipe")
				.set("Authorization", `Bearer ${token}`)
				.send({ recipeItemID: recipeItem._id.toString() });


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Database error");
		});
	});

	describe("Recipe Retrieval", () => {
		// Tests for retrieving recipes
		// get recipe
		it("should return 400 if the recipe does not exist", async () => {
			const fakeRecipeId = new mongoose.Types.ObjectId();


			const response = await request(app)
				.get("/food/getRecipe")
				.set("Authorization", `Bearer ${token}`)
				.query({ recipeID: fakeRecipeId.toString() });


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty(
				"message",
				"Recipe does not exist"
			);
		});

		it("should handle errors during recipe retrieval", async () => {
			const fakeRecipeId = new mongoose.Types.ObjectId().toString();


			// Mock the Recipe.findById to throw an error
			jest.spyOn(Recipe, "findById").mockImplementationOnce(() => {
				throw new Error("Database error");
			});


			const response = await request(app)
				.get("/food/getRecipe")
				.set("Authorization", `Bearer ${token}`)
				.query({ recipeID: fakeRecipeId });


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Database error");

			// Restore the original implementation after the test
			jest.restoreAllMocks();
		});

		it("should retrieve a recipe and its associated items", async () => {
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
				.get("/food/getRecipe")
				.set("Authorization", `Bearer ${token}`)
				.query({ recipeID: recipe._id.toString() });


			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty("message", "Recipe found");
			expect(response.body.data).toHaveProperty("recipe");
			expect(response.body.data).toHaveProperty("recipeItems");
			expect(response.body.data.recipe._id.toString()).toBe(
				recipe._id.toString()
			);
			expect(response.body.data.recipeItems.length).toBeGreaterThan(0);
			expect(
				response.body.data.recipeItems[0].foodItemID.toString()
			).toBe(newFoodItem._id.toString());
		});

		//get recipe ingredients
		it("should retrieve ingredients for a specific recipe", async () => {
			const foodItem = await FoodItem.create({
				foodID: food._id,
				weight: 200,
			});
			await RecipeItem.create({
				foodItemID: foodItem._id,
				recipeID: recipe._id,
			});

			const response = await request(app)
				.get("/food/getRecipeIngredients")
				.set("Authorization", `Bearer ${token}`)
				.query({ recipeID: recipe._id.toString() });


			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty(
				"message",
				"Recipe ingredients found"
			);
			expect(response.body.data).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						name: food.name,
						id: food._id.toString(),
						weight: foodItem.weight,
						recipeItemId: expect.any(String),
					}),
				])
			);
		});

		it("should handle errors during food retrieval", async () => {
			const foodItem = await FoodItem.create({
				foodID: food._id,
				weight: 200,
			});
			await RecipeItem.create({
				foodItemID: foodItem._id,
				recipeID: recipe._id,
			});

			jest.spyOn(Food, "findById").mockImplementationOnce(() => {
				throw new Error("Database error");
			});


			const response = await request(app)
				.get("/food/getRecipeIngredients")
				.set("Authorization", `Bearer ${token}`)
				.query({ recipeID: recipe._id.toString() });


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Database error");

			// Restore the original implementation after the test
			jest.restoreAllMocks();
		});

		it("should return 400 if the recipe does not exist", async () => {
			const fakeRecipeId = new mongoose.Types.ObjectId();


			const response = await request(app)
				.get("/food/getRecipeIngredients")
				.set("Authorization", `Bearer ${token}`)
				.query({ recipeID: fakeRecipeId.toString() });

			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty(
				"message",
				"Recipe does not exist"
			);
		});

		//community recipes
		it("should retrieve recipes for a specific community", async () => {
			const communityID = new mongoose.Types.ObjectId();
			await Recipe.create([
				{
					name: "Recipe 1",
					description: "test description",
					communityThatOwnsRecipe: communityID,
				},
				{
					name: "Recipe 2",
					description: "test description",
					communityThatOwnsRecipe: communityID,
				},
			]);


			const response = await request(app)
				.get("/food/getCommunityRecipes")
				.query({ communityID: communityID.toString() });


			expect(response.statusCode).toBe(200);
			expect(response.body.data.length).toBeGreaterThan(0);
			expect(response.body.message).toBe("Recipes found");
		});

		it("should return 400 when the community does not exist", async () => {
			const fakeCommunityID = new mongoose.Types.ObjectId();


			const response = await request(app)
				.get("/food/getCommunityRecipes")
				.query({ communityID: fakeCommunityID.toString() });


			expect(response.statusCode).toBe(400);
		});

		it("should handle errors when retrieving community recipes", async () => {
			const fakeCommunityId = new mongoose.Types.ObjectId().toString();


			// Mock the Recipe.find method to throw an error
			jest.spyOn(Recipe, "find").mockImplementationOnce(() => {
				throw new Error("Database error");
			});


			const response = await request(app)
				.get("/food/getCommunityRecipes")
				.query({ communityID: fakeCommunityId });


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Database error");
		});

		// get user recipes
		it("should retrieve all recipes created by a user", async () => {
			const anotherUser = await User.create({
				forename: "John2",
				surname: "Doe2",
				username: "johndoe2",
				email: "johndoe2@example.com",
				password: "securepassword2",
				dateOfBirth: new Date(1990, 0, 2),
			});
			await Recipe.create({
				name: "Recipe 3",
				description: "Description 3",
				createdBy: anotherUser._id,
			});

			const response = await request(app)
				.get("/food/getUserRecipes")
				.set("Authorization", `Bearer ${token}`);

			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty("message", "Recipes found");
			expect(response.body.data.length).toBe(1); // Only the recipe created in the beforeEach block
			expect(
				response.body.data.every(
					(recipe) =>
						recipe.createdBy.toString() === user._id.toString()
				)
			).toBe(true);
			User.deleteOne({ _id: anotherUser._id });
		});

		it("should handle errors when retrieving user recipes", async () => {
			jest.spyOn(Recipe, "find").mockImplementationOnce(() => {
				throw new Error("Database error");
			});


			const response = await request(app)
				.get("/food/getUserRecipes")
				.set("Authorization", `Bearer ${token}`);

			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
		});
	});

	describe("Recipe Modification", () => {
		// Tests for modifying recipes
		// duplicate
		it("should duplicate a recipe for a user", async () => {
			// Create original recipe and items
			const recipe = await Recipe.create({
				name: "Original Recipe",
				description: "Original",
				createdBy: user._id,
			});
			const foodItem = await FoodItem.create({
				foodID: food._id,
				weight: 100,
			});
			await RecipeItem.create({
				recipeID: recipe._id,
				foodItemID: foodItem._id,
			});

			// Duplicate the recipe
			const response = await request(app)
				.post("/food/duplicateRecipe")
				.set("Authorization", `Bearer ${token}`)
				.send({ recipeID: recipe._id.toString() });


			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty(
				"message",
				"Recipe duplicated"
			);
			expect(response.body.data.name).toBe(recipe.name);


			// Verify the new recipe and its items in the database
			const newRecipe = await Recipe.findById(response.body.data._id);
			expect(newRecipe).toBeTruthy();
			expect(newRecipe.createdBy.toString()).toBe(user._id.toString());

			const newRecipeItems = await RecipeItem.find({
				recipeID: newRecipe._id,
			});
			expect(newRecipeItems.length).toBeGreaterThan(0);
		});

		it("should return 400 if the recipe does not exist", async () => {
			const fakeRecipeId = new mongoose.Types.ObjectId();


			const response = await request(app)
				.post("/food/duplicateRecipe")
				.set("Authorization", `Bearer ${token}`)
				.send({ recipeID: fakeRecipeId.toString() });


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty(
				"message",
				"Recipe does not exist"
			);
		});

		it("should handle errors during recipe duplication", async () => {
			const fakeRecipeId = new mongoose.Types.ObjectId().toString();


			// Mock the Recipe.findById to throw an error
			jest.spyOn(Recipe, "findById").mockImplementationOnce(() => {
				throw new Error("Database error");
			});


			const response = await request(app)
				.post("/food/duplicateRecipe")
				.set("Authorization", `Bearer ${token}`)
				.send({ recipeID: fakeRecipeId.toString() });


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Database error");

			// Restore the original implementation after the test
			jest.restoreAllMocks();
		});
	});

	describe("Recipe Logging", () => {
		// Tests for logging recipes in meals
		// logging food
		it("should successfully log recipe food", async () => {
			const mealType = "breakfast";
			const totalRecipeWeight = 500;


			const response = await request(app)
				.post("/food/logRecipeFood")
				.set("Authorization", `Bearer ${token}`)
				.send({ mealType, recipeID: recipe._id, totalRecipeWeight });


			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty("message", "Recipe logged");

			const userDay = await UserDay.findOne({ userID: user._id });
			expect(userDay).toBeTruthy();

			const userDayMeal = await UserDayMeal.findOne({
				userDayID: userDay._id,
				name: mealType,
			});
			expect(userDayMeal).toBeTruthy();

			const mealItem = await MealItem.findOne({
				userDayMealID: userDayMeal._id,
			});
			expect(mealItem).toBeTruthy();
			expect(mealItem.name).toBe(recipe.name);

			const recipeQuantity = await RecipeQuantity.findOne({
				recipeID: recipe._id,
				mealItemID: mealItem._id,
			});
			expect(recipeQuantity).toBeTruthy();
			expect(recipeQuantity.totalRecipeWeight).toBe(totalRecipeWeight);
		});

		it("should return an existing UserDay", async () => {
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			// eslint-disable-next-line no-unused-vars
			const existingUserDay = await UserDay.create({
				userID: user._id,
				date: today,
			});

			const mealType = "lunch";
			const totalRecipeWeight = 250;


			const response = await request(app)
				.post("/food/logRecipeFood")
				.set("Authorization", `Bearer ${token}`)
				.send({ mealType, recipeID: recipe._id, totalRecipeWeight });


			expect(response.statusCode).toBe(200);
			// Ensure that no new UserDayMeal was created
			const userDayCount = await UserDay.countDocuments({
				userID: user._id,
				date: today,
			});
			expect(userDayCount).toBe(1);
			expect(response.body).toHaveProperty("message", "Recipe logged");
		});

		it("should handle errors in createUserDay", async () => {
			jest.spyOn(UserDay, "findOne").mockImplementationOnce(() => {
				throw new Error("Database error");
			});

			const mealType = "dinner";
			const totalRecipeWeight = 300;


			const response = await request(app)
				.post("/food/logRecipeFood")
				.set("Authorization", `Bearer ${token}`)
				.send({ mealType, recipeID: recipe._id, totalRecipeWeight });


			expect(response.statusCode).toBe(501);
		});

		it("should return an existing UserDayMeal", async () => {
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			const userDay = await UserDay.create({
				userID: user._id,
				date: today,
			});

			const mealType = "breakfast";
			const existingUserDayMeal = await UserDayMeal.create({
				name: mealType,
				userDayID: userDay._id,
				order: 1,
			});


			const totalRecipeWeight = 500;


			const response = await request(app)
				.post("/food/logRecipeFood")
				.set("Authorization", `Bearer ${token}`)
				.send({ mealType, recipeID: recipe._id, totalRecipeWeight });


			expect(response.statusCode).toBe(200);
			// Ensure that no new UserDayMeal was created
			const userDayMealsCount = await UserDayMeal.countDocuments({
				userDayID: userDay._id,
			});
			expect(userDayMealsCount).toBe(1);
			expect(response.body).toHaveProperty("message", "Recipe logged");
		});

		it("should handle errors in createUserDayMeal", async () => {
			jest.spyOn(UserDayMeal, "findOne").mockImplementationOnce(() => {
				throw new Error("Database error in UserDayMeal");
			});

			const mealType = "lunch";
			const totalRecipeWeight = 300;


			const response = await request(app)
				.post("/food/logRecipeFood")
				.set("Authorization", `Bearer ${token}`)
				.send({ mealType, recipeID: recipe._id, totalRecipeWeight });


			expect(response.statusCode).toBe(501);
		});

		it("should handle transaction errors in logRecipeFood", async () => {
			jest.spyOn(Recipe, "findById").mockImplementationOnce(() => {
				throw new Error("Transaction error");
			});

			const mealType = "snack";
			const totalRecipeWeight = 200;


			const response = await request(app)
				.post("/food/logRecipeFood")
				.set("Authorization", `Bearer ${token}`)
				.send({ mealType, recipeID: recipe._id, totalRecipeWeight });


			expect(response.statusCode).toBe(501);
		});
	});

	describe("Recipe Analysis", () => {
		// Tests for analyzing recipes (weight, macros, etc.)
		// get recipe weight
		it("should calculate the total weight of a recipe", async () => {
			const weightRecipe = await Recipe.create({
				name: "Recipe for Weight",
				description: "test description",
			});
			const foodItem1 = await FoodItem.create({
				foodID: new mongoose.Types.ObjectId(),
				weight: 100,
			});
			const foodItem2 = await FoodItem.create({
				foodID: new mongoose.Types.ObjectId(),
				weight: 150,
			});
			await RecipeItem.create({
				recipeID: weightRecipe._id,
				foodItemID: foodItem1._id,
			});
			await RecipeItem.create({
				recipeID: weightRecipe._id,
				foodItemID: foodItem2._id,
			});

			const response = await request(app)
				.get("/food/getRecipeWeight")
				.query({ recipeID: weightRecipe._id.toString() });


			expect(response.error).toBe(false);
			expect(response.statusCode).toBe(200);
			expect(response.body.data).toBe(250);
		});

		it("should return 400 when the recipe does not exist for weight calculation", async () => {
			const fakeRecipeID = new mongoose.Types.ObjectId();


			const response = await request(app)
				.get("/food/getRecipeWeight")
				.query({ recipeID: fakeRecipeID.toString() });


			expect(response.statusCode).toBe(400);
		});

		it("should handle errors during recipe weight calculation", async () => {
			const fakeRecipeId = new mongoose.Types.ObjectId().toString();


			// Mock the RecipeItem.find to throw an error
			jest.spyOn(RecipeItem, "find").mockImplementationOnce(() => {
				throw new Error("Database error");
			});


			const response = await request(app)
				.get("/food/getRecipeWeight")
				.query({ recipeID: fakeRecipeId });


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Database error");
		});

		// Macro for recipes
		it("should calculate the macros of a recipe", async () => {
			const recipe = await Recipe.create({
				name: "Recipe for Macros",
				description: "test description",
			});
			const food = await Food.create({
				name: "Food",
				group: "beef",
				protein: 10,
				carbs: 20,
				fat: 5,
				calories: 150,
				privacy: "public",
			});
			const foodItem = await FoodItem.create({
				foodID: food._id,
				weight: 50,
			});
			await RecipeItem.create({
				recipeID: recipe._id,
				foodItemID: foodItem._id,
			});

			const response = await request(app)
				.get("/food/getRecipeMacro")
				.query({ recipeID: recipe._id.toString() });


			expect(response.statusCode).toBe(200);
			expect(response.body.data).toMatchObject({
				protein: 5,
				carbs: 10,
				fat: 2.5,
				calories: 75,
			});
		});

		it("should return 400 when the recipe does not exist for macro calculation", async () => {
			const recipeID = new mongoose.Types.ObjectId();


			const response = await request(app)
				.get("/food/getRecipeMacro")
				.query({ recipeID: recipeID.toString() });


			expect(response.statusCode).toBe(400);
		});

		it("should handle errors during recipe macros calculation", async () => {
			const fakeRecipeId = new mongoose.Types.ObjectId().toString();


			// Mock the RecipeItem.find to throw an error
			jest.spyOn(RecipeItem, "find").mockImplementationOnce(() => {
				throw new Error("Database error");
			});


			const response = await request(app)
				.get("/food/getRecipeMacro")
				.query({ recipeID: fakeRecipeId });


			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Database error");

			// Restore the original implementation after the test
			jest.restoreAllMocks();
		});
	});
});

describe("DELETE /recipe", () => {
	let user, recipe, foodItem, recipeItem, mealItem, recipeQuantity, food, userDay, userDayMeal, token;

	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
	});

	beforeEach(async () => {
		user = await User.create({
			forename: "John",
			surname: "Doe",
			username: "johndoe",
			email: "johndoe@example.com",
			password: "password123",
			dateOfBirth: new Date(1990, 0, 1),
		});

		token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

		food = await Food.create({
			name: "Carrot",
			group: "Vegetables",
			calories: 41,
			protein: 0.9,
			carbs: 9.6,
			fat: 0.2,
			privacy: "public",
			createBy: user._id,
		});

		foodItem = await FoodItem.create({
			foodID: food._id,
			weight: 100,
		});

		recipe = await Recipe.create({
			name: "Carrot Soup",
			createdBy: user._id,
		});

		recipeItem = await RecipeItem.create({
			recipeID: recipe._id,
			foodItemID: foodItem._id,
		});

		userDay = await UserDay.create({
			userID: user._id,
			date: new Date(),
		});

		userDayMeal = await UserDayMeal.create({
			name: "Dinner",
			userDayID: userDay._id,
		});

		mealItem = await MealItem.create({
			name: "apple",
			foodItemID: foodItem._id,
			userDayMealID: userDayMeal._id,
		});

		recipeQuantity = await RecipeQuantity.create({
			recipeID: recipe._id,
			mealItemID: mealItem._id,
			totalRecipeWeight: 100,
		});
	});

	afterEach(async () => {
		await User.deleteMany({});
		await Recipe.deleteMany({});
		await FoodItem.deleteMany({});
		await RecipeItem.deleteMany({});
		await MealItem.deleteMany({});
		await RecipeQuantity.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	test("should delete a recipe and its related entities", async () => {
		const response = await request(app)
			.delete("/food/deleteRecipe")
			.set("Authorization", `Bearer ${token}`)
			.send({ recipeID: recipe._id });

		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe("Recipe deleted");

		const deletedRecipe = await Recipe.findById(recipe._id);
		expect(deletedRecipe).toBeNull();

		const deletedRecipeItem = await RecipeItem.findOne({
			recipeID: recipe._id,
		});
		expect(deletedRecipeItem).toBeNull();

		const deletedFoodItem = await FoodItem.findById(foodItem._id);
		expect(deletedFoodItem).toBeNull();

		const deletedRecipeQuantity = await RecipeQuantity.findOne({
			recipeID: recipe._id,
		});
		expect(deletedRecipeQuantity).toBeNull();

		const deletedMealItem = await MealItem.findById(mealItem._id);
		expect(deletedMealItem).toBeNull();
	});

	test("should return an error if the recipe does not exist", async () => {
		const fakeRecipeId = new mongoose.Types.ObjectId();
		const response = await request(app)
			.delete("/food/deleteRecipe")
			.set("Authorization", `Bearer ${token}`)
			.send({ recipeID: fakeRecipeId });

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("Recipe does not exist");
	});

	test("should handle errors during recipe deletion", async () => {
		jest.spyOn(Recipe, "findByIdAndDelete").mockImplementationOnce(() => {
			throw new Error("Database error");
		});

		const response = await request(app)
			.delete("/food/deleteRecipe")
			.set("Authorization", `Bearer ${token}`)
			.send({ recipeID: recipe._id });

		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBe("Error: Database error");

		jest.restoreAllMocks();
	});
});

describe("POST /addMacroToRecipe", () => {
	let recipe;

	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
	});

	beforeEach(async () => {
		recipe = await Recipe.create({
			name: "Test Recipe",
			createdBy: new mongoose.Types.ObjectId(),
		});
	});

	afterEach(async () => {
		await Recipe.deleteMany({});
		await Food.deleteMany({});
		await FoodItem.deleteMany({});
		await RecipeItem.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	test("should add macro nutrients to a recipe", async () => {
		const macroDetails = {
			recipeID: recipe._id,
			protein: 10,
			carbs: 20,
			fat: 5,
			calories: 150,
		};

		const response = await request(app)
			.put("/food/addMacroToRecipe")
			.send(macroDetails);

		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe("Macro added to recipe");

		// Verify that the macro nutrients were added as a new Food and linked via FoodItem and RecipeItem
		const food = await Food.findOne({ name: "Macro", group: "Macro" });
		expect(food).toBeTruthy();
		expect(food.protein).toBe(macroDetails.protein);
		expect(food.carbs).toBe(macroDetails.carbs);
		expect(food.fat).toBe(macroDetails.fat);

		const foodItem = await FoodItem.findOne({ foodID: food._id });
		expect(foodItem).toBeTruthy();

		const recipeItem = await RecipeItem.findOne({
			foodItemID: foodItem._id,
			recipeID: recipe._id,
		});
		expect(recipeItem).toBeTruthy();
	});

	test("should return an error if the recipe does not exist", async () => {
		const response = await request(app)
			.put("/food/addMacroToRecipe")
			.send({
				recipeID: new mongoose.Types.ObjectId(), // Non-existent recipe ID
				protein: 10,
				carbs: 20,
				fat: 5,
				calories: 150,
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("Recipe does not exist");
	});

	test("should handle errors during the macro addition process", async () => {
		// Simulate an error scenario for Recipe.findById
		jest.spyOn(Recipe, "findById").mockImplementationOnce(() => {
			throw new Error("Database error");
		});

		const response = await request(app).put("/food/addMacroToRecipe").send({
			recipeID: recipe._id,
			protein: 10,
			carbs: 20,
			fat: 5,
			calories: 150,
		});

		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBe("Error: Database error");

		jest.restoreAllMocks();
	});
});


