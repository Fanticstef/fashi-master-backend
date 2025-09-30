require("dotenv").config();
const mongoose = require("mongoose")

async function getConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is connected")
    } catch (error) {
        console.log(error)
    }
}

getConnect()