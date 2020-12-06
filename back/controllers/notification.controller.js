const Notification = require("../models/notification.models.js");

exports.create = (req, res) => {
    console.log("req", req.body)
    let notification = new Notification(req.body)
    Notification.create(notification, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Delivery."
            });
        else res.send(data)

    });
}