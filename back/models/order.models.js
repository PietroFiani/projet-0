const sql = require("./dbServices.js");

const Order = function (order) {
    this.id_runner = order.id_runner;
    this.id_customer = order.id_customer;
    this.id_address = order.id_adress;
    this.id_product = order.id_product;
    this.date=order.date;
    this.workflow=order.workflow;
    this.qtte=order.qtte;
    this.prix=order.prix;
};

Order.findByRunner = (runnerId, result) => {
    sql.query(`SELECT * FROM ` + "`order`" + ` WHERE id_runner = ${runnerId}`, (err, res) => {
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
module.exports = Order;
