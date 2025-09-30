const { createRecord, getRecord, updateRecord, deleteRecord } = require("../controllers/brand.controller")
const { brandUploader } = require("../middleware/fileUploader")

const brandRoute = require("express").Router()


brandRoute.post("", brandUploader.single('pic'), createRecord)
brandRoute.get("", getRecord)
brandRoute.put("/:_id", brandUploader.single('pic'), updateRecord)
brandRoute.delete("/:_id", deleteRecord)


module.exports = brandRoute