const Runner = require("../models/runner.models.js");
const Delivery = require("../models/delivery.models.js");
const Product = require("../models/product.models.js");

const bcrypt = require('bcrypt');


// Create and Save a new Runner
exports.create = (req, res) => {
    // Validate request

    console.log("body", req.body)
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const password = req.body.password;
    const encryptedPassword = bcrypt.hashSync(password, 10)
    console.log("crypt psswd", encryptedPassword)
    // Create a Runner
    const runner = new Runner({
        mail: req.body.mail,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        password: encryptedPassword,
        phone: req.body.phone,
        image: req.body.image
    });



    // Save Runner in the database
    Runner.create(runner, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Runner."
            });
        else {
            let id_runner = data.id_runner
            console.log("id", id_runner)
            req.body.departmentsIds.forEach(id_department => {
                let delivery = new Delivery({
                    id_runner,
                    id_department
                })
                Delivery.create(delivery, (err, deliverydata => {
                    if (err)
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Delivery."
                        });

                }))
            },
                res.send(data)

            )

        }
    });



};

exports.login = async function (req, res) {
    var mail = req.query.mail;
    var password = req.query.password;
    console.log("REQ", req.query)
    const auth = {
        mail,
        password
    }
    Runner.log(auth, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Runner.findById(req.params.runnerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Runner with id ${req.params.runnerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Runner with id " + req.params.runnerId
                });
            }
        } else Delivery.findByRunner(req.params.runnerId, (err, deliveryData) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.send(data)
                }
                else {
                    res.status(500).send({
                        message: "Error retrieving delivery with runnerId " + req.params.runnerId
                    });
                }
            }
            else {
                data.deliveries = deliveryData;
                res.send(data)

            }
        });
    })
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const encryptedPassword = bcrypt.hashSync(req.body.password, 10)

    const runner = new Runner({
        mail: req.body.mail,
        password: encryptedPassword,
        phone: req.body.phone,
    });

    Runner.updateById(req.body.id_runner,
        new Runner(runner),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Runner with id ${req.body.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Runner with id " + req.body.id
                    });
                }
            } else {
                res.send(data)

            }
        })
}
exports.delete = (req, res) => {
    console.log("REQ", req.params)
    Delivery.deleteByRunner(req.params.runnerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found delivery with runnerId ${req.params.runnerId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving delivery with runnerId " + req.params.runnerId
                });
            }
        }
        else {
            Product.deleteByRunner(req.params.runnerId, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found product with runnerId ${req.params.runnerId}.`
                        });
                    }
                    else {
                        res.status(500).send({
                            message: "Error retrieving product with runnerId " + req.params.runnerId
                        });
                    }
                }
                else {

                    Runner.remove(req.params.runnerId, (err, runnerData) => {
                        if (err) {
                            if (err.kind === "not_found") {
                                res.status(404).send({
                                    message: `Not found Runner with id ${req.params.runnerId}.`
                                });
                            } else {
                                res.status(500).send({
                                    message: "Could not delete Customer with id " + req.params.runnerId
                                });
                            }
                        }
                        else res.send({ message: `Runner was deleted successfully!` });
                    })
                }
            })

        }
    })
}