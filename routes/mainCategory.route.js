const { getRecord, createRecord, updateRecord, deleteRecord } = require("../controllers/mainCategory.controller")
const { mainCategoryUploader } = require("../middleware/fileUploader")

const mainCategoryRoute = require("express").Router()


mainCategoryRoute.post("", mainCategoryUploader.single('pic'), createRecord)
mainCategoryRoute.get("", getRecord)
mainCategoryRoute.put("/:_id", mainCategoryUploader.single("pic"), updateRecord)
mainCategoryRoute.delete("/:_id", deleteRecord)


module.exports = mainCategoryRoute