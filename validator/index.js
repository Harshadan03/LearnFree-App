exports.userSignupValidator = (req, res, next) => {

    //we are able to use this check() because of the express-validator@5.3.1
    req.check('name', "Name is Required!").notEmpty()

    req.check('phone', "Mobile Number is Required!")
        .isLength({ min: 10, max: 10 })
        .withMessage("Mobile Number must be a 10 digit number")

    req.check('email', "Email must be between 4 to 32 characters!")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain  @")
        .isLength({
            min: 4,
            max: 32
        })

    req.check('password', "Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must contain atleast 6 chracters")
        .matches(/\d/)
        .withMessage("Password must contain a number")

    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error: firstError })
    }

    //we need to have next otherwise our application will halt
    next()
}


exports.createCategoryValidator = (req, res, next) => {
    req.check("name", "Name is required!").notEmpty()
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error: firstError })
    }

    //we need to have next otherwise our application will halt
    next()
}
