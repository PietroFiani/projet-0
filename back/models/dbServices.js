const mysql = require('mysql')
const dotenv = require('dotenv')
let instance = null
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT

})

connection.connect((error) => {
    if (error) {
        console.log(error.message)
    }
     console.log('db ' + connection.state)
})

class DbServices {
    static getDbServiceInstance() {
        return instance ? instance : new DbServices()
    }
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM test;"

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })

            console.log(response)
            return response

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = DbServices
module.exports = connection;