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
    await Personal_Award_Items.collection.drop();
    await Personal_Awards.collection.drop();
    await Community_Award_Items.collection.drop();
    await Community_Awards.collection.drop();
    await Communties.collection.drop();
    await Community_Users.collection.drop();
    

    // User Seeding
    for (let i = 0; i < 10; i++) {
        var newUser = new User({
            forename: "User" + i,
            surname : "Test",
            height  : 180,
            username : "User" + i + "SEED",
            email : "User" + i+ "@test.com",
            password: await bcrypt.hash("password123", 10),
            dateOfBirth : new Date(1990, 1, 1),
            lastLogin : new Date(), //Date() returns the current date and time
            profilePictureLink : null
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


    await mongoose.disconnect();


}

seed();
