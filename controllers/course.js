//A node.js module for parsing form data, especially file uploads. Current status.
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Course = require('../models/course')
const { errorHandler } = require("../helpers/dbErrorHandler")



// create course of a particular category
exports.createCourse = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }

        // check for all fields
        const { name, description, duration, price, category } = fields
        if (!name || !description || !price || !category || !duration) {
            return res.status(400).json({
                error: "All fields are required"
            })
        }

        let course = new Course(fields)
        console.log(course)
        // 'photo' is the name of the image field in the course schema
        if (files.photo) {
            // if the file size greater than 1 mb 
            // 1kb = 1000
            // 1mb =1000000
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "image should be less than 1mb"
                })
            }

            course.photo.data = fs.readFileSync(files.photo.path)
            course.photo.contentType = files.photo.type
        }

        course.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

// add or update existing  curricumlum an dinstructors of a course
exports.addCurriculumAndInstructors = (req, res) => {
    let course = req.course
    course.curriculum.push(req.body.curriculum[0])
    course.instructors.push(req.body.instructors[0])

    course.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

//get course by id
exports.courseById = (req, res, next, id) => {
    Course.findById(id).populate("category").exec((err, course) => {
        if (err || !course) {
            return res.status(400).json({
                error: "course not found!"
            })
        }
        req.course = course
        next()
    })
}

//read the course from the req
exports.readcourse = (req, res) => {
    //photo is made undefined bcz we dont want it be shown in the response bcz photo has large size
    req.course.photo = undefined
    return res.json(req.course)
}

// delete the course by id
exports.removeCourse = (req, res) => {
    let course = req.course
    course.remove((err, deletedcourse) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "course deleted successfully"
        })
    })
}


// update course of a particular category
exports.updateCourse = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }

        // //once we have the course, replace the existing information with new information  
        // and for that we use 'extend' method that comes with lodash library
        let course = req.course
        course = _.extend(course, fields)//first arg is course itself and 2nd is updated fields

        // 'photo' is the name of the image field in the course schema
        if (files.photo) {
            // if the file size greater than 1 mb 
            // 1kb = 1000
            // 1mb =1000000
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "image should be less than 1mb"
                })
            }

            course.photo.data = fs.readFileSync(files.photo.path)
            course.photo.contentType = files.photo.type
        }

        course.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}


/**
 * course on sell/ arrival
 * by sell  = /courses?sortBy=sold&order=desc&limit=4
 * by arrival = /courses?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all courses are returned
 */
exports.listOfCourses = (req, res) => {
    let order = req.query.order ? req.query.order : "asc"
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Course.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, courses) => {
            if (err) {
                return res.status(400).json({
                    error: "courses not found!"
                })
            }
            res.json(courses)
        })
}


/**
 * it will find the courses based on the req course category
 * other courses that has the same category, will be returned
 * 
 */
exports.listRelatedcourses = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    // find the ralted course of the same category but 
    // don't include the course which is requested
    // $ne = not include
    course.find({ _id: { $ne: req.course }, category: req.course.category })
        .limit(limit)
        .populate("category", "_id name")
        .exec((err, courses) => {
            if (err) {
                return res.status(400).json({
                    error: "courses not found!"
                })
            }
            res.json(courses)
        })
}

//list course categoies
//get categories of those courses which are present
exports.listCategories = (req, res) => {
    Course.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found!"
            })
        }
        res.json(categories)
    })
}



/**
 * list courses by search
 * we will implement course search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the courses to users based on what he wants
 */
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Course.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "courses not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

//get foto of the course
exports.coursePhoto = (req, res, next) => {
    if (req.course.photo.data) {
        res.set('Content-Type', req.course.photo.contentType)
        return res.send(req.course.photo.data)
    }
    next()
}

//search bar
exports.listSearch = (req, res) => {
    //create query object to hold search value and category value
    const query = {}
    //assign search value to query.name

    if (req.query.search) {
        // i in options is for case insensitivity
        query.name = { $regex: req.query.search, $options: "i" }
        //assign category value to query.category
        if (req.query.category && req.query.category != "All") {
            query.category = req.query.category
        }

        //find the course based on query object with 2 properties
        // search and category
        Course.find(query, (err, courses) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(courses)
        }).select("-photo")
    }
}

//increment enroled count
exports.incrementEnrolledCount = (req, res, next) => {
    let course = req.course
    course.enrolled = course.enrolled + 1;
    course.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        next()
    })
}


