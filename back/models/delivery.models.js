
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
module.exports = Delivery;