const checkout = require("../models/checkout")
const fs = require("fs")


async function createRecord(req, res) {
    try {
        var data = new checkout(req.body)
        data.date = new Date()
        await data.save()

        let finalData = await checkout.findOne({ _id: data._id }).populate([
            {
                path: 'user',
                select: 'name username email phone state city pin address'
            },
            {
                path: 'products.product',
                select: 'name subcategory brand color size finalPrice stockQuantity pic'
            }
        ])

        res.status(200).send({ result: 'Done', data: finalData, message: 'Order Successfully!' })
    } catch (error) {
        console.log("Error in createRecord:", error)
        let errorMessage = {}
        error.errors?.user ? errorMessage.user = error.errors.user.message : null
        error.errors?.subTotal ? errorMessage.subTotal = error.errors.subTotal.message : null
        error.errors?.shipping ? errorMessage.shipping = error.errors.shipping.message : null
        error.errors?.total ? errorMessage.total = error.errors.total.message : null

        Object.keys(errorMessage).length === 0 ?
            res.status(500).send({ result: "Fail", reason: "Internal server error" }) :
            res.send({ result: "Fail", reason: "Missing Fields", error: errorMessage })
    }
}


async function getRecord(req, res) {
    try {
        const data = await checkout.find().sort({ _id: -1 }).populate([
            {
                path: 'user',
                select: 'name username email phone state city pin address'
            },
            {
                path: 'products.product',
                select: 'name subcategory brand color size finalPrice stockQuantity pic'
            }
        ])

        res.status(200).send({ result: 'Done', count: data.length, data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}


async function updateRecord(req, res) {
    try {
        var data = await checkout.findOne({ _id: req.params._id })
        if (data) {
            data.orderStatus = req.body.orderStatus ?? req.body.orderStatus
            data.paymentStatus = req.body.paymentStatus ?? req.body.paymentStatus
            data.paymentMode = req.body.paymentMode ?? req.body.paymentMode
            await data.save()

            let finalData = await checkout.findOne({ _id: data._id }).populate([
                {
                    path: 'user',
                    select: 'name username email phone state city pin address'
                },
                {
                    path: 'products.product',
                    select: 'name subcategory brand color size finalPrice stockQuantity pic'
                }
            ])

            res.status(200).send({ result: "Done", data: finalData, message: 'Order Update Successfully!' })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record not found" })
    } catch (error) {
        let errorMessage = {}
        error.keyValue ? errorMessage.name = "Brand Name is Already Exist" : null

        if (error.keyValue) {
            try {
                fs.unlinkSync(req.file.path)
            } catch (error) { }
        }

        Object.keys(errorMessage).length === 0 ?
            res.status(500).send({ result: "Fail", reason: "Internal server error" }) :
            res.send({ result: "Fail", reason: "Missing Fields", error: errorMessage })
    }
}


async function deleteRecord(req, res) {
    try {
        const data = await checkout.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.status(200).send({ result: "Done", message: "Record is Deleted" })
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
    updateRecord,
    deleteRecord
}