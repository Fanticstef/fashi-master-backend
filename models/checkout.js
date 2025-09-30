const mongoose = require("mongoose")

const checkoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, 'user name is required'],
    },
    orderStatus: {
        type: String,
        default: "order is placed",
    },
    paymentStatus: {
        type: String,
        default: "pending",
    },
    paymentMode: {
        type: String,
        default: "COD",
    },
    subTotal: {
        type: Number,
        required: [true, 'subTotal is required'],
    },
    shipping: {
        type: Number,
        required: [true, 'shipping is required'],
    },
    total: {
        type: Number,
        required: [true, 'total is required'],
    },
    date: {
        type: String,
        default: ''
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: [true, "product is required"]
            },
            qty: {
                type: Number,
                required: [true, "qunatity is required"]
            },
            total: {
                type: Number,
                required: [true, "total product amount is required"]
            },
        }
    ],
})

const checkout = new mongoose.model("checkout", checkoutSchema)

module.exports = checkout

