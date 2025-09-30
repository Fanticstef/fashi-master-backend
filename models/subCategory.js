const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'subcategory name is required'],
        unique: true
    },
    pic: {
        type: String,
        required: [true, 'pic is required']
    },
    active: {
        type: Boolean,
        default: true
    }
})

const subCategory = new mongoose.model("subcategory", subCategorySchema)

module.exports = subCategory