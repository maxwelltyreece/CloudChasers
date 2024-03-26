const mongoose = require('mongoose');
const Goal = require('../../models/goal'); 
const User = require('../../models/user');
const GoalItem = require('../../models/goalItem');

describe('Goal Item Model Test', () => {
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
				name: "Demo Goal",
				measurement: "calories"
			};
			const validObject = new Goal(demoData);
			demoObject = await validObject.save();

			const demoData2 = { 
				forename: 'Jane', 
				surname: 'Doe', 
				username: 'janedoe', 
				email: 'jane@doe.com', 
				password: 'password', 
				dateOfBirth: new Date() 
			};
			const validObject2 = new User(demoData2);
			demoObject2 = await validObject2.save();
            
			const demoData3 = {
				userID: demoObject2._id, // Replace with a valid user ID
				goalID: demoObject._id, // Replace with a valid goal ID
			};
			const validObject3 = new GoalItem(demoData3);
			demoObject3 = await validObject3.save();

		} catch (err) {
			console.error('Error connecting to the database.', err);
			process.exit(1);
		}
	});

	it('create & save goal item successfully', () => {
		expect(demoObject3._id).toBeDefined();
		expect(demoObject3.userID).toBe(demoObject2._id);
		expect(demoObject3.goalID).toBe(demoObject._id);
	});

	afterAll(async () => {
		await User.deleteOne({ _id : demoObject2._id });
		await Goal.deleteOne({ _id : demoObject._id });
		await GoalItem.deleteOne({ _id : demoObject3._id });

		await mongoose.disconnect();
	});
});