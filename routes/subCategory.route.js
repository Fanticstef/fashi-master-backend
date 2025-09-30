const { createRecord, getRecord, deleteRecord, updateRecord } = require("../controllers/subCategory.controller")
const { subCategoryUploader } = require("../middleware/fileUploader")

const subCategoryRoute = require("express").Router()

subCategoryRoute.post("", subCategoryUploader.single("pic"), createRecord)
subCategoryRoute.get("", getRecord)
subCategoryRoute.put("/:_id", subCategoryUploader.single("pic"), updateRecord)
subCategoryRoute.delete("/:_id", deleteRecord)

module.exports = subCategoryRoute