const mongoose = require('mongoose');
const Food = require('../../models/food');
const FoodItem = require('../../models/foodItem');
const Recipe = require('../../models/recipe');
const RecipeItem = require('../../models/recipeItem');

describe('Community Award Item Model Test', () => {
    let demoObject;
    let demoObject2;
    let demoObject3;
    let demoObject4;

    beforeAll(async () => {
        try {
            collection = 'test';
            const url = `mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/${collection}?retryWrites=true&w=majority`;
            await mongoose.connect(url);
            console.log('Connected to the database');

            const demoData = {
                name: 'Demo Recipe',
                description: 'This is a demo recipe.',
            };
            const validObject = new Recipe(demoData);
            demoObject = await validObject.save();

            const demoData2 = {
                name: 'Demo Food',
                group: 'Demo Group',
                calories: 100,
                privacy: 'public'
            };
            const validObject2 = new Food(demoData2);
            demoObject2 = await validObject2.save();

            const demoData3 = {
                foodID: demoObject2._id,
                weight: 100
            };
            const validObject3 = new FoodItem(demoData3);
            demoObject3 = await validObject3.save();

            const demoData4 = {
                foodItemID: demoObject3._id, // Replace with a valid food item ID
                recipeID: demoObject._id, // Replace with a valid recipe ID
            };
            const validObject4 = new RecipeItem(demoData4);
            demoObject4 = await validObject4.save();

        } catch (err) {
            console.error('Error connecting to the database.', err);
            process.exit(1);
        }
    });

    it('create & save recipe item successfully', () => {
        expect(demoObject4.foodItemID).toEqual(demoObject3._id);
        expect(demoObject4.recipeID).toEqual(demoObject._id);
    });

    afterAll(async () => {
        await Recipe.deleteOne({ _id : demoObject._id });
        await Food.deleteOne({ _id : demoObject2._id });
        await FoodItem.deleteOne({ _id : demoObject3._id });
        await RecipeItem.deleteOne({ _id : demoObject4._id });
        await mongoose.disconnect();
    });
});