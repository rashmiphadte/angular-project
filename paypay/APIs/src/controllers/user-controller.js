const User = require("../models/user-model")
const bcrypt = require('bcryptjs')



signUp = async (req, res) => {
    let success_data = {
        _id: "",
        token: "",
        message: "",
        success: false,
        name: "",
        email: "",
        phone: ""
    }
    let data = {}

    if (!req.body.email) {
        success_data.message = "Invalid email"
        return res.status(400).send(success_data)
    }
    if (!req.body.password) {
        success_data.message = "Invalid password"
        return res.status(400).send(success_data)
    }
    let length, password, reg_exp;
    password = req.body.password.toString().trim();
    reg_exp = / /;
    if (reg_exp.test(password)) {
        success_data.message = "Password should not contain spaces."
        return res.status(400).send(success_data);
    }
    length = password.length;
    if (length < 6 || length > 25) {
        success_data.message = "Password must be 6 to 25 characters long."
        return res.status(400).send(success_data);
    }
    // hash password 
    data.password = await bcrypt.hash(req.body.password, 8);


    if (req.body.name) {
        data.name = req.body.name
    }
    if (req.body.phone) {
        data.contact = req.body.phone
    }
    data.email = req.body.email
    data.role = req.body.role
    const user = new User(data)
    await user.save(async (err, result) => {
        console.log(err)
        if (err) {
            if (err.code === 11000) {
                success_data.message = "Email alredy in use"
            } else {
                success_data.message = "Registration failed"
            }

            return res.status(400).send(success_data)
        }
        //generate token
        const token = await user.generateAuthToken()


        success_data._id = user._id,
            success_data.name = user.name,
            success_data.email = user.email,
            success_data.phone = user.contact,
            success_data.token = token,
            success_data.role = user.role,
            success_data.message = "Registration successful",
            success_data.success = true

        return res.status(200).send(success_data)
    })

}

login = async (req, res) => {
    return User.login(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}




module.exports = {
    signUp,
    login
}