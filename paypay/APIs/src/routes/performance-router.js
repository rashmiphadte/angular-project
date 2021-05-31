const express = require('express');
const router = express.Router();
const performance = require('../controllers/performance-controller')
const auth = require('../middlewares/auth')

// add a performance review
router.post('/add', auth, (req, res) => {
    return performance.addPerformanceReview(req, res);
})

// update a performance review
router.post('/update/:id', auth, (req, res) => {
    return performance.updatePerformanceReview(req, res);
})

// delete a performance review
router.post('/delete/:id', auth, (req, res) => {
    return performance.deletePerformanceReview(req, res);
})

// fetch all reviews
router.get('/', auth, (req, res) => {
    return performance.getAllReviews(req, res);
})

// fetch performance review using performance id
router.get('/:id', auth, (req, res) => {
    return performance.getEmployeeReview(req, res);
})


// assign employee to other employees review
router.post('/assign-employee/:id', auth, (req, res) => {
    return performance.assignEmployee(req, res);
})

// fetch assigned performace reviews using employee id
router.post('/list-reviews/:id', auth, (req, res) => {
    // param id : employee id
    return performance.getAssignedReviews(req, res)
})

router.post('/submit-feedback/:id', auth, (req, res) => {
    return performance.employeeFeedback(req, res)
})
module.exports = router;