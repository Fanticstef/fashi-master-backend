const mongoose = require("mongoose")

const newsLetterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    }
})

const newsLetter = new mongoose.model("newsletter", newsLetterSchema)

module.exports = newsLetter
