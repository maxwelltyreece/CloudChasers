const mongoose = require('mongoose');
const User = require('../../models/user');
const Food = require('../../models/food');

describe('Food Model Test', () => {
    let demoObject;
    let demoObject2;

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
                privacy: 'public',
                addedBy: demoObject._id
            };
            const validObject2 = new Food(demoData2);
            demoObject2 = await validObject2.save();

        } catch (err) {
            console.error('Error connecting to the database.', err);
            process.exit(1);
        }
    });

    it('should not allow name to be blank', async () => {
        demoObject2.name = ''; // set name to blank
        await attemptSave(demoObject2);
    });

    it('should not allow group to be blank', async () => {
        demoObject2.group = ''; // set group to blank
        await attemptSave(demoObject2);
    });

    it('should not allow calories to be blank', async () => {
        demoObject2.calories = ''; // set calories to blank
        await attemptSave(demoObject2);
    });

    it('should not allow privacy to be blank', async () => {
        demoObject2.privacy = ''; // set privacy to blank
        await attemptSave(demoObject2);
    });

    it('privacy should not be a string not part of the enum list', async () => {
        demoObject2.privacy = 'Invalid'; // Set status to a string not part of the enum list
        try {
            await demoObject2.save();
            // If save was successful, test should fail
            fail('privacy should not be a string not part of the enum list');
        } catch (err) {
            // If an error is thrown, it means MongoDB validation has worked correctly
            expect(err.errors.privacy).toBeDefined();
            expect(err.errors.privacy.message).toBe('`Invalid` is not a valid enum value for path `privacy`.');
        }
    });

    it('should not allow macroContent attributes to be outside the 0-100 range', async () => {
        // Set some macroContent attributes to values outside the 0-100 range
        demoObject2.protein = -1;
        demoObject2.carbs = 101;
    
        try {
            await demoObject2.save();
            // If save was successful, test should fail
            fail('macroContent attributes should not be outside the 0-100 range');
        } catch (err) {
            // If an error is thrown, it means MongoDB validation has worked correctly
            expect(err.errors.protein).toBeDefined();
            expect(err.errors.protein.message).toBe('There must be within 0-100g of protein in this food');
            expect(err.errors.carbs).toBeDefined();
            expect(err.errors.carbs.message).toBe('There must be within 0-100g of carbs in this food');
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
        await mongoose.disconnect();
    });
});

