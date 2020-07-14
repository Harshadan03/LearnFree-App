const mongoose = require('mongoose')
const { ObjectId } = require('mongoose').Schema
//crypto is core node js module to hash the password
const crypto = require('crypto')
//uuid version 1
const uuidv1 = require('uuid/v1')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    salt: String,
    // Admin has role=1 and normal user has role=0
    role: {
        type: Number,
        default: 0
    },
    // array of ids of courses in which user enrolled
    courses: [{
        type: ObjectId,
        ref: "Course",
        unique: true
    }],
    myCourses: [{
        type: Array,
        default: []
    }]
},
    { timestamps: true }
)

//virtual field
userSchema.virtual('password')
    //set the password
    .set(function (password) {
        this._password = password
        this.salt = uuidv1()
        this.hashed_password = this.encryptPassword(password)
    })
    //get password
    .get(function () {
        return this._password
    })

//in this way u can add methods to the schema
userSchema.methods = {
    // method to authenticate user during signIn
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    //method to encrypt the  passowrd during signUp
    encryptPassword: function (password) {
        if (!password) return ""
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
        } catch (err) {
            return ""
        }
    }
}

module.exports = mongoose.model('User', userSchema)