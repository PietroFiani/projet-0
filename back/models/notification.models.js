
const sql = require("./dbServices.js");

// constructor
const Notification = function (notification) {
    this.id_customer=notification.id_customer,
    this.head=notification.head,
    this.text=notification.text,
    this.read=notification.read
};

Notification.create = (newNotification, result) => {
    sql.query("INSERT INTO notification SET ?", newNotification, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created notification: ", { id: res.insertId, ...newNotification });
        result(null, { id: res.insertId, ...newNotification });
        return
    });
};

module.exports = Notification;