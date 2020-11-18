const Department = require("../models/department.models.js");

exports.findAll = (req, res) => {
    Department.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};