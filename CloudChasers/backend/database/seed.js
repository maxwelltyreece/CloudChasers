const mongoose = require('mongoose');
const User = require('../models/user');
const User_Days = require('../models/userDay');
const User_Day_Meals = require('../models/userDayMeal');
const Meal_Items = require('../models/mealItem');
const Foods = require('../models/food');
const Food_Items = require('../models/foodItem');
const Recipe_Items = require('../models/recipeItem');
const Recipes = require('../models/recipe');
const Goal_Items = require('../models/goalItem');
const Goals = require('../models/goal');
const Personal_Award_Items = require('../models/personalAwardItem');
const Personal_Awards = require('../models/personalAward');
const Community_Award_Items = require('../models/communityAwardItem');
const Community_Awards = require('../models/communityAward');
const Communties = require('../models/community');
const Community_Users = require('../models/communityUser');
const Recipe_Quantities = require('../models/recipeQuantity');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDayMeal = require('../models/userDayMeal');



const url = `mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/seeded?retryWrites=true&w=majority`;

async function seed() {


    await mongoose.connect(url)
        .then( () => {console.log('Connected to the database ')})
        .catch( (err) => {console.error(`Error connecting to the database. n${err}`);
    })
    
    //Unseeding drops all the collections in the database except the food database
    await User.collection.drop();
    await User_Days.collection.drop();
    await User_Day_Meals.collection.drop();
    await Meal_Items.collection.drop();
    await Food_Items.collection.drop();
    await Recipe_Items.collection.drop();
    await Recipes.collection.drop();
    await Goals.collection.drop();
    await Goal_Items.collection.drop();
    await Personal_Award_Items.collection.drop();
    await Personal_Awards.collection.drop();
    await Community_Award_Items.collection.drop();
    await Community_Awards.collection.drop();
    await Communties.collection.drop();
    await Community_Users.collection.drop();
    await Recipe_Quantities.collection.drop();
    

    // User Seeding
    for (let i = 0; i < 10; i++) {
        var newUser = new User({
            forename: "User" + i,
            surname : "Test",
            username : "User" + i + "SEED",
            email : "User" + i+ "@test.com",
            password: await bcrypt.hash("password123", 10),
            dateOfBirth : new Date(1990, 1, 1),
            lastLogin : new Date(), //Date() returns the current date and time
            profilePictureLink : null,
            streak : 0
        });
        await newUser.save();
    }
    console.log("Users Seeded");

    // User_Days Seeding
    for (let i = 0; i < 10; i++) {
        var newUserDay = new User_Days({
            date: new Date(2021, 1, 1 + i),
            userID: await newUser._id
        });
        await newUserDay.save();
    }
    console.log("User_Days Seeded");

    // User_Day_Meals Seeding
    var newUserDayMeal = new User_Day_Meals({
        name: "Breakfast",
        userDayID: await newUserDay._id
    });
    await newUserDayMeal.save();
    console.log("User_Day_Meals Seeded");

    // Goal Seeding
    var Macrolist = ["Calories", "Protein", "Carbs", "Fat", "Sugar", "Salt", "Fibre"];
    for (let i = 0; i < 10; i++) {
        if (i % 2 == 0) {
            var newGoal = new Goals({
                name: "Goal" + i,
                description: "This a " + Macrolist[i] + " goal",
                measurement: Macrolist[i],
                minTargetMass: 100,
                maxTargetMass: null,
                userID: await newUser._id
        })} else {
            var newGoal = new Goals({
                name: "Goal" + i,
                description: "This a " + Macrolist[i] + " goal",
                measurement: Macrolist[i],
                minTargetMass: null,
                maxTargetMass: 200,
                userID: await newUser._id
            })
        }
        await newGoal.save();
    }
    console.log("Goals Seeded");

    //Goal_Items Seeding
    for (let i = 0; i < 10; i++) {
        var newGoalItem = new Goal_Items({
            goalID: await newGoal._id,
            userDayID: await newUserDay._id,
        });
        await newGoalItem.save();
    }
    console.log("Goal_Items Seeded");

    //Personal_Awards Seeding
    for (let i = 0; i < 10; i++) {
        var newPersonalAward = new Personal_Awards({
            name: "Award" + i,
            description: "personal award " + i,
        });
        await newPersonalAward.save();
    }
    console.log("Personal_Awards Seeded");

    //Personal_Award_Items Seeding
    for (let i = 0; i < 10; i++) {
        var newPersonalAwardItem = new Personal_Award_Items({
            personalAwardID: await newPersonalAward._id,
            userID: await newUser._id,
            date : new Date(2021, 1, 1 + i)
        });
        await newPersonalAwardItem.save();
    }
    console.log("Personal_Award_Items Seeded");

    //Communites Seeding
    for (let i = 0; i < 10; i++) {
        var newCommunity = new Communties({
            name: "Community" + i,
            description: "Community " + i,
            joinPrivacy: "public",
            recipePrivacy: "public",
        });
        await newCommunity.save();
    }
    console.log("Communities Seeded");

    //Community_Awards Seeding
    for (let i = 0; i < 10; i++) {
        var newCommunityAward = new Community_Awards({
            name: "Award" + i,
            description: "Community award " + i,
        });
        await newCommunityAward.save();
    }
    console.log("Community_Awards Seeded");

    var user1 = await User.findOne({username: "User0SEED"})
    user1 = await user1._id;

    //Community_Award_Items Seeding
    for (let i = 0; i < 10; i++) {
        var newCommunityAwardItem = new Community_Award_Items({
            communityAwardID: await newCommunityAward._id,
            communityID: await newCommunity._id,
            userID: await newUser._id,
            date : new Date(2021, 1, 1 + i)
        });
        await newCommunityAwardItem.save();
    }
    console.log("Community_Award_Items Seeded");

    //Community_Users Seeding
    for (let i = 0; i < 10; i++) {
        var newCommunityUser = new Community_Users({
            communityID: await newCommunity._id,
            userID: await newUser._id,
            role: "member",
        });
        await newCommunityUser.save();
    }
    console.log("Community_Users Seeded");

    var sampleFood = await Foods.findOne({name: "Butter, salted"});
    var sampleFoodID = await sampleFood._id;
    //Food_Items Seeding
    for (let i = 0; i < 10; i++) {
        var newFoodItem = new Food_Items({
            foodID: sampleFoodID,
            weight: 200,
        });
        await newFoodItem.save();
    }
    console.log("Food_Items Seeded");

    //Recipes Seeding
    for (let i = 0; i < 10; i++) {
        var newRecipe = new Recipes({
            name: "Recipe" + i,
            description: "Recipe " + i,
            createdBy: await newUser._id,
            communityThatOwnsRecipe : await newCommunity._id,
        });
        await newRecipe.save();
    }
    console.log("Recipes Seeded");

    //Recipe_Items Seeding
    for (let i = 0; i < 10; i++) {
        var newRecipeItem = new Recipe_Items({
            recipeID: await newRecipe._id,
            foodItemID: await newFoodItem._id,
        });
        await newRecipeItem.save();
    }
    console.log("Recipe_Items Seeded");

    //Recipe_Quantities Seeding
    for (let i = 0; i < 10; i++) {
        var newRecipeQuantity = new Recipe_Quantities({
            mealItemID: await newUserDayMeal._id,
            recipeID: await newRecipe._id,
            totalRecipeWeight: 300,
        });
        await newRecipeQuantity.save();
    }
    console.log("Recipe_Quantities Seeded");

    //Meal_Items Seeding
    for (let i = 0; i < 10; i++) {
        var newMealItem = new Meal_Items({
            name: "Meal" + i,
            userDayMealID: await newUserDayMeal._id,
            foodItemID: await newFoodItem._id,
            recipeQuantityID: null,
        });
        await newMealItem.save();
    }
    console.log("Meal_Items Seeded\n");

    console.log("All collections seeded");

    await mongoose.disconnect();

}

seed();
