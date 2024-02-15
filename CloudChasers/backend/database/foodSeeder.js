const {MongoClient} = require("mongodb")
const foodTable = require("./nutrients.json") // won't work becacuse file is not on git (too large)
const Food = require("../models/food")
const mongoose = require('mongoose');

collection = "test" //Change this to be the name of the collection you want to seed with the food data
const url = "mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/" + collection + "?retryWrites=true&w=majority"
connect()

dbSize = 0;

async function connect() {
    await mongoose.connect(url).then(() => {console.log("Connected to the database")}).catch((err) => {console.error(`Error connecting to the database. n${err}`)})
    try {
        for (entry of foodTable) {
            const food = new Food({
            "name" : entry["name"]["long"],
            "group" : entry["group"],
            "calories" : getValue(entry, "Energy"),
            "protein" : getValue(entry, "Protein"),
            "carbs" : getValue(entry, "Carbohydrate, by difference"),
            "fat" : getValue(entry, "Total lipid (fat)"),
            "sugar" : getValue(entry, "Sugars, total"),
            "sodium" : getValue(entry, "Sodium, Na") / 1000,
            "fibre" : getValue(entry, "Fiber, total dietary"),
            "water" : getValue(entry, "Water"),
            "privacy" : "public",
            "addedBy" : null
            })

            await food.save()
            dbSize++
        }


    }
    catch (err) {
        console.error(err)
    }
    finally {
        if (dbSize == foodTable.length) {
            console.log("All foods added succesfully")
        }
        await mongoose.disconnect();

    }
}

function getValue(entry, nutrient) {
    const foundNutrient = entry.nutrients.find(n => n.name === nutrient)
    return foundNutrient ? foundNutrient.value : null
}






