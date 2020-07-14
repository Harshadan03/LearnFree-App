const User = require('../models/user')
const { errorHandler } = require("../helpers/dbErrorHandler")



exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "user not found"
            })
        }
        req.profile = user
        next()
    })
}

exports.readUserProfile = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

exports.updateUserProfile = (req, res) => {
    User.findOneAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true }, (err, user) => {

        if (err || !user) {
            return res.status(400).json({
                error: "You are not authorized to perform this action!"
            })
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    })

}

//enroll a course in users account
exports.enrollCourse = (req, res) => {
    let user = req.profile
    user.courses.push(req.body.courseId)

    let course = req.course
    user.myCourses.push({
        _id: course._id,
        name: course.name,
        description: course.description
    })

    user.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}



// get array of ids of enrolled courses of user
exports.getEnrolledCourses = (req, res) => {
    let user = req.profile
    res.json(user.courses)
}

// get array of mycourses of user
exports.getMyCourses = (req, res) => {
    let user = req.profile
    res.json(user.myCourses)
}