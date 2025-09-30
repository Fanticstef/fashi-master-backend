const { createRecord, getRecord, updateRecord, deleteRecord } = require("../controllers/newsLetter.controller")

const newsLetterRoute = require("express").Router()


newsLetterRoute.post("", createRecord)
newsLetterRoute.get("", getRecord)
newsLetterRoute.put("/:_id", updateRecord)
newsLetterRoute.delete("/:_id", deleteRecord)


module.exports = newsLetterRoute