const sql = require("./dbServices.js");

const Product = function (product) {
    this.stock = product.stock;
    this.name = product.name;
    this.description = product.description;
    this.price= product.price
    this.photo = product.photo;
    this.idRunner = product.idRunner;
    this.idCategory = product.idCategory
};

Product.findByRunner = (runnerId, result) => {
    sql.query(`SELECT * FROM product, category WHERE product.idCategory=category.id AND idRunner = ${runnerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found products: ", res);
            result(null, res);
            return;
        }

        // not found Runner with the id
        result({ kind: "not_found" }, null);
    });
};
Product.create = (product, result) => {
    sql.query("INSERT INTO delivery SET ?", product, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created product: ", { id: res.insertId, ...product });
        result(null, { id: res.insertId, ...product });
    });
};
module.exports = Product;
