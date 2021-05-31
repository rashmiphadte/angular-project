const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        default: ""
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    contact: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        minlength: 5
    },
    role: {
        type: Number,
        default: 1 //0-employee, 1-admin
    },
    token: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    timestamps: true
})



userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}
// generate authentication token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString()
    }, config.credentials.secret)

    user.token = token
    await user.save()

    return token
}

userSchema.statics.login = async (req, callback) => {
    let data = {
        _id: "",
        token: "",
        message: "",
        name: "",
        contact: "",
        success: false
    }

    if (!req.body.email) {
        data.message = "Email is required"
        return callback(data, null)
    }

    const user = await User.findOne({
        email: req.body.email,
        status: true
    })

    if (!user) {
        if (!req.body.password) {
            data.message = "Password required"
            return callback(data, null)
        }
        data.message = "Login failed"
        return callback(data, null)
    }


    if (!req.body.password) {
        data.message = "Wrong password."
        return callback(data, null)
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
        data.message = "Login failed"
        return callback(data, null)
    } else {
        data.token = await user.generateAuthToken()
    }

    data._id = user._id
    data.message = "Login successful"
    data.success = true
    data.email = user.email
    data.name = user.name
    data.contact = user.contact
    data.role = user.role
    return callback(null, data)
}



const User = mongoose.model('User', userSchema)

module.exports = User