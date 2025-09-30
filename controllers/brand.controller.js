const brand = require("../models/brand")
const fs = require("fs")


async function createRecord(req, res) {
    try {
        var data = new brand(req.body)
        if (req.file) {
            data.pic = req.file.path
        }
        await data.save()
        res.status(200).send({ result: 'Done', data, message: 'Brand Created Successfully!' })
    } catch (error) {
        console.log("Error in createRecord:", error)
        let errorMessage = {}
        error.keyValue ? errorMessage.name = "brand name is already exist" : null
        error.errors?.name ? errorMessage.name = error.errors.name.message : null
        error.errors?.pic ? errorMessage.pic = error.errors.pic.message : null

        if (req.file && data.pic) {
            try {
                fs.unlinkSync(data.pic)
            } catch (error) { }
        }

        Object.keys(errorMessage).length === 0 ?
            res.status(500).send({ result: "Fail", reason: "Internal server error" }) :
            res.send({ result: "Fail", reason: "Missing Fields", error: errorMessage })
    }
}


async function getRecord(req, res) {
    try {
        const data = await brand.find().sort({ _id: -1 })
        res.status(200).send({ result: 'Done', count: data.length, data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}


async function updateRecord(req, res) {
    try {
        var data = await brand.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? req.body.name
            data.active = req.body.active ?? req.body.active
            if (req.file) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
                data.pic = req.file.path
            }
            await data.save()
            res.status(200).send({ result: "Done", data, message: 'Brand Update Successfully!' })
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
        const data = await brand.findOne({ _id: req.params._id })
        if (data) {
            if (data.pic) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
            }
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