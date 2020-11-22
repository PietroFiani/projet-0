const sql = require("./dbServices.js");

const Product = function (product) {
    this.stock = product.stock;
    this.label = product.label;
    this.description = product.description;
    this.price = product.price
    this.photo = product.photo;
    this.idRunner = product.idRunner;
    this.idCategory = product.idCategory
};

Product.findByRunner = (runnerId, result) => {
    sql.query(`SELECT * FROM product natural join category WHERE id_runner = ${runnerId}`, (err, res) => {
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
    sql.query("INSERT INTO product SET ?", product, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created product: ", { id: res.insertId, ...product });
        result(null, { id: res.insertId, ...product });
    });
};
Product.updateById = (id, product, result) => {
    sql.query(
        "UPDATE product SET label = ?, stock = ?, description = ? , price = ? , photo = ? , idCategory = ? WHERE id_product = ?", [product.label, product.stock, product.description, product.price, product.photo, product.idCategory, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err)
                return;
            }

            if (res.affectedRows == 0) {
                // not found Product with the id
                result({ kind: "not_found" }, null)
                return;
            }
            else {
                console.log("updated product: ", { id: id, ...product })
                result(null, { id: id, ...product })
            }

        });
};
module.exports = Product;
