module.exports = app => {
    const runners = require("../controllers/runner.controller.js");
    // Create a new Runner
    app.post("/runners/register", runners.create);

    // Login
    app.get("/runners/login", runners.login)

    // Retrieve all Customers
    // app.get("/runners", runners.findAll);

    // Retrieve a single Runner with runnerId
  app.get("/runners/:runnerId", runners.findOne);

    // Update a Runner with runnerId
  app.put("/runners/:runnerId", runners.update);

    // Delete a Customer with customerId
    // app.delete("/customers/:customerId", customers.delete);

    // 
    // app.delete("/customers", customers.deleteAll);
};