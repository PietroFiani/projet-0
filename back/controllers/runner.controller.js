const Runner = require("../models/runner.models.js");
const bcrypt = require('bcrypt');


// Create and Save a new Runner
exports.create = (req, res) => {
    // Validate request

    console.log("body",req.body)
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const password = req.body.password;
    const encryptedPassword = bcrypt.hashSync(password, 10)
    console.log("crypt psswd",encryptedPassword)
    // Create a Customer
    const runner = new Runner({
        mail: req.body.mail,
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        password: encryptedPassword,
        phone: req.body.phone,
        image: req.body.image
    });

    // Save Customer in the database
    Runner.create(runner, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
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
}