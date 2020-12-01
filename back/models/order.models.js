const sql = require("./dbServices.js");

// constructor
const Order = function(order) {
    this.id_runner = order.id_runner;
    this.id_customer = order.id_customer;
    this.id_address = order.id_address;
    this.id_product = order.id_product;
    this.date = order.date;
    this.workflow = order.workflow;
    this.qtte = order.qtte;
    this.prix = order.prix;
};

Order.create = (newOrder, result) => {
    sql.query(`INSERT INTO` + "`order`" + `SET ?`, newOrder, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created order: ", { id: res.insertId, ...newOrder });
        result(null, { id: res.insertId, ...newOrder });
    });
};

Order.findById = (customerId, result) => {
    sql.query(`SELECT * 
               FROM order NATURAL JOIN address NATURAL JOIN department
               WHERE id_customer = ${customerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found order: ", res);
            result(null, res);
            return;
        }

        // not found Order with the id
        result({ kind: "not_found" }, null);
    });
};

Order.getAll = result => {
    sql.query("SELECT * FROM order", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("orders: ", res);
        result(null, res);
    });
};

Order.updateById = (id, order, result) => {
    sql.query(
        "UPDATE order SET mail = ?, phone = ?, password = ? WHERE id_customer = ?", [order.mail, order.phone, order.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Order with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated order: ", { id: id, ...order });
            result(null, { id: id, ...order });
        }
    );
};

Order.remove = (id, result) => {
    sql.query("DELETE FROM order WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Order with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted order with id: ", id);
        result(null, res);
    });
};

Order.removeAll = result => {
    sql.query("DELETE FROM order", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} orders`);
        result(null, res);
    });
};

module.exports = Order;