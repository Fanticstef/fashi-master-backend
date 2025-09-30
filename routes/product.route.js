const { createRecord, getRecord, updateRecord, deleteRecord, removeSingleImage } = require("../controllers/product.controller")
const { productUploader } = require("../middleware/fileUploader")

const productRoute = require("express").Router()


productRoute.get("", getRecord)
productRoute.post("", productUploader.array('pic'), createRecord)
productRoute.put("/:_id", productUploader.array('pic'), updateRecord)
productRoute.delete("/:_id", deleteRecord)
productRoute.delete("/:_productId/image/:_imageIndex", removeSingleImage)


module.exports = productRoute