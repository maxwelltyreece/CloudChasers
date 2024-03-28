/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
const Community_Posts = require('../models/communityPost');

const userDayMeal = require('../models/userDayMeal');

const url = 'mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/seeded?retryWrites=true&w=majority';

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
	await Community_Posts.collection.drop();
    

	// User Seeding
	for (let i = 0; i < 50; i++) {
		var newUser = new User({
			forename: "User" + i,
			surname : "Test",
			username : "User" + i + "SEED",
			email : "User" + i+ "@test.com",
			password: await bcrypt.hash("password123", 10),
			dateOfBirth : new Date(1990, 1, 1),
			lastLogin : new Date(), //Date() returns the current date and time
			streak : 0
		});
		await newUser.save();
	}
	console.log("Users Seeded");

	// User_Days Seeding
	for (let i = 0; i < 10; i++) {
		var newUserDay = new User_Days({
			date: new Date(2021, 1, 1 + i),
			userID: await newUser._id,
		});
		await newUserDay.save();
	}
	console.log('User_Days Seeded');

	// User_Day_Meals Seeding
	const newUserDayMeal = new User_Day_Meals({
		name: 'Breakfast',
		userDayID: await newUserDay._id,
		order: 1,
	});
	await newUserDayMeal.save();
	console.log('User_Day_Meals Seeded');

	// Goal Seeding
	const Macrolist = ['calories', 'water', 'protein', 'carbs', 'fat', 'sugar', 'sodium', 'fibre'];
	for (let i = 0; i < 10; i++) {
		if (i % 2 == 0) {
			var newGoal = new Goals({
				name: `Goal${i}`,
				description: `This a ${Macrolist[i]} goal`,
				measurement: Macrolist[i],
				minTargetMass: 100,
				maxTargetMass: null,
				userID: await newUser._id,
			});
		} else {
			var newGoal = new Goals({
				name: `Goal${i}`,
				measurement: Macrolist[i],
				minTargetMass: null,
				maxTargetMass: 200,
				userID: await newUser._id,
			});
		}
		await newGoal.save();
	}
	console.log('Goals Seeded');

	// Goal_Items Seeding
	for (let i = 0; i < 10; i++) {
		const newGoalItem = new Goal_Items({
			goalID: await newGoal._id,
			userDayID: await newUserDay._id,
		});
		await newGoalItem.save();
	}
	console.log('Goal_Items Seeded');

	// Personal_Awards Seeding
	var makeAPostAward = new Personal_Awards({
		name: `Make a Post`,
		description: `Get this award by making a post`,
	});
	await makeAPostAward.save();
	var make5PostAwards = new Personal_Awards({
		name: `Make 5 Posts`,
		description: `Get this award by making 5 posts`,
	});
	await make5PostAwards.save();
	var make10PostAwards = new Personal_Awards({
		name: `Make 10 Posts`,
		description: `Get this award by making 10 posts`,
	});
	await make10PostAwards.save();
	var joinCommunityAward = new Personal_Awards({
		name: `Join Community`,
		description: `Get this award by joining a community`,
	});
	await joinCommunityAward.save();
	var streak5Award = new Personal_Awards({
		name: `5 Day Streak`,
		description: `Get this award by having a 5 day streak`,
	});
	await streak5Award.save();
	var streak10Award = new Personal_Awards({
		name: `10 Day Streak`,
		description: `Get this award by having a 10 day streak`,
	});
	await streak10Award.save();
	var streak25Award = new Personal_Awards({
		name: `25 Day Streak`,
		description: `Get this award by having a 25 day streak`,
	});
	await streak25Award.save();
	console.log('Personal_Awards Seeded');

	// Communites Seeding
	for (let i = 0; i < 20; i++) {
		var newCommunity = new Communties({
			name: `Community${i}`,
			description: `Community ${i}`,
			joinPrivacy: 'public',
			recipePrivacy: 'public',
		});
		await newCommunity.save();
	}
	console.log('Communities Seeded');

	// Community_Users Seeding
	const newCommunityUser = new Community_Users({
		communityID: await newCommunity._id,
		userID: await newUser._id,
		role: 'member',
	});
	await newCommunityUser.save();
console.log('Community_Users Seeded');

	// Community_Posts Seeding
	for (let i = 0; i < 10; i++) {
		const newCommunityPost = new Community_Posts({
			communityID: await newCommunity._id,
			userID: await newUser._id,
			recipeID: null,
			title: `Post ${i}`,
			text: `This a post, specifically post number ${i}`,
		});
		await newCommunityPost.save();
	}
	console.log('Community_Posts Seeded');

	const sampleFood = await Foods.findOne({ name: 'Butter, salted' });
	const sampleFoodID = await sampleFood._id;
	// Food_Items Seeding
	for (let i = 0; i < 10; i++) {
		var newFoodItem = new Food_Items({
			foodID: sampleFoodID,
			weight: 200,
		});
		await newFoodItem.save();
	}
	console.log('Food_Items Seeded');

	// Recipes Seeding
	for (let i = 0; i < 10; i++) {
		var newRecipe = new Recipes({
			name: `Recipe${i}`,
			description: `This contains how to make Recipe ${i}`,
			createdBy: await newUser._id,
			communityThatOwnsRecipe: await newCommunity._id,
		});
		await newRecipe.save();
	}
	console.log('Recipes Seeded');

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

	console.log('All collections seeded');

	await mongoose.disconnect();
}

seed();
