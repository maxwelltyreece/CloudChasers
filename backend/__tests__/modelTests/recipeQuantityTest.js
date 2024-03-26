const mongoose = require('mongoose');
const User = require('../../models/user');
const UserDay = require('../../models/userDay');
const UserDayMeal = require('../../models/userDayMeal');
const MealItem = require('../../models/mealItem');
const Recipe = require('../../models/recipe');
const RecipeQuantity = require('../../models/recipeQuantity');

describe('Recipe quantity Model Test', () => {
    let demoObject;
    let demoObject2;
    let demoObject3;
    let demoObject4;
    let demoObject5;
    let demoObject6;

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

            const demoData4 = {
                name: "Demo Meal Item",
                userDayMealID: demoObject3._id
            };
            const validObject4 = new MealItem(demoData4);
            demoObject4 = await validObject4.save();

            const demoData5 = {
                name: 'Demo Recipe',
                description: 'This is a demo recipe.'
            };
            const validObject5 = new Recipe(demoData5);
            demoObject5 = await validObject5.save();

            const demoData6 = {
                mealItemID: demoObject4._id,
                recipeID: demoObject5._id,
                totalRecipeWeight: 100
            };
            const validObject6 = new RecipeQuantity(demoData6);
            demoObject6 = await validObject6.save();

        } catch (err) {
            console.error('Error connecting to the database.', err);
            process.exit(1);
        }
    });

    it('create and save recipe quantity successfully', () => {
        expect(demoObject6._id).toBeDefined();
        expect(demoObject6.mealItemID).toBe(demoObject4._id);
        expect(demoObject6.recipeID).toBe(demoObject5._id);
        expect(demoObject6.totalRecipeWeight).toBe(100);
    });

    afterAll(async () => {
        await User.deleteOne({ _id : demoObject._id });
        await UserDay.deleteOne({ _id : demoObject2._id });
        await UserDayMeal.deleteOne({ _id : demoObject3._id });
        await MealItem.deleteOne({ _id : demoObject4._id });
        await Recipe.deleteOne({ _id : demoObject5._id });
        await RecipeQuantity.deleteOne({ _id : demoObject6._id });
        await mongoose.disconnect();
    });
});