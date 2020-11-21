module.exports = app => {

    const products = require("../controllers/product.controller.js");
    // Retrieve all Departements
    app.get("/products/:runnerId", products.getByRunner)
    app.post("/products/new", products.create)

};