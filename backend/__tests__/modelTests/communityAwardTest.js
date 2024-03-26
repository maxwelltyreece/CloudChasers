const mongoose = require('mongoose');
const CommunityAward = require('../../models/communityAward');

describe('Community award Model Test', () => {
    let demoObject;
  
    beforeAll(async () => {
        try {
            collection = 'test';
            const url = `mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/${collection}?retryWrites=true&w=majority`;
            await mongoose.connect(url);
            console.log("Connected to the database");
            
            const demoData = {
                name: "Demo Award",
                description: "This is a demo community award."
            };
            const validObject = new CommunityAward(demoData);
            demoObject = await validObject.save();
        } catch (err) {
            console.error("Error connecting to the database.", err);
            process.exit(1);
        }
    });
    
    it('should not allow name to be blank', async () => {
        demoObject.name = '';
        await attemptSave(demoObject);
    });

    it('should not allow description to be blank', async () => {
        demoObject.description = '';
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
        await CommunityAward.deleteOne({ _id : demoObject._id });
        await mongoose.disconnect();
    });
});
