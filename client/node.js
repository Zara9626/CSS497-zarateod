
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'database-1.clv5mxwrehkl.us-west-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'Teodor9626',
  database : 'my_db'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();