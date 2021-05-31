const mongoose = require('mongoose')
const validator = require('validator')
const user = require('./user-model')
const bcrypt = require('bcryptjs')

const employeeSchema = new mongoose.Schema({
    uid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
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
    phone: {
        type: Number,
        validate(value) {
            // if (!validator.is)) {
            //     throw new Error('Email is invalid')
            // }
        }
    },
    address: {
        type: String
    },
    education: {
        type: String
    },
    gender: {
        type: String
    },
    birthdate: {
        type: Date
    },
    emp_code: {
        type: String
    },

    hire_date: {
        type: Date
    },
    designation: {
        type: String
    },
    department: {
        type: String
    },
    salary: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

employeeSchema.statics.addEmployee = (req, callback) => {
    if (req.user.role === 0) {
        return callback({
            status: false,
            message: "Only admin is allowed to enter employee data"
        })
    }
    if (!req.body.emp_code) {
        return callback({
            status: false,
            message: "Employee code required"
        }, null)
    }
    if (!req.body.designation) {
        return callback({
            status: false,
            message: "Employee designation required"
        }, null)
    }
    if (!req.body.department) {
        return callback({
            status: false,
            message: "Department is required"
        }, null)
    }
    if (!req.body.email) {
        return callback({
            status: false,
            message: "Employee email is required"
        }, null)
    }
    if (!req.body.name) {
        return callback({
            status: false,
            message: "Employee name is required"
        }, null)
    }
    let data = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        emp_code: req.body.emp_code,
        designation: req.body.designation,
        department: req.body.department,
        address: req.body.address,
        education: req.body.education,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        hire_date: req.body.hire_date,
        salary: req.body.salary

    }
    Employee.create(data).then(async result => {
        let password = await bcrypt.hash('user123', 8);
        user.create({
            email: req.body.email,
            password: password,
            role: 0
        }).then(user => {
            Employee.updateOne({
                _id: result._id
            }, {
                uid: user._id
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        })
        return callback(null, {
            data: result,
            status: true
        })
    }).catch(err => {
        return callback({
            status: false,
            message: "Failed to save employee data"
        })
    })
}

employeeSchema.statics.getEmployee = (req, callback) => {
    Employee.findOne({
        uid: req.user._id,
        status: true
    }).then(result => {
        let data = []
        if (result != null) {
            data = result
        }
        return callback(null, {
            data: data,
            status: true
        })
    }).catch(err => {
        return callback({
            status: false,
            message: "Failed to get employee data"
        })
    })
}

employeeSchema.statics.updateEmployee = (req, callback) => {
    let data = {}
    if (req.body.name) {
        data.name = req.body.name
    }
    if (req.body.email) {
        data.email = req.body.email
    }
    if (req.body.phone) {
        data.phone = req.body.phone
    }
    if (req.body.education) {
        data.education = req.body.education
    }
    if (req.body.birthdate) {
        data.birthdate = req.body.birthdate
    }
    if (req.body.hire_date) {
        data.hire_date = req.body.hire_date
    }
    if (req.body.emp_code) {
        data.emp_code = req.body.emp_code
    }
    if (req.body.designation) {
        data.designation = req.body.designation
    }
    if (req.body.department) {
        data.department = req.body.department
    }
    if (req.body.gender) {
        data.gender = req.body.gender
    }
    if (req.body.address) {
        data.address = req.body.address
    }
    if (req.body.salary) {
        data.salary = req.body.salary
    }

    Employee.updateOne({
        _id: req.params.id
    }, data).then(result => {
        return callback(null, {
            status: true,
            message: "Employee data updated successfully"
        })
    }).catch(err => {
        console.log(err)
        return callback({
            status: false,
            message: "Failed to update employee data"
        })
    })
}

employeeSchema.statics.deleteEmployee = (req, callback) => {
    Employee.updateOne({
        _id: req.params.id
    }, {
        status: false
    }).then(result => {
        return callback(null, {
            status: true,
            message: "Employee removed successfully"
        })
    }).catch(err => {
        return callback({
            message: "Failed to remove employee",
            status: false
        })
    })
}

employeeSchema.statics.getAllEmployee = (req, callback) => {
    Employee.find({
        status: true
    }).then(result => {
        let data = []
        result.forEach(ele => {
            data.push(ele)
        })
        return callback(null, {
            data: data,
            status: true
        })
    }).catch(err => {
        console.log(err)
        return callback({
            status: false,
            message: "Failed to get employees data"
        })
    })
}
const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee