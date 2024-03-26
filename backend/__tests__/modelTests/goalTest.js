const mongoose = require('mongoose');
const Goal = require('../../models/goal');

describe('Goal Model Test', () => {
    let demoObject;


    beforeAll(async () => {
        try {
            collection = 'test';
            const url = `mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/${collection}?retryWrites=true&w=majority`;
            await mongoose.connect(url);
            console.log('Connected to the database');

            const demoData = {
                name: 'Demo Goal',
                measurement: 'calories'
            };
            const validObject = new Goal(demoData);
            demoObject = await validObject.save();

        } catch (err) {
            console.error('Error connecting to the database.', err);
            process.exit(1);
        }
    });

    it('create & save goal successfully', async () => {
        expect(demoObject._id).toBeDefined();
        expect(demoObject.name).toBe('Demo Goal');
        expect(demoObject.measurement).toBe('calories');
    });

    it('should not allow name to be blank', async () => {
        demoObject.name = ''; // set name to blank
        await attemptSave(demoObject);
    });

    it('measurement should not be a string not part of the enum list', async () => {
        demoObject.measurement = 'Invalid'; // Set status to a string not part of the enum list
        try {
            await demoObject.save();
            // If save was successful, test should fail
            fail('measurement should not be a string not part of the enum list');
        } catch (err) {
            // If an error is thrown, it means MongoDB validation has worked correctly
            expect(err.errors.measurement).toBeDefined();
            expect(err.errors.measurement.message).toBe('`Invalid` is not a valid enum value for path `measurement`.');
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
        await Goal.deleteOne({ _id : demoObject._id });
        await mongoose.disconnect();
    });
});