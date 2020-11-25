
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost:8080'
});

connection.connect();

connection.query('SELECT * FROM delivery', function(err, rows, fields) {
});

connection.end();