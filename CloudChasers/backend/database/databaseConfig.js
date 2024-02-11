const {MongoClient} = require("mongodb")
const foodTable = require("./nutrients.json") // won't work becacuse file is not on git (too large)

const connectionString = "mongodb+srv://cloudChasers:mUq0OT5xkbeqjXDA@goblcluster.ijglc9m.mongodb.net/?retryWrites=true&w=majority"
connect()

dbSize = 0;

async function connect() {
    const client = new MongoClient(connectionString)
    try {
        await client.connect()
        const db = client.db("test")
        console.log("connected...")
        const foods = db.collection("foods")

        for (entry of foodTable) {
            const food = {
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
            "privacy" : "public"
            }

            await foods.insertOne(food)
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
        client.close()

    }
}

function getValue(entry, nutrient) {
    const foundNutrient = entry.nutrients.find(n => n.name === nutrient)
    return foundNutrient ? foundNutrient.value : null
}







