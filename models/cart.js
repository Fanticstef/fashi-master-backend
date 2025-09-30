const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, 'user is required'],
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: [true, 'product is required'],
    },
    qty: {
        type: Number,
        required: [true, 'quantity is required']
    },
    total: {
        type: Number,
        required: [true, 'cart total is required']
    },
})

const cart = new mongoose.model("cart", cartSchema)

module.exports = cart
