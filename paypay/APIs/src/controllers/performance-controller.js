const performance = require("../models/performance-model")

addPerformanceReview = (req, res) => {
    return performance.addPerformanceReview(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}

updatePerformanceReview = (req, res) => {
    return performance.updatePerformanceReview(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}


deletePerformanceReview = (req, res) => {
    return performance.deletePerformanceReview(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}

getEmployeeReview = (req, res) => {
    return performance.getEmployeeReview(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}
getAllReviews = (req, res) => {
    return performance.getAllReviews(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}

assignEmployee = (req, res) => {
    return performance.assignEmployee(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}

getAssignedReviews = (req, res) => {
    return performance.getAssignedReviews(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}

employeeFeedback = async (req, res) => {
    var getSettings
    const performaces = await performance.employeeFeedback(req, (err, result) => {
        console.log(performaces._id)
        getSettings = new Promise((resolve, reject) => {
            if (result) resolve();
        });
    })


    getSettings.then(() => {
        console.log('All messages done!');
        let feedback = {
            emp_id: req.body.emp_id,
            feedback: req.body.comment
        }
        console.log(performances)
        performaces.saveFeedback(feedback)
    });


}
module.exports = {
    addPerformanceReview,
    updatePerformanceReview,
    deletePerformanceReview,
    getEmployeeReview,
    getAllReviews,
    assignEmployee,
    getAssignedReviews,
    employeeFeedback
}