const Category = require('../models/category')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {

        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        res.json({ data })
    })
}

// middleware to get category by id
exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category does not exist!"
            })
        }
        req.category = category
        next()
    })
}

//read single category from req
exports.readCategory = (req, res) => {
    return res.json(req.category)
}

//update category
exports.updateCategory = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

//delete category
exports.removeCategory = (req, res) => {
    const category = req.category

    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Category deleted"
        })
    })
}

//get all categories
exports.listOfCategories = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}


