
const express = require ('express')
const cors = require('cors');
const mysql = require ('mysql')
const bodyparser = require ('body-parser');
const app = express();
const PORT = 8080;
var morgan = require('morgan');


const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"zara9626",
    database:"proppal"

});

module.exports = connection;

connection.connect(function(err){
    if(err) {
        console.error('database connection failed' + err.stack);
        return ;
    }
    console.log('Connected to database.');
});

app.use(morgan('combined'))
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended : true}))




// read the existing properties list 
app.get("/property/get", (req, res) => {
  const sqlSelect = "SELECT property.apartmentNum, property.address, " +
                    "       property.bedrooms, property.sqFeet, property.rent, " +
                    "       DATE_FORMAT(property.leaseStart, '%m/%d/%Y') AS leaseStart, " +
                    "       DATE_FORMAT(property.leaseEnd, '%m/%d/%Y') AS leaseEnd, " +
                    "       property.damage, resident.first, resident.last " +
                    "FROM   resident, property " +
                    "WHERE  resident.propertyId=property.propertyId";
connection.query(sqlSelect,(err,result) => {
    if(err) {
      console.log(err)
    }
    res.send(result);
  });
});


// adding new properties to the list of the properties 

app.post("/property/insert", (req, res) => {
  const apnum = req.body.apartment_num
  const address = req.body.address
  const bedrooms = req.body.bedrooms
  const sqfeet = req.body.square_feet
  const monthRent = req.body.monthly_rent
  const leaseStart = req.body.leaseStart
  const leaseEnd = req.body.leaseEnd
  const damage = req.body.damage

  connection.query("INSERT INTO property (apartmentNum,address,bedrooms,sqFeet,rent,leaseStart,leaseEnd,damage) VALUES (?,?,?,?,?,?,?,?)",[apnum,
    address,bedrooms,
    sqfeet,monthRent,leaseStart,leaseEnd,damage],(err,result) => {
    if(err) {
      console.log(err)
    }
    console.log(result)
    });
});





// delete the particular property
app.delete ("/api/delete/:id", (req,res) =>{
  const propertyId = req.params.id;
  connection.query("DELETE FROM property WHERE propertyId= ?", [propertyId], (err, result) =>{
    if(err) {
      console.log(err)
    }
    console.log(result)
    });
});


  // Update the property
  
app.put ("/property/get/:id", (req,res) =>{
  const propertyId = req.params.id;

  const q = "UPDATE property SET 'apartmentNum' =? ,'address' = ?,'bedrooms' = ?,'sqFeet' =?,'rent' =?,'leaseStart =?','leaseEnd=?','damage' = ? WHERE propertyId=?";
  const values = [
    req.body.apartmentNum,
    req.body.address,
    req.body.bedrooms,
    req.body.sqFeet,
    req.body.rent,
    req.body.leaseStart,
    req.body.leaseEnd,
    req.body.damage,
    ];
  connection.query(q,[... values,propertyId], (err,data) => {
    if(err) {
    console.log(err)
  }
  console.log(result)
  });
});


//adding new resident 
app.post("/resident/add",(req,res) => {
  const first = req.body.first
  const last = req.body.last
  const ssn = req.body.ssn
  const phone = req.body.phone
  const credit = req.body.credit
  const prevAdress = req.body.prevAdress
  const emp = req.body.emp
  const emer = req.body.emer
  const income = req.body.income

  connection.query("INSERT INTO resident (first,last,ssn,phone,credit,prevAdress,employerContact,emergencyContact,income) VALUES (?,?,?,?,?,?,?,?,?,?)",[first,
    last,ssn,phone,credit,prevAdress,emp,emer,income],
    (err,result) => {
    if(err) {
      console.log(err)
    }
    console.log(result)
    });
});


//list of residents
app.get("/resident",(req,res) => {
  const sqlResident = "SELECT * FROM resident";
  connection.query(sqlResident,(err,result) => {
    if(err) {
      console.log(err)
    }
    res.send(result);
  });
});



//delete particular resident
app.delete ("/deleteResident/:id", (req,res) =>{
  const residentId = req.params.id;
  connection.query("DELETE FROM property WHERE residentId= ?", [residentId], (err, result) =>{
    if(err) {
      console.log(err)
    }
    console.log(result)
    });
});


//dropdown menu with for selection from the list of properties

app.get("/select/dropdown",(req,res) =>{
  const dropdown = "SELECT property.propertyId AS selectionId,CONCAT(property.address,' Apt. ',property.apartmentNum)" +
                    "AS selectionLabel FROM property ORDER BY property.address, property.apartmentNum";
  connection.query(dropdown,(err,result) =>{
    if(err) {
      console.log(err)
    }
    res.send(result);
  });
});

//incidents list
app.get ("/incident", (req,res)=> {
  const incident = "SELECT DATE_FORMAT(incident.eventDate,'%m/%d/%Y') AS eventDate,incident.description, " +
                       "  property.address, property.apartmentNum, " +
                       "  DATE_FORMAT(police.reportDate, '%m/%d/%Y')AS reportDate,police.officer,police.reportDesc " +
                       "FROM incident, property, police " +
                       "WHERE property.propertyId=incident.propertyId "+ 
                       "AND incident.policeId = police.reportId";

connection.query(incident,(err,result) =>{
  if(err) {
    console.log(err)
  }
  res.send(result);
});
});

app.post("/incident/insert",(req,res) => {




  connection.query("BEGIN;INSERT INTO incident(")

})



//get maintenance list 
app.get("/maintenance" ,(req,res) =>{
  const maintenance = "SELECT maintenance.mainDate,maintenance.description, " +
                      "DATE_FORMAT(incident.eventDate ,'%m/%d/%Y') AS eventDate ," +
                      " incident.description, payment.amount, contractor.name " +
                      "FROM maintenance,incident,payment,contractor " + 
                      "WHERE "




})











 

app.listen(PORT,()=> {
  console.log('running on port , ${PORT}');
});
  