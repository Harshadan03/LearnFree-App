const express = require('express')
const router = express.Router()

const { requireSignIn, isAuth } = require('../controllers/auth')
const { userById, readUserProfile, updateUserProfile, enrollCourse, getEnrolledCourses, getMyCourses } = require('../controllers/user')
const { courseById, incrementEnrolledCount } = require('../controllers/course')


router.get("/user/:userId", requireSignIn, isAuth, readUserProfile)
router.put("/user/:userId", requireSignIn, isAuth, updateUserProfile)

router.put("/user/enroll-course/:courseId/:userId", requireSignIn, isAuth, incrementEnrolledCount, enrollCourse)

router.get("/user/courses/:userId", requireSignIn, isAuth, getEnrolledCourses)

router.get("/user/my-courses/:userId", requireSignIn, isAuth, getMyCourses)

router.param("userId", userById)
router.param("courseId", courseById)

module.exports = router