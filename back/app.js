const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
var history = require('connect-history-api-fallback');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
// });
require("./routes/delivery.routes.js")(app);
require("./routes/customer.routes.js")(app);
require("./routes/runner.routes.js")(app);
require("./routes/addrCustomer.routes.js")(app);
require("./routes/department.routes.js")(app);
require("./routes/product.routes.js")(app);
require("./routes/category.routes.js")(app);

app.get('/', (req, res) => {
    res.sendFile('../views/Home.vue');
  });
app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`)
}).use(history())
