const mongoose = require('mongoose');
const User = require('../../models/user');
const Community = require('../../models/community');
const Recipe = require('../../models/recipe');
const CommunityAward = require('../../models/communityAward');

describe('Recipe Model Test', () => {
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
                createdBy: demoObject._id 
            };
            const validObject2 = new Community(demoData2);
            demoObject2 = await validObject2.save();

            const demoData3 = {
                name: 'Demo Recipe',
                description: 'This is a demo recipe.',
                createdBy: demoObject._id,
                communityThatOwnsRecipe: demoObject2._id
            };
            const validObject3 = new CommunityAward(demoData3);
            demoObject3 = await validObject3.save();

        } catch (err) {
            console.error('Error connecting to the database.', err);
            process.exit(1);
        }
    });

    it('should not allow name to be blank', async () => {
        demoObject3.name = ''; // set name to blank
        await attemptSave(demoObject3);
    });

    it('should not allow description to be blank', async () => {
        demoObject3.description = ''; // set description to blank
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
        await Community.deleteOne({ _id : demoObject._id });
        await Recipe.deleteOne({ _id : demoObject._id });
        await mongoose.disconnect();
    });
});