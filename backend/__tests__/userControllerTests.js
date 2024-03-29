if (process.env.NODE_ENV === "test") {
	require("dotenv").config({ path: ".env.test" });
}

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const token = jwt.sign({ userID: 'testUserID' }, process.env.SECRET_KEY);

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
describe("POST /register", () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
	});

	beforeEach(async () => {
		// Clear the users before each test to ensure a clean state
		await User.deleteMany({});
	});

	afterAll(async () => {
		await User.deleteMany({});
		await mongoose.disconnect();
	});

	it("should register a new user", async () => {
		const newUser = {
			forename: "forename",
			surname: "surname",
			username: "newUsername",
			email: "example@email.com",
			password: "password123",
			dateOfBirth: "1990-01-01",
			lastLogin: "2022-01-01",
		};

		// No need to check for existing user as the beforeEach ensures the DB is clean
		const response = await request(app).post("/register").send(newUser);

		expect(response.statusCode).toBe(200);
		expect(response.body.success).toBe(true);
		expect(response.body.message).toBe("User created");

		// Verify the user was created in the database
		const user = await User.findOne({ username: newUser.username });
		expect(user).toBeTruthy();
		expect(user.username).toBe(newUser.username);
		expect(user.email).toBe(newUser.email);
		expect(bcrypt.compareSync(newUser.password, user.password)).toBe(true); // Ensure password is hashed
	});

	it("should specify json in the content type header", async () => {
		const newUser = {
			forename: "forename",
			surname: "surname",
			username: "usernameJson",
			email: "json@example.com",
			password: "password1234",
			dateOfBirth: "1990-01-01",
			lastLogin: "2022-01-01",
		};

		const response = await request(app).post("/register").send(newUser);
		expect(response.headers["content-type"]).toEqual(
			expect.stringContaining("json")
		);
	});

	it("when username already exists, should return a 400 error", async () => {
		const existingUser = {
			forename: "forename",
			surname: "surname",
			username: "existingUsername",
			email: "exist@example.com",
			password: "password12345",
			dateOfBirth: "1990-01-01",
			lastLogin: "2022-01-01",
		};

		// Create a user directly in the database
		await new User(existingUser).save();

		// Try to register a user with the same username
		existingUser.email = "newemail@example.com"; // Change email to avoid email duplication error
		const response = await request(app)
			.post("/register")
			.send(existingUser);

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("Username already used");
	});

	it("when email already exists, should return a 400 error", async () => {
		const existingUser = {
			forename: "forename",
			surname: "surname",
			username: "uniqueUsername",
			email: "emailExist@example.com",
			password: "password67890",
			dateOfBirth: "1990-01-01",
			lastLogin: "2022-01-01",
		};

		// Create a user directly in the database
		await new User(existingUser).save();

		// Try to register a user with the same email
		existingUser.username = "newUniqueUsername"; // Change username to avoid username duplication error
		const response = await request(app)
			.post("/register")
			.send(existingUser);

		expect(response.statusCode).toBe(400);
		expect(response.body.message).toBe("Email already used");
	});
});

describe("POST /login", () => {
	let user;

	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
		await User.deleteMany({});
	});

	beforeEach(async () => {
		user = await User.create({
			forename: "John",
			surname: "Doe",
			username: "username",
			email: "john.doe@example.com",
			password: await bcrypt.hash("password123", 10),
			dateOfBirth: new Date(1990, 0, 1),
			lastLogin: new Date(),
		});
	});

	afterEach(async () => {
		await User.deleteMany({});
	});

	afterAll(async () => {
		await User.deleteMany({});
		await mongoose.connection.close();
	});

	test("should login a user", async () => {
		const response = await request(app).post("/login").send({
			username: "username",
			password: "password123",
		});
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty("data");
	});

	test("should specify json in the content type header", async () => {
		const response = await request(app).post("/login").send({
			username: "username",
			password: "password123",
		});
		expect(response.headers["content-type"]).toEqual(
			expect.stringContaining("json")
		);
	});

	test("when user does not exist", async () => {
		const response = await request(app).post("/login").send({
			username: "nonexistentuser",
			password: "password123",
		});
		expect(response.statusCode).toBe(401);
		expect(response.body).toEqual({ message: "Invalid credentials" });
	});

	test("when password is incorrect", async () => {
		const response = await request(app).post("/login").send({
			username: "username",
			password: "wrongpassword",
		});
		expect(response.statusCode).toBe(401);
		expect(response.body).toEqual({ message: "Invalid credentials" });
	});
});

