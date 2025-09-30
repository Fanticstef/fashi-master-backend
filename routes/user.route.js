const { getRecord, createRecord, login, deleteRecord, updateRecord } = require("../controllers/user.controller")
const { userUploader } = require("../middleware/fileUploader")

const userRoute = require("express").Router()

userRoute.get("", getRecord)
userRoute.post("", userUploader.single('pic'), createRecord)
userRoute.delete("/:_id", deleteRecord)
userRoute.put("/:_id", userUploader.single('pic'), updateRecord)

userRoute.post("/login", login)

module.exports = userRoute