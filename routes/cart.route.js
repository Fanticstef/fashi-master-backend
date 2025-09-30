const { createRecord, getRecord, updateRecord, deleteRecord } = require("../controllers/cart.controller")

const cartRoute = require("express").Router()


cartRoute.post("", createRecord)
cartRoute.get("", getRecord)
cartRoute.put("/:_id", updateRecord)
cartRoute.delete("/:_id", deleteRecord)


module.exports = cartRoute