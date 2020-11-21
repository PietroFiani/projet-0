const Product = require("../models/product.models.js");

exports.getByRunner = (req, res) => {
    Product.findByRunner(req.params.runnerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.send(data)
            }
            else {
                res.status(500).send({
                    message: "Error retrieving products with runnerId " + req.params.runnerId
                });
            }
        }
        else {
            res.send(data)

        }
    });
}
exports.create = (req, res) => {
    let product = new Product(req.body)
    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Delivery."
            });
        else res.send(data)

    });
}