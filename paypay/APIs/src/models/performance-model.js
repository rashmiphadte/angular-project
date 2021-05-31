const mongoose = require('mongoose')
const validator = require('validator')
const performanceSchema = new mongoose.Schema({
    emp_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Employee'
    },
    review_period: {
        type: String,
        default: new Date()
    },
    review_date: {
        type: Date
    },
    work_performance: {
        type: String
    },
    goal_achivement: {
        type: String
    },
    suggestions: {
        type: String
    },
    comments: {
        type: String
    },
    employees: {
        type: Array
    },
    feedbacks: [{
        feedback: {
            type: String
        },
        emp_id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Employee'
        }
    }],
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

performanceSchema.methods.saveFeedback = async function (feedback) {
    const performance = this
    performance.feedbacks = performance.feedbacks.concat({
        feedback
    })
    await performance.save()
    console.log(performance.feedbacks)
    // return token
}
performanceSchema.statics.addPerformanceReview = (req, callback) => {
    if (!req.body.emp_id) {
        return callback({
            status: false,
            message: "Employee id required"
        })
    }
    let data = {}
    data.emp_id = req.body.emp_id
    data.review_period = req.body.review_period
    data.review_date = req.body.review_date
    data.work_performance = req.body.work_performance
    data.goal_achivement = req.body.goal_achivement
    data.suggestions = req.body.suggestions
    data.comments = req.body.comments
    Performance.create(data).then(result => {
        return callback(null, {
            status: true,
            message: "Employee performace review added successfully"
        })
    }).catch(err => {
        return callback({
            status: false,
            message: "Failed to add performance review"
        })
    })
}

performanceSchema.statics.getAllReviews = (req, callback) => {
    Performance.find({
        status: true
    }).populate("emp_id").then(result => {
        return callback(null, {
            status: true,
            data: result
        })
    }).catch(err => {
        return callback({
            status: false,
            message: "Failed to get reviews"
        })
    })
}

performanceSchema.statics.getEmployeeReview = (req, callback) => {
    console.log(req.params.id)
    Performance.findOne({
        status: true,
        _id: req.params.id
    }).then(result => {
        return callback(null, {
            status: true,
            data: result
        })
    }).catch(err => {
        return callback({
            status: false,
            message: "Failed to get employee performance"
        })
    })
}

performanceSchema.statics.deletePerformanceReview = (req, callback) => {
    Performance.updateOne({
        _id: req.params.id
    }, {
        status: false
    }).then(result => {
        return callback(null, {
            status: true,
            message: "Review deleted successfully"
        })
    }).catch(err => {
        return callback({
            status: false,
            message: "Failed to delete review"
        })
    })
}

performanceSchema.statics.updatePerformanceReview = (req, callback) => {
    let data = {}
    if (req.body.emp_id) {
        data.emp_id = req.body.emp_id
    }
    if (req.body.review_date) {
        data.review_date = req.body.review_date
    }
    if (req.body.review_period) {
        data.review_period = req.body.review_period
    }
    if (req.body.work_performance) {
        data.work_performance = req.body.work_performance
    }
    if (req.body.goal_achivement) {
        data.goal_achivement = req.body.goal_achivement
    }
    if (req.body.suggestions) {
        data.suggestions = req.body.suggestions
    }
    if (req.body.comments) {
        data.comments = req.body.comments
    }
    Performance.updateOne({
        _id: req.params.id
    }, data).then(result => {
        return callback(null, {
            status: true,
            message: "Updated employee review"
        })
    }).catch(err => {
        return callback({
            status: false,
            message: "Failed to update employee review"
        })
    })
}

performanceSchema.statics.assignEmployee = (req, callback) => {
    if (!req.body.employees) {
        return callback({
            status: false,
            message: "Atleast add one employee"
        })
    }
    Performance.findOne({
        _id: req.params.id
    }).then(result => {
        let emp_ids = []
        emp_ids = result.employees
        let merged_ids = req.body.employees.concat(emp_ids)
        Performance.update({
            _id: req.params.id
        }, {
            employees: merged_ids
        }).then(result => {
            return callback(null, {
                status: true,
                message: "Assigned employee to a review"
            })
        }).catch(err => {
            return callback({
                status: false,
                message: "Failed to assign employee"
            })
        })
    }).catch(error => {
        return callback({
            status: false,
            message: "Failed to assign employee"
        })
    })

}

performanceSchema.statics.getAssignedReviews = (req, callback) => {
    Performance.find().populate('emp_id').then(result => {
        let assigned_reviews = []
        result.forEach(ele => {
            if (ele.employees.indexOf(req.params.id) > -1) {
                assigned_reviews.push(ele)
            }
        })
        return callback(null, {
            status: true,
            data: assigned_reviews
        })
    }).catch(err => {
        return callback({
            status: false,
            message: "Failed to get list of reviews assigned"
        })
    })
}

performanceSchema.statics.employeeFeedback = async (req, callback) => {
    const performance = await Performance.findOne({
        _id: req.params.id
    })

    if (!performance) {
        throw new Error('Unable to fine performance')
    }

    console.log("performance", performance)
    return callback(null, performance)
}
const Performance = mongoose.model('Performance', performanceSchema)

module.exports = Performance