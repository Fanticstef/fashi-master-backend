const { createRecord, getRecord, deleteRecord } = require("../controllers/wishlist.controller")

const wishlistRoute = require("express").Router()


wishlistRoute.post("", createRecord)
wishlistRoute.get("", getRecord)
wishlistRoute.delete("/:_id", deleteRecord)


module.exports = wishlistRoute