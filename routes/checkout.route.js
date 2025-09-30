const { createRecord, getRecord, updateRecord, deleteRecord } = require("../controllers/checkout.controller")

const checkoutRoute = require("express").Router()


checkoutRoute.post("", createRecord)
checkoutRoute.get("", getRecord)
checkoutRoute.put("/:_id", updateRecord)
checkoutRoute.delete("/:_id", deleteRecord)


module.exports = checkoutRoute