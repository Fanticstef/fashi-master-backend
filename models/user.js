const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Full name is required']
    },
    username: {
        type: String,
        required: [true, 'User Name is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    phone: {
        type: Number,
    },
    pin: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        default: "buyer"
    },
    pic: {
        type: String,
    },
})

const user = new mongoose.model("user", userSchema)

module.exports = user
