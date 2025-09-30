const brandRoute = require("./brand.route")
const cartRoute = require("./cart.route")
const mainCategoryRoute = require("./mainCategory.route")
const productRoute = require("./product.route")
const subCategoryRoute = require("./subCategory.route")
const userRoute = require("./user.route")
const wishlistRoute = require("./wishlist.route")
const checkoutRoute = require("./checkout.route")
const newsLetterRoute = require("./newsLetter.route")


const mainRoute = require("express").Router()

mainRoute.use("/maincategory", mainCategoryRoute)
mainRoute.use("/brand", brandRoute)
mainRoute.use("/subcategory", subCategoryRoute)
mainRoute.use("/product", productRoute)

mainRoute.use("/user", userRoute)
mainRoute.use("/cart", cartRoute)
mainRoute.use("/wishlist", wishlistRoute)
mainRoute.use("/checkout", checkoutRoute)

mainRoute.use("/news-letter", newsLetterRoute)


module.exports = mainRoute
