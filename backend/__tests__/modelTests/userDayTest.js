const mongoose = require('mongoose');
const User = require('../../models/user');
const UserDay = require('../../models/userDay');

describe('User day Model Test', () => {
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
            const validObject = new User(demoData);
            demoObject = await validObject.save();
            
            const demoData2 = {
                date: new Date(),
                userID: demoObject._id
            };
            const validObject2 = new UserDay(demoData2);
            demoObject2 = await validObject2.save();

        } catch (err) {
            console.error('Error connecting to the database.', err);
            process.exit(1);
        }
    });

    it('create and save user day successfully', () => {
        expect(demoObject2._id).toBeDefined();
        expect(demoObject2.date).toBeInstanceOf(Date);
        expect(demoObject2.userID).toBe(demoObject._id);
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
        await mongoose.disconnect();
    });
});