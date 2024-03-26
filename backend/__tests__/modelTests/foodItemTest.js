const mongoose = require('mongoose');
const User = require('../../models/user');
const Food = require('../../models/food');
const FoodItem = require('../../models/foodItem');

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
			const validUser = new User(demoData);
			demoObject = await validUser.save();

			const demoData2 = {
				name: 'Demo Food',
				group: 'Demo Group',
				calories: 100,
				privacy: 'public'
			};
			const validObject2 = new Food(demoData2);
			demoObject2 = await validObject2.save();

			const demoData3 = {
				foodID: demoObject2._id,
				weight: 100
			};
			const validObject3 = new FoodItem(demoData3);
			demoObject3 = await validObject3.save();

		} catch (err) {
			console.error('Error connecting to the database.', err);
			process.exit(1);
		}
	});

	it('should not allow weight to be null', async () => {
		demoObject3.weight = null; // set weight to blank
		await attemptSave(demoObject3);
	});

	it('should not allow weight attributes to be less than 0', async () => {
		// Set some macroContent attributes to values outside the 0-100 range
		demoObject3.weight = -1;

		try {
			await demoObject3.save();
			// If save was successful, test should fail
			fail('weight attributes should not be outside below 0');
		} catch (err) {
			// If an error is thrown, it means MongoDB validation has worked correctly
			expect(err.errors.weight).toBeDefined();
			expect(err.errors.weight.message).toBe('Weight must be greater than 0');
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
		await Food.deleteOne({ _id : demoObject2._id });
		await FoodItem.deleteOne({ _id : demoObject3._id });
		await mongoose.disconnect();
	});
});