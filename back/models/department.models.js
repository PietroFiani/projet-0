const sql = require("./dbServices.js");

const Department = function (department) {
    this.code = department.code;
    this.nom = department.nom;
    this.nom_uppercase = department.nom_uppercase;
    this.slug = department.slug;
    this.nom_soundex = department.nom_soundex;
};

Department.getAll = result => {
    sql.query("SELECT * FROM department", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("departments: ", res);
        result(null, res);
    });
};
module.exports = Department;
