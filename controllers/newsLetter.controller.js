const newsLetter = require("../models/newsLetter")
const fs = require("fs")


async function createRecord(req, res) {
    try {
        var data = new newsLetter(req.body)
        await data.save()
        res.status(200).send({ result: 'Done', data, message: 'Email received successfully!' })
    } catch (error) {
        console.log("Error in createRecord:", error)
        let errorMessage = {}
        error.keyValue ? errorMessage.email = "Email address is already exist" : null
        error.errors?.email ? errorMessage.email = error.errors.email.message : null

        Object.keys(errorMessage).length === 0 ?
            res.status(500).send({ result: "Fail", reason: "Internal server error" }) :
            res.send({ result: "Fail", reason: "Missing Fields", error: errorMessage })
    }
}


async function getRecord(req, res) {
    try {
        const data = await newsLetter.find().sort({ _id: -1 })
        res.status(200).send({ result: 'Done', count: data.length, data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}


async function updateRecord(req, res) {
    try {
        var data = await newsLetter.findOne({ _id: req.params._id })
        if (data) {
            data.active = req.body.active ?? req.body.active
            await data.save()
            res.status(200).send({ result: "Done", data })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record not found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal server error" })
    }
}


async function deleteRecord(req, res) {
    try {
        const data = await newsLetter.findOne({ _id: req.params._id })
        if (data) {
            await data.deleteOne()
            res.status(200).send({ result: "Done", message: "Record is Deleted" })
        }
        else
            res.status(404).send({ result: "Fail", reason: "Record not found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal server error" })
    }
}


module.exports = {
    createRecord,
    getRecord,
    updateRecord,
    deleteRecord
}