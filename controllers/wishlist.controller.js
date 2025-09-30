const wishlist = require("../models/wishlist")


async function getRecord(req, res) {
    try {
        const data = await wishlist.find().sort({ _id: -1 }).populate([
            {
                path: 'user',
                select: 'name username email'
            },
            {
                path: 'product',
                select: 'name subcategory brand color size finalPrice stockQuantity pic',
                populate: [
                    {
                        path: 'subcategory',
                        select: 'name'
                    },
                    {
                        path: 'brand',
                        select: 'name'
                    },
                ],
                options: {
                    slice: {
                        pic: 1
                    }
                }
            }
        ])

        res.status(200).send({ result: 'Done', count: data.length, data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}


async function createRecord(req, res) {
    try {
        var data = new wishlist(req.body)
        await data.save()

        let finalData = await wishlist.findOne({ _id: data._id }).populate([
            {
                path: 'user',
                select: 'name username email'
            },
            {
                path: 'product',
                select: 'name subcategory brand color size finalPrice stockQuantity pic',
                populate: [
                    {
                        path: 'brand',
                        select: 'name'
                    }
                ],
                options: {
                    slice: {
                        pic: 1
                    }
                }
            }
        ])

        res.status(200).send({ result: 'Done', data: finalData, message: 'Wishlist Created Successfully!' })
    } catch (error) {
        console.log("Error in createRecord:", error)
        let errorMessage = {}
        error.errors?.user ? errorMessage.user = error.errors.user.message : null
        error.errors?.product ? errorMessage.product = error.errors.product.message : null

        Object.keys(errorMessage).length === 0 ?
            res.status(500).send({ result: "Fail", reason: "Internal server error" }) :
            res.send({ result: "Fail", reason: "Missing Fields", error: errorMessage })
    }
}


async function deleteRecord(req, res) {
    try {
        const data = await wishlist.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.status(200).send({ result: "Done", message: "Product Remove Successfully!" })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record not found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal server error" })
        console.log(error)
    }
}


module.exports = {
    createRecord,
    getRecord,
    deleteRecord
}