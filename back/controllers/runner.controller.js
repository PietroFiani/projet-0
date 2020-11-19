const Runner = require("../models/runner.models.js");
const Delivery = require("../models/delivery.models.js");
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
            let idRunner = data.id
            req.body.departmentsIds.forEach(idDepartment => {
                let delivery = new Delivery({
                    idRunner,
                    idDepartment
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
        } else res.send(data);
    });
};