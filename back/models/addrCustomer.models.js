const sql = require("./dbServices.js");

// constructor
const AddrCustomer = function(addrCustomer) {
    this.road = addrCustomer.road;
    this.zip = addrCustomer.zip;
    this.idDepartement = addrCustomer.idDepartement;
    this.idCustomer = addrCustomer.idCustomer
};

AddrCustomer.create = (newAddrCustomer, result) => {
    sql.query("INSERT INTO address SET ?", newAddrCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created address: ", { id: res.insertId, ...newAddrCustomer });
        result(null, { id: res.insertId, ...newAddrCustomer });
    });
};

AddrCustomer.findById = (addrCustomerId, result) => {
    sql.query(`SELECT * FROM address WHERE id = ${addrCustomerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found address: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found AddrCustomer with the id
        result({ kind: "not_found" }, null);
    });
};

// AddrCustomer.log = (auth, result) => {
//     sql.query('SELECT * FROM customer WHERE mail = ?', [auth.mail], async function(error, res, fields) {
//         if (error) {
//             console.log("error: ", error);
//             result(null, error);
//             return;
//         } else {
//             console.log("try", auth, "for", res)
//             if (res.length > 0) {
//                 const comparision = await bcrypt.compare(auth.password, res[0].password)
//                 if (comparision) {
//                     console.log("Success authentification: ", res[0]);
//                     result(null, res[0]);
//                     return;
//                 } else {
//                     console.log("Email and password does not match");
//                     result(null);
//                     return;
//                 }
//             } else {
//                 console.log("Email does not exist");
//                 result(null);
//                 return;
//             }
//         }
//     })
// };

AddrCustomer.getAll = result => {
    sql.query("SELECT * FROM address", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("address: ", res);
        result(null, res);
    });
};

// AddrCustomer.updateById = (id, customer, result) => {
//     sql.query(
//         "UPDATE customer SET email = ?, lastname = ?, firstname = ? WHERE id = ?", [customer.email, customer.lastname, customer.firstname, id],
//         (err, res) => {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//                 return;
//             }

//             if (res.affectedRows == 0) {
//                 // not found AddrCustomer with the id
//                 result({ kind: "not_found" }, null);
//                 return;
//             }

//             console.log("updated customer: ", { id: id, ...customer });
//             result(null, { id: id, ...customer });
//         }
//     );
// };

// AddrCustomer.remove = (id, result) => {
//     sql.query("DELETE FROM customer WHERE id = ?", id, (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         if (res.affectedRows == 0) {
//             // not found AddrCustomer with the id
//             result({ kind: "not_found" }, null);
//             return;
//         }

//         console.log("deleted customer with id: ", id);
//         result(null, res);
//     });
// };

// AddrCustomer.removeAll = result => {
//     sql.query("DELETE FROM customer", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log(`deleted ${res.affectedRows} customers`);
//         result(null, res);
//     });
// };

module.exports = AddrCustomer;