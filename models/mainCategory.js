const mongoose = require("mongoose")

const mainCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'maincategory name is required'],
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

const mainCategory = new mongoose.model("maincategory", mainCategorySchema)

module.exports = mainCategory