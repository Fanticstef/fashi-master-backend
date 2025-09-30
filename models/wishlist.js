const mongoose = require("mongoose")

const wishlistSchema = new mongoose.Schema({
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
})

const wishlist = new mongoose.model("wishlist", wishlistSchema)

module.exports = wishlist
