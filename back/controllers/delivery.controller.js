const Delivery = require("../models/delivery.models.js");


exports.delete = (req, res) => {
    console.log(("REQ", req.params))
    Delivery.deleteByRunner(req.params.runnerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found delivery with runnerId ${req.params.runnerId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving delivery with runnerId " + req.params.runnerId
                });
            }
        }
        else {

            res.send(data)

        }

    });
};
exports.create = (req, res) => {
    req.body.departmentsIds.forEach(department => {
        let delivery = new Delivery({
            idRunner: req.body.runnerId,
            idDepartment: department
        })
        Delivery.create(delivery, (err, newDeliveryData) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Delivery."
                });

        });
    }); res.send(newDeliveryData)
}