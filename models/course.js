const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    duration: {
        type: String,
        required: true
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },
    enrolled: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    curriculum: [
        {
            topic: {
                type: String,
                required: true
            },
            subtopics: [String]
        }
    ],

    instructors: [
        {
            name: {
                type: String,
                required: true,
                trim: true
            },
            qualification: {
                type: String,
                required: true
            },
            about: {
                type: String,
                require: true
            }
        }
    ]

},
    { timestamps: true }
)


module.exports = mongoose.model('Course', courseSchema)