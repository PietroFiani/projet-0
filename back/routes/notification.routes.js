module.exports = app => {
    const notifications = require("../controllers/notification.controller.js");
    // Create a new Order
    app.post("/notification/add", notifications.create);
}