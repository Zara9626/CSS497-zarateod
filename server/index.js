const express = require ('express')

const mysql = require ('mysql')
const bodyparser = require ('body-parser');
var app = express();
app.use(bodyparser.json());

var connection = mysql.createConnection({
    host:"database-1.clv5mxwrehkl.us-west-2.rds.amazonaws.com",
    user:"admin",
    password:"zara9626",
    port: 3306,

});

connection.connect(function(err){
    if(err) {
        console.error('database connection failed' + err.stack);
        return ;
    }
    console.log('Connected to database.');
});


app.get('/properties', (request, response) => {
    // send sql command to fetch data 
    //send data to response 
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

  app.post('/properties', (request, response) => {
      // send sql command to store data 
      // send responce back if  data stored - 200 response 
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })


const port = process.env.PORT || 3000;
app.listen(port,()=>console.log('listening on port ${port}...'));






