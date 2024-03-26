const mongoose = require('mongoose');
const Community = require('../../models/community');
const User = require('../../models/user');

describe('Community Model Test', () => {
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
                dateOfBirth: new Date('1990-01-01') 
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
        } catch (err) {
            console.error('Error connecting to the database.', err);
            process.exit(1);
        }
    });

    it('should not allow name to be blank', async () => {
        demoObject2.name = '';
        await attemptSave(demoObject2);
    });

    it('should not allow description to be blank', async () => {
        demoObject2.description = '';
        await attemptSave(demoObject2);
    });

    it('should not allow recipePrivacy to be blank', async () => {
        demoObject2.recipePrivacy = '';
        await attemptSave(demoObject2);
    });

    it('should not allow joinPrivacy to be blank', async () => {
        demoObject2.joinPrivacy = '';
        await attemptSave(demoObject2);
    });

    it('joinPrivacy should not be a string not part of the enum list', async () => {
        demoObject2.joinPrivacy = 'Invalid'; // Set status to a string not part of the enum list
        try {
            await demoObject2.save();
            // If save was successful, test should fail
            fail('joinPrivacy should not be a string not part of the enum list');
        } catch (err) {
            // If an error is thrown, it means MongoDB validation has worked correctly
            expect(err.errors.joinPrivacy).toBeDefined();
            expect(err.errors.joinPrivacy.message).toBe('`Invalid` is not a valid enum value for path `joinPrivacy`.');
        }
    });

    it('recipePrivacy should not be a string not part of the enum list', async () => {
        demoObject2.recipePrivacy = 'Invalid'; // Set status to a string not part of the enum list
        try {
            await demoObject2.save();
            // If save was successful, test should fail
            fail('recipePrivacy should not be a string not part of the enum list');
        } catch (err) {
            // If an error is thrown, it means MongoDB validation has worked correctly
            expect(err.errors.recipePrivacy).toBeDefined();
            expect(err.errors.recipePrivacy.message).toBe('`Invalid` is not a valid enum value for path `recipePrivacy`.');
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
        await Community.deleteOne({ _id : demoObject._id });
        await User.deleteOne({ _id : demoObject._id });
        await mongoose.disconnect();
    });
});
