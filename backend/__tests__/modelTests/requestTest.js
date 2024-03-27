const Request = require('../../models/request');
const User = require('../../models/user');
const Community = require('../../models/community');
const mongoose = require('mongoose');

describe('Community Award Item Model Test', () => {
	let demoObject;
	let demoObject2;
	let demoObject3;

	beforeAll(async () => {
		try {
			collection = 'test';
			const url = `mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/${collection}?retryWrites=true&w=majority`;
			await mongoose.connect(url);
			console.log('Connected to the database');

			const demoData = { 
				forename: 'Jane', 
				surname: 'Doe', 
				username: 'janedoe', 
				email: 'jane@doe.com', 
				password: 'password', 
				dateOfBirth: new Date() 
			};
			const validObject = new User(demoData);
			demoObject = await validObject.save();
            
			const demoData2 = {
				name: "My Community",
				description: "This is a demo community",
				recipePrivacy: "public",
				joinPrivacy: "private",
				createdBy: demoObject._id // Replace with a valid user ID
			};
			const validObject2 = new Community(demoData2);
			demoObject2 = await validObject2.save();

			const demoData3 = {
				userID: demoObject._id,
				communityID: demoObject2._id
			};
			const validObject3 = new Request(demoData3);
			demoObject3 = await validObject3.save();

		} catch (err) {
			console.error('Error connecting to the database.', err);
			process.exit(1);
		}
	});

	it('should not allow status to be blank', async () => {
		demoObject3.status = ''; // set name to blank
		await attemptSave(demoObject3);
	});

	it('status should not be a string not part of the enum list', async () => {
		demoObject3.status = 'lasagne'; // Set status to a string not part of the enum list
		try {
			await demoObject3.save();
			// If save was successful, test should fail
			fail('status should not be a string not part of the enum list');
		} catch (err) {
			// If an error is thrown, it means MongoDB validation has worked correctly
			expect(err.errors.status).toBeDefined();
			expect(err.errors.status.message).toBe('`lasagne` is not a valid enum value for path `status`.');
		}
	});

	async function attemptSave(object) {
		try {
			const updatedObject = await object.save();
			// If save was successful, test should fail
			expect(updatedObject).toBeUndefined();
		} catch (error) {
			// If an error is thrown, it means MongoDB validation has worked correctly
			expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
		}
	}

	afterAll(async () => {
		await User.deleteOne({ _id : demoObject._id });
		await Community.deleteOne({ _id : demoObject2._id });
		await Request.deleteOne({ _id : demoObject3._id });
		await mongoose.disconnect();
	});
});