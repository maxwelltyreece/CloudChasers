const mongoose = require('mongoose');
const User = require('../../models/user');
const UserDay = require('../../models/userDay');
const UserDayMeal = require('../../models/userDayMeal');

describe('User day Model Test', () => {
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
				date: new Date(),
				userID: demoObject._id
			};
			const validObject2 = new UserDay(demoData2);
			demoObject2 = await validObject2.save();

			const demoData3 = {
				name: "Breakfast",
				userDayID: demoObject2._id
			};
			const validObject3 = new UserDayMeal(demoData3);
			demoObject3 = await validObject3.save();

		} catch (err) {
			console.error('Error connecting to the database.', err);
			process.exit(1);
		}
	});

	it('create and save user day meal successfully', () => {
		expect(demoObject3._id).toBeDefined();
		expect(demoObject3.name).toBe("Breakfast");
		expect(demoObject3.userDayID).toBe(demoObject2._id);
	});

	it('name should not be empty', async () => {
		demoObject3.name = "";
		await attemptSave(demoObject3);
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
		await UserDay.deleteOne({ _id : demoObject2._id });
		await UserDayMeal.deleteOne({ _id : demoObject3._id });
		await mongoose.disconnect();
	});
});