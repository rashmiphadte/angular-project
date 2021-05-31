const employee = require("../models/employee-model")

addEmployee = async (req, res) => {
    return employee.addEmployee(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}

updateEmployee = async (req, res) => {
    return employee.updateEmployee(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}


deleteEmployee = async (req, res) => {
    return employee.deleteEmployee(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}

getEmployee = async (req, res) => {
    return employee.getEmployee(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}

getAllEmployee = async (req, res) => {
    return employee.getAllEmployee(req, function (error, results) {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(results);
    });
}
module.exports = {
    addEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployee
}