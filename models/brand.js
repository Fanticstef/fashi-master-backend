const mongoose = require("mongoose")

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'brand name is required'],
        unique: true
    },
    pic: {
        type: String,
        required: [true, 'pic is required'],
    },
    active: {
        type: Boolean,
        default: true
    }
})

const brand = new mongoose.model("brand", brandSchema)

module.exports = brand
