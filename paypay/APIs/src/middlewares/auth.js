const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
const config = require('../config')

const auth = async (req, res, next) => {
    let data = {
        message: ""
    }
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, config.credentials.secret)
        let user;
        user = await User.findOne({
            _id: decoded._id,
            status: true,
            'token': token
        })
        if (!user) {
            data.message = "User not available.";
            return res.status(400).send(data)
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        data.message = "Please Authenticate"
        res.status(401).send(data)
    }
}

module.exports = auth