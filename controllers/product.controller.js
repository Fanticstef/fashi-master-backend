const product = require("../models/product")
const fs = require("fs")


async function getRecord(req, res) {
    try {
        const filter = {}

        if (req.query.category) filter.maincategory = req.query.category
        if (req.query.subCategory) filter.subcategory = req.query.subCategory
        if (req.query.brand) filter.brand = req.query.brand

        let data = await product.find(filter).sort({ _id: -1 })
            .populate("maincategory", ["name"])
            .populate("subcategory", ["name"])
            .populate("brand", ["name"])
        res.status(200).send({ result: 'Done', count: data.length, data })
    } catch (error) {
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}


async function createRecord(req, res) {
    try {
        var data = new product(req.body)
        if (req.files?.length) {
            data.pic = Array.from(req.files).map(x => x.path)
        }

        await data.save()

        let finalData = await product.findOne({ _id: data._id })
            .populate("maincategory", ["name"])
            .populate("subcategory", ["name"])
            .populate("brand", ["name"])
        res.status(200).send({ result: 'Done', data: finalData, message: 'Product Create Successfully!' })
    } catch (error) {
        let errorMessage = {}
        error.errors?.name ? errorMessage.name = error.error?.name?.message : null
        error.errors?.maincategory ? errorMessage.maincategory = error.error?.maincategory?.message : null
        error.errors?.subcategory ? errorMessage.subcategory = error.error?.maincategory?.message : null
        error.errors?.brand ? errorMessage.brand = error.error?.brand?.message : null
        error.errors?.color ? errorMessage.color = error.error?.color?.message : null
        error.errors?.size ? errorMessage.size = error.error?.size?.message : null
        error.errors?.basePrice ? errorMessage.basePrice = error.error?.basePrice?.message : null
        error.errors?.discount ? errorMessage.discount = error.error?.discount?.message : null
        error.errors?.finalPrice ? errorMessage.finalPrice = error.error?.finalPrice?.message : null
        error.errors?.stock ? errorMessage.stock = error.error?.stock?.message : null
        error.errors?.stockQuantity ? errorMessage.stockQuantity = error.error?.stockQuantity?.message : null
        error.errors?.description ? errorMessage.description = error.error?.description?.message : null
        error.errors?.pic ? errorMessage.pic = error.error?.pic?.message : null

        try {
            Array.from(req.files).forEach(x => {
                fs.unlinkSync(x.path)
            })
        } catch (error) { }
        console.log(errorMessage, error)

        Object.keys(errorMessage) === 0 ?
            res.status(500).send({ result: 'Fail', reason: 'Internal Server Error' }) :
            res.send({ result: 'Fail', reason: 'Missing Fields', error: errorMessage })
    }
}


async function updateRecord(req, res) {
    try {
        var data = await product.findOne({ _id: req.params._id })
        if (data) {
            data.name = req.body.name ?? data.name
            data.maincategory = req.body.maincategory ?? data.maincategory
            data.subcategory = req.body.subcategory ?? data.subcategory
            data.brand = req.body.brand ?? data.brand
            data.color = req.body.color ?? data.color
            data.size = req.body.size ?? data.size
            data.basePrice = req.body.basePrice ?? data.basePrice
            data.discount = req.body.discount ?? data.discount
            data.finalPrice = req.body.finalPrice ?? data.finalPrice
            data.stockQuantity = req.body.stockQuantity ?? data.stockQuantity
            data.stock = req.body.stock ?? data.stock
            data.description = req.body.description ?? data.description
            data.active = req.body.active ?? data.active

            // Handle new images if uploaded
            if (req.files && req.files.length > 0) {
                // Add new images to existing ones
                const newImagePaths = req.files.map(x => x.path)
                data.pic = [...(data.pic || []), ...newImagePaths]
            }

            await data.save()

            let finalData = await product.findOne({ _id: data._id })
                .populate("maincategory", ["name"])
                .populate("subcategory", ["name"])
                .populate("brand", ["name"])
            res.status(200).send({ result: 'Done', data: finalData, message: 'Product Update Successfully!' })
        } else
            res.status(404).send({ result: "Fail", reason: "Record Not Found" })
    } catch (error) {
        console.error("Error in updateRecord:", error)
        res.status(500).send({ result: "Fail", reason: "Internal Server Error" })
    }
}


async function deleteRecord(req, res) {
    try {
        const data = await product.findOne({ _id: req.params._id });

        if (data && data.pic && Array.isArray(data.pic)) {
            for (const filePath of data.pic) {
                try {
                    // filePath is already a string, so we can use it directly
                    await fs.promises.unlink(filePath);
                } catch (err) {
                    console.error(`Failed to delete file: ${filePath}`, err);
                }
            }

            await data.deleteOne();
            return res.status(200).send({ result: 'Done', message: 'Record is Deleted' });
        } else {
            return res.status(404).send({ result: "Fail", reason: "Record Not Found" });
        }

    } catch (error) {
        console.error("Error in deleteRecord:", error);
        return res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
    }
}

async function removeSingleImage(req, res) {
    try {
        const { _productId, _imageIndex } = req.params;

        const data = await product.findOne({ _id: _productId });

        if (!data) {
            return res.status(404).send({ result: "Fail", reason: "Product Not Found" });
        }

        if (!data.pic || !Array.isArray(data.pic) || _imageIndex >= data.pic.length) {
            return res.status(400).send({ result: "Fail", reason: "Invalid image index" });
        }

        // Get the file path to delete
        const filePathToDelete = data.pic[_imageIndex];

        // Remove the file from the filesystem
        try {
            await fs.promises.unlink(filePathToDelete);
        } catch (err) {
            console.error(`Failed to delete file: ${filePathToDelete}`, err);
            // Continue with database update even if file deletion fails
        }

        // Remove the image path from the array
        data.pic.splice(_imageIndex, 1);
        await data.save();

        // Get updated data with populated fields
        let finalData = await product.findOne({ _id: data._id })
            .populate("maincategory", ["name"])
            .populate("subcategory", ["name"])
            .populate("brand", ["name"]);

        return res.status(200).send({
            result: 'Done',
            message: 'Image removed successfully',
            data: finalData
        });

    } catch (error) {
        console.error("Error in removeSingleImage:", error);
        return res.status(500).send({ result: "Fail", reason: "Internal Server Error" });
    }
}



module.exports = {
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord,
    removeSingleImage,
}