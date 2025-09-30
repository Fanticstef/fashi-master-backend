const user = require("../models/user")
const fs = require("fs")


async function getRecord(req, res) {
    try {
        const data = await user.find().sort({ _id: -1 })
        res.status(200).send({ result: "Done", count: data.length, data: data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal server error" })
    }
}


async function createRecord(req, res) {
    try {
        var data = new user(req.body)
        if (req.file) {
            data.pic = req.file.path
        }
        await data.save()
        res.status(200).send({ result: 'Done', data, message: 'User Created Successfully!' })
    } catch (error) {
        let errorMessage = {}
        error.keyValue ? errorMessage.username = 'user name is already exist' : null
        error.keyValue ? errorMessage.email = 'email is already exist' : null
        error.errors.name ? errorMessage.name = error.errors.name.message : null
        error.errors.username ? errorMessage.username = error.errors.username.message : null
        error.errors.email ? errorMessage.email = error.errors.email.message : null

        try {
            fs.unlinkSync(data.pic)
        } catch (error) { }

        Object.keys(errorMessage).length === 0 ?
            res.status(500).send({ result: "Fail", reason: "Internal server error" }) :
            res.send({ result: "Fail", reason: "Missing Fields", error: errorMessage })
    }
}

async function deleteRecord(req, res) {
    try {
        const data = await user.findOne({ _id: req.params._id })
        if (data) {
            if (req.file) {
                fs.unlinkSync(data.pic)
            }
            await data.deleteOne()
            res.status(200).send({ result: 'Done', message: 'Record is Deleted' })
        } else
            res.send({ result: 'Fail', reason: 'Record not found' })
    } catch (error) {
        res.status(500).send({ result: 'Fail', reason: "Internal server error" })
    }
}


async function updateRecord(req, res) {
    try {
        var data = await user.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.phone = req.body.phone ?? data.phone
            data.address = req.body.address ?? data.address
            data.pin = req.body.pin ?? data.pin
            data.city = req.body.city ?? data.city
            data.state = req.body.state ?? data.state
            if (req.file) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
                data.pic = req.file.path
            }
            await data.save()
            res.send({ result: "Done", data, message: 'User Update Successfully!' })
        }
        else
            res.send({ result: "Fail", reason: "Record Not Found" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}


async function login(req, res) {
    try {
        let data = await user.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.username },
            ]
        })

        if (data) {
            if (data.password === req.body.password) {
                res.status(200).send({ result: 'Done', data, message: 'User Login Successfully!' })
            } else
                res.send({ result: "Fail", reason: "Invalid Username or Password" })
        } else
            res.status(500).send({ result: "Fail", reason: "Internal server error" })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: error })
    }
}


module.exports = {
    getRecord,
    createRecord,
    deleteRecord,
    updateRecord,
    login,
}