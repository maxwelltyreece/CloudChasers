if (process.env.NODE_ENV === "test") {
	require("dotenv").config({ path: ".env.test" });
}

const jwt = require("jsonwebtoken");

// const token = jwt.sign({ userID: 'testUserID' }, process.env.SECRET_KEY);

const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const User = require("../models/user");
const Community = require("../models/community");
const CommunityUser = require('../models/communityUser');
const CommunityPost = require('../models/communityPost');
const JoinRequest = require('../models/request');
//const { it } = require("node:test");


//todo: delete item from recipe


describe("Community Management", () => {
	let user, community, token;

	beforeAll(async () => {
		await mongoose.connect(process.env.DATABASE_URL);
		await User.deleteMany({});
		await Community.deleteMany({});
		await CommunityUser.deleteMany({});
		await CommunityPost.deleteMany({});
		await JoinRequest.deleteMany({});
		user = await User.create({
			forename: "John",
			surname: "Doe",
			username: "johndoe",
			email: "johndoe@example.com",
			password: "securepassword",
			dateOfBirth: new Date(1990, 0, 1),
		});
		user2 = await User.create({
			forename: "Jane",
			surname: "Doe",
			username: "janedoe",
			email: "janedoe@example.com",
			password: "securepassword",
			dateOfBirth: new Date(1990, 0, 1)
		});
		user3 = await User.create({
			forename: "Jim",
			surname: "Doe",
			username: "jimdoe",
			email: "jimdoe@example.com",
			password: "securepassword",
			dateOfBirth: new Date(1990, 0, 1)
		});
		user4 = await User.create({
			forename: "Jill",
			surname: "Doe",
			username: "jilldoe",
			email: "jilldoe@example.com",
			password: "securepassword",
			dateOfBirth: new Date(1990, 0, 1)
		});

		token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
		token2 = jwt.sign({ userId: user2._id }, process.env.SECRET_KEY);
		token3 = jwt.sign({ userId: user3._id }, process.env.SECRET_KEY);
		token4 = jwt.sign({ userId: user4._id }, process.env.SECRET_KEY);

	
	});

	beforeEach(async () => {
		community = await Community.create({
			name: "Test Community",
			description: "A test community",
			recipePrivacy: "public",
			joinPrivacy: "public",
			createdBy: user._id,
		});
		communityUser = await CommunityUser.create({
			communityID: community._id,
			userID: user._id,
			role: 'admin'
		});
		await CommunityUser.create({
			communityID: community._id,
			userID: user2._id,
			role: 'member'
		});
		

	});

	afterEach(async () => {
		await Community.deleteMany({});
		await CommunityUser.deleteMany({});
		await CommunityPost.deleteMany({});
		await JoinRequest.deleteMany({});
		jest.restoreAllMocks();
	});

	afterAll(async () => {
		await User.deleteMany({});
		await mongoose.connection.close();
	});

	describe("Community Creation and Deletion", () => {
		// Create new community
		it("should create a new community and save it to the database", async () => {
			const communityData = {
				name: "Integration Test Community",
				description: "A test community for integration testing",
				recipePrivacy: "public",
				joinPrivacy: "public",
			};

			const response = await request(app)
				.post("/community/create")
				.set("Authorization", `Bearer ${token}`)
				.send(communityData);

			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty("message", "Community created");
			expect(response.body.data).toMatchObject({
				name: communityData.name,
				description: communityData.description,
				createdBy: user._id.toString(),
			});

			const community = await Community.findOne({ name: communityData.name });
			expect(community).toBeTruthy();
			expect(community.description).toBe(communityData.description);
			expect(community.recipePrivacy).toBe(communityData.recipePrivacy);
			expect(community.joinPrivacy).toBe(communityData.joinPrivacy);
			expect(community.createdBy.toString()).toBe(user._id.toString());

			// check that appropriate communityUser entry was created
			const communityUser = await CommunityUser.findOne({ communityID: community._id, userID: user._id });
			expect(communityUser).toBeTruthy();
			expect(communityUser.role).toBe('admin');

		});
		it("should return an error if community name already exists", async () => {
			const communityData = {
				name: "Test Community",
				description: "A test community for integration testing",
				recipePrivacy: "public",
				joinPrivacy: "public",
			};

			const response = await request(app)
				.post("/community/create")
				.set("Authorization", `Bearer ${token}`)
				.send(communityData);

			expect(response.statusCode).toBe(400);
			expect(response.body.message).toBe("Community already exists");
		});
		it("should return an error if community creation fails", async () => {
			// Mock the save function to simulate a failure
			const saveMock = jest.spyOn(Community.prototype, "save");
			saveMock.mockImplementationOnce(() =>
				Promise.reject(new Error("Failed to save community"))
			);

			const communityData = {
				name: "Faulty Community",
				description: "This community should cause an error",
				recipePrivacy: "public",
				joinPrivacy: "public",
			};

			const response = await request(app)
				.post("/community/create")
				.set("Authorization", `Bearer ${token}`)
				.send(communityData);

			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Failed to save community");

			// Ensure that no new community was created
			const community = await Community.findOne({ name: communityData.name });
			expect(community).toBeNull();
			saveMock.mockRestore();
		});
		it("should successfully delete a community", async () => {
			const response = await request(app)
				.put("/community/delete")
				.set("Authorization", `Bearer ${token}`)
				.send({ communityId: community._id.toString() });

			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty("message", "Community deleted");

			const deletedCommunity = await Community.findById(community._id);
			expect(deletedCommunity).toBeNull();

			const deletedCommunityUser = await CommunityUser.findOne({ communityID: community._id });
			expect(deletedCommunityUser).toBeNull();
		});
		it("should return an error if the community does not exist", async () => {
			const fakeCommunityId = new mongoose.Types.ObjectId();

			const response = await request(app)
				.put("/community/delete")
				.set("Authorization", `Bearer ${token}`)
				.send({ communityId: fakeCommunityId.toString() });

			expect(response.statusCode).toBe(404);
			expect(response.body).toHaveProperty("message", "Community not found");
		});
		it("should return an error if the user is not an admin", async () => {
			const response = await request(app)
				.put("/community/delete")
				.set("Authorization", `Bearer ${token2}`)
				.send({ communityId: community._id.toString() });
			
			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("message", "User is not an admin of the community");
		});
		it("should handle errors during community deletion", async () => {
			// Mock the deleteOne function to throw an error
			jest.spyOn(Community, "deleteOne").mockImplementationOnce(() => {
				throw new Error("Database error");
			});

			const response = await request(app)
				.put("/community/delete")
				.set("Authorization", `Bearer ${token}`)
				.send({ communityId: community._id.toString() });

			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Database error");

			// Restore the original implementation after the test
			jest.restoreAllMocks();
		});	
	});
	describe("Getting community details", () => {
		// get community
		it("should retrieve a community and its details", async () => {
			const response = await request(app)
			.get("/community/details")
			.set("Authorization", `Bearer ${token}`)
			.send({ communityId: community._id.toString() });
			
			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty("success", true);
			expect(response.body.data).toHaveProperty("community");
			expect(response.body.data).toHaveProperty("members");
			expect(response.body.data.community._id.toString()).toBe(community._id.toString());
			expect(response.body.data.members).toBe(2);
			expect(response.body.data.community.createdBy.toString()).toBe(user._id.toString());
		});
		it("should return 404 if the community does not exist", async () => {
			const fakeCommunityId = new mongoose.Types.ObjectId();

			const response = await request(app)
				.get("/community/details")
				.set("Authorization", `Bearer ${token}`)
				.send({ communityId: fakeCommunityId.toString() });

			expect(response.statusCode).toBe(404);
			expect(response.body).toHaveProperty("message", "Community not found");
		});
		it("should handle errors during community retrieval", async () => {
			const fakeCommunityId = new mongoose.Types.ObjectId().toString();
			jest.spyOn(Community, "findById").mockImplementationOnce(() => {
				throw new Error("Database error");
			}
			);
			const response = await request(app)
				.get("/community/details")
				.set("Authorization", `Bearer ${token}`)
				.send({ communityId: fakeCommunityId });

			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Database error");
		});
	});
	describe("Getting community members", () => {
		it("should retrieve all members of a community", async () => {
			const response = await request(app)
				.get("/community/members")
				.set("Authorization", `Bearer ${token}`)
				.query({ communityId: community._id.toString() });

			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty("success", true);
			expect(response.body.data.length).toBe(2);
			expect(response.body.data[0]).toHaveProperty("_id");
			expect(response.body.data[0]).toHaveProperty("username", "johndoe");
			expect(response.body.data[0]).toHaveProperty("role", "admin");
			expect(response.body.data[0]).toHaveProperty("profilePictureLink");
			expect(response.body.data[1]).toHaveProperty("_id");
			expect(response.body.data[1]).toHaveProperty("username", "janedoe");
			expect(response.body.data[1]).toHaveProperty("role", "member");
			expect(response.body.data[1]).toHaveProperty("profilePictureLink");
		});
		it("should return 404 if the community does not exist", async () => {
			const fakeCommunityId = new mongoose.Types.ObjectId();

			const response = await request(app)
				.get("/community/members")
				.set("Authorization", `Bearer ${token}`)
				.query({ communityId: fakeCommunityId.toString() });

			expect(response.statusCode).toBe(404);
			expect(response.body).toHaveProperty("message", "Community not found");
		});
		it("should return 400 if the user is not a member of the community", async () => {
			const response = await request(app)
				.get("/community/members")
				.set("Authorization", `Bearer ${token3}`)
				.query({ communityId: community._id.toString() });

			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("message", "User is not a member of the community");
		});
		it("should handle errors during member retrieval", async () => {
			const fakeCommunityId = new mongoose.Types.ObjectId().toString();
			jest.spyOn(Community, "findById").mockImplementationOnce(() => {
				throw new Error("Database error");
			});

			const response = await request(app)
				.get("/community/members")
				.set("Authorization", `Bearer ${token}`)
				.query({ communityId: fakeCommunityId });

			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Database error");
		});
	});
	describe("Getting user role in community", () => {
		it("should retrieve the user's role in the community - admin", async () => {
			const response = await request(app)
				.get("/community/role")
				.set("Authorization", `Bearer ${token}`)
				.query({ communityId: community._id.toString() });

			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty("success", true);
			expect(response.body.data).toHaveProperty("role", "admin");
		});
		it("should retrieve the user's role in the community - member", async () => {
			const response = await request(app)
				.get("/community/role")
				.set("Authorization", `Bearer ${token2}`)
				.query({ communityId: community._id.toString() });

			expect(response.statusCode).toBe(200);
			expect(response.body).toHaveProperty("success", true);
			expect(response.body.data).toHaveProperty("role", "member");
		});
		it("should return 404 if the community does not exist", async () => {
			const fakeCommunityId = new mongoose.Types.ObjectId();

			const response = await request(app)
				.get("/community/role")
				.set("Authorization", `Bearer ${token}`)
				.query({ communityId: fakeCommunityId.toString() });

			expect(response.statusCode).toBe(404);
			expect(response.body).toHaveProperty("message", "Community not found");
		});
		it("should return 400 if the user is not a member of the community", async () => {
			const response = await request(app)
				.get("/community/role")
				.set("Authorization", `Bearer ${token3}`)
				.query({ communityId: community._id.toString() });

			expect(response.statusCode).toBe(400);
			expect(response.body.data).toHaveProperty("role", "none");
		});
		it("should handle errors during role retrieval", async () => {
			const fakeCommunityId = new mongoose.Types.ObjectId().toString();
			jest.spyOn(Community, "findById").mockImplementationOnce(() => {
				throw new Error("Database error");
			});

			const response = await request(app)
				.get("/community/role")
				.set("Authorization", `Bearer ${token}`)
				.query({ communityId: fakeCommunityId });

			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty("error");
			expect(response.body.error).toBe("Error: Database error");
		});
	});
	describe("Getting communities", () => {
		beforeAll(async () => {
			community2 = await Community.create({
				name: "Test Community 2",
				description: "Another test community",
				recipePrivacy: "public",
				joinPrivacy: "public",
				createdBy: user3._id,
			});
			communityUser2 = await CommunityUser.create({
				communityID: community2._id,
				userID: user3._id,
				role: 'admin'
			});
			
		});
		afterAll(async () => {
			await Community.deleteOne({ _id: community2._id });
			await CommunityUser.deleteOne({ communityID: community2._id });
		});
		describe("Getting all communities", () => {

			it("should retrieve all communities", async () => {
				const response = await request(app)
					.get("/community/all")
					.set("Authorization", `Bearer ${token}`);

				expect(response.statusCode).toBe(200);
				expect(response.body).toHaveProperty("success", true);
				expect(response.body.data.length).toBe(2);
				expect(response.body.data[0]).toHaveProperty("id");
				expect(response.body.data).toEqual(expect.arrayContaining([
					expect.objectContaining({ name: "Test Community", description: "A test community"}),
					expect.objectContaining({ name: "Test Community 2", description: "Another test community" })
				]));
				
			});
			it("should handle errors during community retrieval", async () => {
				jest.spyOn(Community, "find").mockImplementationOnce(() => {
					throw new Error("Database error");
				});

				const response = await request(app)
					.get("/community/all")
					.set("Authorization", `Bearer ${token}`);

				expect(response.statusCode).toBe(400);
				expect(response.body).toHaveProperty("error");
				expect(response.body.error).toBe("Error: Database error");
			});
		});
		describe("Getting user communities", () => {
			it("should retrieve all communities the user is a member of - member of 1", async () => {
				
				const response = await request(app)
					.get("/community/userCommunities")
					.set("Authorization", `Bearer ${token}`);
				console.log(response.body);
				expect(response.statusCode).toBe(200);
				expect(response.body).toHaveProperty("success", true);
				expect(response.body.data.length).toBe(1);
				expect(response.body.data[0]).toHaveProperty("id");
				expect(response.body.data).toEqual(expect.arrayContaining([
					expect.objectContaining({ name: "Test Community", description: "A test community"})
				]));
			});
			it("should retrieve all communities the user is a member of - member of 0", async () => {
				
				const response = await request(app)
					.get("/community/userCommunities")
					.set("Authorization", `Bearer ${token4}`);
				console.log(response.body);
				expect(response.statusCode).toBe(200);
				expect(response.body).toHaveProperty("success", true);
				expect(response.body.data.length).toBe(0);
			});
			it("should handle errors during community retrieval", async () => {
				jest.spyOn(Community, "find").mockImplementationOnce(() => {
					throw new Error("Database error");
				});

				const response = await request(app)
					.get("/community/userCommunities")
					.set("Authorization", `Bearer ${token}`);

				expect(response.statusCode).toBe(400);
				expect(response.body).toHaveProperty("error");
				expect(response.body.error).toBe("Error: Database error");
			});
		});
	});
});