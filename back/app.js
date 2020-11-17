const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const bdService = require('./dbServices')
const DbServices = require('./dbServices')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// create
app.post('/insert', (request, response) => {

})

// read
app.get('/getAll', (request, response) => {
    // console.log('test')
    const db = DbServices.getDbServiceInstance()
    const result = db.getAllData()

    result
        .then(data => response.json({
            data: data
        }))
        .catch(err => console.log(err))
        // response.json({
        //     success: true
        // })
})

// update

// delete



app.listen(process.env.PORT, () => {
    console.log('app is running')
})