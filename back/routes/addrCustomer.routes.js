module.exports = app => {
    const addrCustomer = require("../controllers/addrCustomer.controller.js");
    // Create a new Customer
    app.post("/addrCustomer/add", addrCustomer.create);

    // Retrieve all Customers
    app.get("/addrCustomer", addrCustomer.findAll);

    // Retrieve a single Customer with customerId
    app.get("/addrCustomer/:addrCustomerId", addrCustomer.findOne);

    // Update a Customer with customerId
    app.put("/addrCustomer/:addrCustomerId", addrCustomer.update);

    // Delete a Customer with customerId
    // app.delete("/customers/:customerId", addrCustomer.delete);

    // Create a new Customer
    // app.delete("/customers", customers.deleteAll);
};