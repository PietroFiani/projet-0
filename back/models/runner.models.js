const sql = require("./dbServices.js");
const bcrypt = require('bcrypt');

// constructor
const Runner = function (runner) {
    this.mail = runner.mail;
    this.lastname = runner.lastname;
    this.firstname = runner.firstname;
    this.password = runner.password;
    this.image = runner.image;
    this.phone = runner.phone
};

Runner.create = (newRunner, result) => {
    sql.query("INSERT INTO runner SET ?", newRunner, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created runner: ", { id: res.insertId, ...newRunner });
        result(null, { id: res.insertId, ...newRunner });
    });
};

Runner.log = (auth, result) => {
    sql.query('SELECT * FROM runner WHERE mail = ?', [auth.mail], async function (error, res, fields) {
        if (error) {
            console.log("error: ", error);
            result(null, error);
            return;
        }
        else {
            console.log("try", auth, "for", res)
            if (res.length > 0) {
                const comparision = await bcrypt.compare(auth.password, res[0].password)
                if (comparision) {
                    console.log("Success authentification: ", res[0]);
                    result(null, res[0]);
                    return;
                }
                else {
                    console.log("Email and password does not match");
                    result(null);
                    return;
                }
            }
            else {
                console.log("Email does not exist");
                result(null);
                return;
            }
        }
    })
};
Runner.findById = (runnerId, result) => {
    sql.query(`SELECT * FROM runner WHERE id = ${runnerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found runner: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Runner with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Runner;