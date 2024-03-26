const mongoose = require('mongoose');
const PersonalAward = require('../../models/personalAward');

describe('Personal Award Model Test', () => {
	let demoObject;

	beforeAll(async () => {
		try {
			collection = 'test';
			const url = `mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/${collection}?retryWrites=true&w=majority`;
			await mongoose.connect(url);
			console.log('Connected to the database');

			const demoData = {
				name: "Demo Personal Award",
				description: "This is a demo personal award."
			};
			const validObject = new PersonalAward(demoData);
			demoObject = await validObject.save();

		} catch (err) {
			console.error('Error connecting to the database.', err);
			process.exit(1);
		}
	});

	it('create & save personal award successfully', () => {
		expect(demoObject._id).toBeDefined();
		expect(demoObject.name).toBe('Demo Personal Award');
		expect(demoObject.description).toBe('This is a demo personal award.');
	});

	it('should not allow name to be blank', async () => {
		demoObject.name = ''; // set name to blank
		await attemptSave(demoObject);
	});

	it('should not allow description to be blank', async () => {
		demoObject.description = ''; // set description to blank
		await attemptSave(demoObject);
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
		await PersonalAward.deleteOne({ _id : demoObject._id });
		await mongoose.disconnect();
	});
});