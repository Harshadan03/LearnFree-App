const express = require('express')
const router = express.Router()

//import middleware to ensure category only accessed by admin
const { isAdmin, isAuth, requireSignIn } = require('../controllers/auth')
const { userById } = require('../controllers/user')

const { createCourse, courseById, coursePhoto, listBySearch, listCategories, listOfCourses, listRelatedcourses
    , listSearch, readcourse, removeCourse, updateCourse, addCurriculumAndInstructors } = require('../controllers/course')


router.post('/course/create/:userId', requireSignIn, isAuth, isAdmin, createCourse)
router.get('/course/:courseId', readcourse)
router.delete('/course/:courseId/:userId', requireSignIn, isAuth, isAdmin, removeCourse)
router.put('/course/:courseId/:userId', requireSignIn, isAuth, isAdmin, updateCourse)
//get all courses
router.get('/courses', listOfCourses)
//api for search bar on home page of front end 
router.get("/courses/search", listSearch)
//get realted courses
router.get('/courses/related/:courseId', listRelatedcourses)
//get course categories
router.get('/courses/categories', listCategories)
// route - make sure its post
router.post("/courses/by/search", listBySearch)
//send course photo
router.get('/course/photo/:courseId', coursePhoto)

//add curriculum and instructors in the course
router.put('/course/addInfo/:courseId/:userId', requireSignIn, isAuth, isAdmin, addCurriculumAndInstructors)


router.param("userId", userById)
router.param("courseId", courseById)

module.exports = router 