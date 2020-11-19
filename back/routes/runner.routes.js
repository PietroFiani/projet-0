module.exports = app => {
    const runners = require("../controllers/runner.controller.js");
    // Create a new Customer
    app.post("/runners/register", runners.create);

    // Login
    app.get("/runners/login", runners.login)

    // Retrieve all Customers
    // app.get("/runners", runners.findAll);

    // Retrieve a single Customer with customerId
    // app.get("/runners/:runnerId", runners.findOne);

    // Update a Customer with customerId
    // app.put("/runner/:runnerrId", runners.update);

    // Delete a Customer with customerId
    // app.delete("/customers/:customerId", customers.delete);

    // 
    // app.delete("/customers", customers.deleteAll);
};