describe("GET /users", () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
		await User.create([
			{
				forename: "forename",
				surname: "surname",
				username: "johndoe",
				email: "example@email.com",
				password: "password123",
				dateOfBirth: "1990-01-01",
				lastLogin: "2022-01-01",
			},
			{
				forename: "forename",
				surname: "surname",
				username: "johndoe2",
				email: "example2@email.com",
				password: "password123",
				dateOfBirth: "1990-01-01",
				lastLogin: "2022-01-01",
			},
		]);
	});

	beforeEach(async () => {});

	afterEach(async () => {
		await User.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	test("should retrieve all users", async () => {
		const response = await request(app).get("/users");
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveLength(2);
		expect(
			response.body.some((user) => user.username === "johndoe")
		).toBeTruthy();
		expect(
			response.body.some((user) => user.username === "johndoe2")
		).toBeTruthy();
	});

	test("should return JSON format", async () => {
		const response = await request(app).get("/users");
		expect(response.headers["content-type"]).toEqual(
			expect.stringContaining("json")
		);
	});

	test("should handle errors", async () => {
		// Mock an error scenario for User.find
		jest.spyOn(User, "find").mockImplementationOnce(() => {
			throw new Error("Database error");
		});

		const response = await request(app).get("/users");
		expect(response.statusCode).toBe(500);
		expect(response.body).toEqual({ error: "Error: Database error" });

		jest.restoreAllMocks();
	});
});

describe("GET /userDetail", () => {
	let user, token;

	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
		user = await User.create({
			forename: "forename",
			surname: "surname",
			username: "newUsername",
			email: "example@email.com",
			password: "password123",
			dateOfBirth: "1990-01-01",
			lastLogin: "2022-01-01",
		});
		token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
	});

	beforeEach(async () => {});

	afterEach(async () => {
		await User.deleteMany({});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	test("should retrieve the user detail", async () => {
		const response = await request(app)
			.get("/userDetails")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.data).toHaveProperty("_id", user._id.toString());
		expect(response.body.data).toHaveProperty("email", user.email);
		expect(response.body.data).toHaveProperty("username", user.username);
	});

	test("should return JSON format", async () => {
		const response = await request(app)
			.get("/userDetails")
			.set("Authorization", `Bearer ${token}`);

		expect(response.headers["content-type"]).toEqual(
			expect.stringContaining("json")
		);
	});
});

describe("POST /updateProfile", () => {
	let user, token;

	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
		// Assume User.deleteMany() is called elsewhere or not needed here
	});

	beforeEach(async () => {
		// Create a user for testing
		user = await User.create({
			forename: "forename",
			surname: "surname",
			username: "newUsername",
			email: "example@email.com",
			password: "password123",
			dateOfBirth: "1990-01-01",
			lastLogin: "2022-01-01",
		});
		// Assume token generation logic is handled elsewhere
		token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
	});

	afterEach(async () => {
		await User.deleteMany({});
	});

	afterAll(async () => {
		await User.deleteMany({});
		await mongoose.connection.close();
	});

	test("should update user profile", async () => {
		const updates = {
			forename: "Jane",
			surname: "Smith",
		};

		const response = await request(app)
			.put("/updateProfile")
			.set("Authorization", `Bearer ${token}`)
			.send(updates);

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({ message: "Profile updated" });

		// Verify the user was updated in the database
		const updatedUser = await User.findById(user._id);
		expect(updatedUser.forename).toBe(updates.forename);
		expect(updatedUser.surname).toBe(updates.surname);
	});

	test("should handle errors during profile update", async () => {
		// Mock user.save to simulate an error
		jest.spyOn(User.prototype, "save").mockImplementationOnce(() => {
			throw new Error("Database error");
		});

		const updates = {
			forename: "NewName",
		};

		const response = await request(app)
			.put("/updateProfile")
			.set("Authorization", `Bearer ${token}`)
			.send(updates);

		expect(response.statusCode).toBe(500);
		expect(response.body).toEqual({ error: "Error: Database error" });

		jest.restoreAllMocks();
	});
});

describe("GET /userDays", () => {
	let user, userDay1, userDay2, token;

	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
	});

	beforeEach(async () => {
		// Create a test user
		user = await User.create({
			forename: "forename",
			surname: "surname",
			username: "johndoe2",
			email: "example2@email.com",
			password: "password123",
			dateOfBirth: "1990-01-01",
			lastLogin: "2022-01-01",
		});

		token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
		// Create UserDay entries for the user
		userDay1 = await UserDay.create({
			date: new Date(),
			userID: user._id,
		});

		userDay2 = await UserDay.create({
			date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
			userID: user._id,
		});
		jest.spyOn(User, "findById").mockResolvedValue(user);
	});

	afterEach(async () => {
		await User.deleteMany({});
		await UserDay.deleteMany({});
		jest.restoreAllMocks();
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	test("should retrieve user days for the authenticated user", async () => {
		const response = await request(app)
			.get("/userDays")
			.set("Authorization", `Bearer ${token}`); // Assuming token is set in a higher scope or mock middleware

		expect(response.statusCode).toBe(200);
		expect(response.body.length).toBe(2);
		expect(
			response.body.some((day) =>
				new mongoose.Types.ObjectId(day._id).equals(userDay1._id)
			)
		).toBeTruthy();

		expect(
			response.body.some((day) =>
				new mongoose.Types.ObjectId(day._id).equals(userDay2._id)
			)
		).toBeTruthy();
	});

	test("should handle errors when fetching user days", async () => {
		jest.spyOn(UserDay, "find").mockImplementationOnce(() => {
			throw new Error("Database error");
		});

		const response = await request(app)
			.get("/userDays")
			.set("Authorization", `Bearer ${token}`);

		expect(response.statusCode).toBe(500);
		expect(response.body).toEqual({ error: "Error: Database error" });

		jest.restoreAllMocks();
	});
});
