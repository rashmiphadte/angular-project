const express = require('express');
const router = express.Router();
const employee = require('../controllers/employee-controller')
const auth = require('../middlewares/auth')

// Add employee
router.post('/add', auth, async (req, res) => {
    return employee.addEmployee(req, res);
})

// update employee using employee id
router.post('/update/:id', auth, async (req, res) => {
    return employee.updateEmployee(req, res);
})

// delete employee using employee id
router.post('/delete/:id', auth, async (req, res) => {
    return employee.deleteEmployee(req, res);
})

// fetch employee using userid
router.post('/', auth, async (req, res) => {
    return employee.getEmployee(req, res);
})

// get all employees
router.get('/', auth, async (req, res) => {
    return employee.getAllEmployee(req, res);
})

module.exports = router;