const mongoose = require('mongoose');
const URL = 'mongodb+srv://Ondemand:Abhi%40123@cluster0.tkwu2.mongodb.net/Ondemand?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected successfully");

        const fetch_data = mongoose.connection.db.collection("Ondemand");
        const data = await fetch_data.find({}).toArray();
        global.food_items = data;
        const foodCat = mongoose.connection.db.collection("Ondemand2");
        const catData=await foodCat.find({}).toArray();
        global.foodCategory=catData;

        // console.log(global.food_items)
    } catch (err) {
        console.error("Connection error:", err);
    }
}

module.exports = mongoDB;
