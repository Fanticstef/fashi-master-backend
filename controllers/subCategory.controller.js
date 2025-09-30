const subCategory = require("../models/subCategory")
const fs = require("fs")


async function createRecord(req, res) {
    try {
        var data = new subCategory(req.body)
        if (req.file) {
            data.pic = req.file.path
        } else {
            console.log("No file uploaded")
        }
        await data.save()
        res.status(200).send({ result: 'Done', data, message: 'Subcategory Created Successfully!' })
    } catch (error) {
        console.log("Error in Subcategory: ", error)
        let errorMessage = {}
        error.keyValue ? errorMessage.name = "subcategory name is already exist" : null
        error.errors?.name ? errorMessage.name = error.errors.message.name : null
        error.errors?.pic ? errorMessage.pic = error.errors.message.pic : null

        // Only try to delete file if it was uploaded and there's an error
        if (req.file && data.pic) {
            try {
                fs.unlinkSync(data.pic)
            } catch (error) { }
        }

        Object.keys(errorMessage) === 0 ?
            res.status(500).send({ result: 'Fail', reason: 'Internal server error' }) :
            res.send({ result: 'Fail', reason: 'Missing Fields', error: errorMessage })
    }
}


async function getRecord(req, res) {
    try {
        const data = await subCategory.find().sort({ _id: -1 })
        res.status(200).send({ result: "Done", count: data.length, data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}


async function updateRecord(req, res) {
    try {
        var data = await subCategory.findOne({ _id: req.params._id })
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
            res.status(200).send({ result: 'Done', data, message: 'Subcategory Update Successfully!' })
        } else
            res.status(404).send({ result: 'Fail', reason: 'Record not found' })
    } catch (error) {
        let errorMessage = {}
        error.keyValue ? errorMessage.name = "Subcategory Name is Already Exist" : null

        if(error.keyValue){
            try {
                fs.unlinkSync(req.file.path)
            } catch (error) { }
        }

        Object.keys(errorMessage).length === 0 ? 
            res.status(500).send({ result: 'Fail', reason: 'Internal Server Error' }) :
            res.send({ result: 'Fail', reason: 'Missing Fields', error: errorMessage }) 
    }
}


async function deleteRecord(req, res) {
    try {
        const data = await subCategory.findOne({ _id: req.params._id })
        if (data) {
            if (data.pic) {
                try {
                    fs.unlinkSync(data.pic)
                } catch (error) { }
            }
            await data.deleteOne()
            res.status(200).send({ result: 'Doen', message: 'Record is Deleted' })
        } else
            res.status(404).send({ result: 'Fail', reason: 'Record not found' })
    } catch (error) {
        res.status(404).send({ result: 'Fail', reason: 'Internal Server Error' })
        console.log(error)
    }
}


module.exports = {
    createRecord,
    getRecord,
    updateRecord,
    deleteRecord,
}