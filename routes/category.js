const express = require('express')
const router = express.Router()

//import  category controller
const { createCategory, categoryById, readCategory, listOfCategories, updateCategory, removeCategory }
    = require('../controllers/category')
//import middleware to ensure category only accessed by admin
const { isAdmin, isAuth, requireSignIn } = require('../controllers/auth')
const { userById } = require('../controllers/user')

//check required validation for name of category
const { createCategoryValidator } = require('../validator')

router.get('/category/:categoryId', readCategory)
router.post('/category/create/:userId', requireSignIn, isAuth, isAdmin, createCategoryValidator, createCategory)
router.put('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, createCategoryValidator, updateCategory)
router.delete('/category/:categoryId/:userId', requireSignIn, isAuth, isAdmin, removeCategory)
router.get('/categories', listOfCategories)


router.param("userId", userById)
router.param('categoryId', categoryById)

module.exports = router 