const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is require'],
    },
    maincategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'maincategory',
        required: [true, 'Maincategory id is require']
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
        required: [true, 'Subcategory id is require']
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
        required: [true, 'Brand id is require']
    },
    color: {
        type: String,
        required: [true, 'Color is require'],
    },
    size: {
        type: String,
        required: [true, 'Size is require'],
    },
    basePrice: {
        type: Number,
        required: [true, 'Base Price is require'],
    },
    discount: {
        type: Number,
        required: [true, 'Discount is require'],
    },
    finalPrice: {
        type: Number,
        required: [true, 'Final Price is require'],
    },
    stockQuantity: {
        type: Number,
        required: [true, 'Stock Quantity is require'],
    },
    stock: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        default: ""
    },
    pic: [],
    active: {
        type: Boolean,
        default: true
    }
})

const product = new mongoose.model("product", productSchema)

module.exports = product