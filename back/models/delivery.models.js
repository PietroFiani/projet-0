
const sql = require("./dbServices.js");
const bcrypt = require('bcrypt');

// constructor
const Delivery = function (delivery) {
    this.idRunner = delivery.idRunner;
    this.idDepartment = delivery.idDepartment;
};

Delivery.create = (newDelivery, result) => {
    sql.query("INSERT INTO delivery SET ?", newDelivery, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created delivery: ", { id: res.insertId, ...newDelivery });
        result(null, { id: res.insertId, ...newDelivery });
    });
};

Delivery.findByRunner = (runnerId, result) => {
    sql.query(`SELECT * FROM delivery natural join department WHERE idRunner = ${runnerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found deliveries: ", res);
            result(null, res);
            return;
        }

        // not found Runner with the id
        result({ kind: "not_found" }, null);
    });
};
module.exports = Delivery;