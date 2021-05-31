const express = require('express');
const router = express.Router();
const User = require('../controllers/user-controller')
const auth = require('../middlewares/auth')

/**
 * @api {post} /user/ Register/signup User
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiParam {String} username Users name. *optional
 * @apiParam {String} email Users email.
 * @apiParam {String} password Users password.
 * @apiParam {Number} contact Users mobile number *Optional.
 *
 * @apiSuccess (200) {Json} User information.
 * @apiSuccessExample {json} Response:
{
    "_id": "5f7c3ad2ed7d90031cf7371d",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjdjM2FkMmVkN2Q5MDAzMWNmNzM3MWQiLCJpYXQiOjE2MDE5NzcwNDJ9.R9Er2FQIZ4eI8mR7kHavw3evUbgDQyYgRWk_38ES7Gw",
    "message": "Login successful",
    "success": true,
    "name": "rashmi phadte",
    "email": "rashmi@bluestream.io",
    "phone": ""
}
*@apiErrorExample {json} Error-Response:
	HTTP/1.1 400 
{
    "_id": "",
    "token": "",
    "message": "Registration failed",
    "success": false,
    "name":"",
    "email":""
}
 */
router.post('/', async (req, res) => {
    return User.signUp(req, res);
})

/**
 * @api {post} /user/login Login User
 * @apiName PostUser
 * @apiGroup SignIn 
 *
 * @apiParam {String} email Users email. 
 * @apiParam {String} password Users password.
 *
 * @apiSuccess (200) {Json} User information.
 * @apiSuccessExample {json} Response:
{
    "_id": "5f7c3ad2ed7d90031cf7371d",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjdjM2FkMmVkN2Q5MDAzMWNmNzM3MWQiLCJpYXQiOjE2MDE5NzcwNDJ9.R9Er2FQIZ4eI8mR7kHavw3evUbgDQyYgRWk_38ES7Gw",
    "message": "Login successful",
    "success": true
}
*@apiErrorExample {json} Error-Response:
	HTTP/1.1 400 
{
    "_id": "",
    "token": "",
    "message": "Login failed",
    "success": false
}
 */
router.post('/login', async (req, res) => {
    return User.login(req, res);
})


module.exports = router;