const AddrCustomer = require("../models/addrCustomer.models.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request

    console.log("body", req.body)
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Customer
    const addrCustomer = new AddrCustomer({
        road: req.body.road,
        zip: req.body.zip,
        idDepartment: req.body.idDepartment,
        idCustomer: req.body.idCustomer
    });

    // Save address customer in the database
    AddrCustomer.create(addrCustomer, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
};



// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    AddrCustomer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};
// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    AddrCustomer.findById(req.params.addrCustomerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Address Customer with id ${req.params.addrCustomerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Address Customer with id " + req.params.addrCustomerId
                });
            }
        } else res.send(data);
    });
};


// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // console.log(req.params)

    AddrCustomer.updateById(
        req.params.addrCustomerId,
        new AddrCustomer(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found AddrCustomer with id ${req.params.customerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating AddrCustomer with id " + req.params.customerId
                    });
                }
            } else res.send(data);
        }
    );
};

// // Delete a Customer with the specified customerId in the request
// exports.delete = (req, res) => {
//     Customer.remove(req.params.customerId, (err, data) => {
//         if (err) {
//             if (err.kind === "not_found") {
//                 res.status(404).send({
//                     message: `Not found Customer with id ${req.params.customerId}.`
//                 });
//             } else {
//                 res.status(500).send({
//                     message: "Could not delete Customer with id " + req.params.customerId
//                 });
//             }
//         } else res.send({ message: `Customer was deleted successfully!` });
//     });
// };

// // Delete all Customers from the database.
// exports.deleteAll = (req, res) => {
//     Customer.removeAll((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message: err.message || "Some error occurred while removing all customers."
//             });
//         else res.send({ message: `All Customers were deleted successfully!` });
//     });
// };