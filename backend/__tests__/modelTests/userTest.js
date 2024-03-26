const mongoose = require('mongoose');
const User = require('../../models/user');

describe('User Model Test', () => {
	let demoObject;

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
				dateOfBirth: new Date('1990-01-01') 
			};
			const validObject = new User(demoData);
			demoObject = await validObject.save();
		} catch (err) {
			console.error('Error connecting to the database.', err);
			process.exit(1);
		}
	});

	it('create & save user successfully', () => {
		expect(demoObject.forename).toEqual('Jane');
		expect(demoObject.surname).toEqual('Doe');
		expect(demoObject.username).toEqual('janedoe');
		expect(demoObject.email).toEqual('jane@doe.com');
		expect(demoObject.password).toEqual('password');
		expect(demoObject.dateOfBirth).toEqual(new Date('1990-01-01'));
	});
        
	it('should not allow forename to be blank', async () => {
		demoObject.forename = ''; // set forename to blank
		await attemptSave(demoObject);
	});

	it('should not allow surname to be blank', async () => {
		demoObject.surname = ''; // set surname to blank
		await attemptSave(demoObject);
	});

	it('should not allow username to be blank', async () => {  
		demoObject.username = ''; // set username to blank
		await attemptSave(demoObject);
	});

	it('should not allow email to be an invalid email', async () => {
		// Set email to an invalid email
		demoObject.email = 'jane@doe';
    
		try {
			await demoObject.save();
			// If save was successful, test should fail
			fail('email should not be an invalid email');
		} catch (err) {
			// If an error is thrown, it means MongoDB validation has worked correctly
			expect(err.errors.email).toBeDefined();
			expect(err.errors.email.message).toBe('jane@doe is not a valid email');
		}
	});

	it('should not allow email to be an invalid email', async () => {
		// Set email to an invalid email
		demoObject.email = 'janedoe.com';
    
		try {
			await demoObject.save();
			// If save was successful, test should fail
			fail('email should not be an invalid email');
		} catch (err) {
			// If an error is thrown, it means MongoDB validation has worked correctly
			expect(err.errors.email).toBeDefined();
			expect(err.errors.email.message).toBe('janedoe.com is not a valid email');
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
		await mongoose.disconnect();
	});
});
