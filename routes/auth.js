const express = require('express')
const router = express.Router()

//import user controller
const { signUp, signIn, signOut } = require('../controllers/auth')

//import validator
const { userSignupValidator } = require('../validator')

router.post('/signup', userSignupValidator, signUp)
router.post('/signin', signIn)
router.get('/signout', signOut)

module.exports = router