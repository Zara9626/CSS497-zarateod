
const express = require('express')
const cors = require('cors');
const mysql = require('mysql')
const bodyparser = require('body-parser');
const app = express();
const PORT = 8080;
var morgan = require('morgan');


const connection = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "zara9626",
  database: "proppal"

});

module.exports = connection;

connection.connect(function (err) {
  if (err) {
    console.error('database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.use(morgan('combined'))
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  next();
});


//occupied properties list 
app.get("/property/get", (req, res) => {
  const sqlSelect = "SELECT property.apartmentNum, property.address, " +
    "       property.bedrooms, property.sqFeet, property.rent, " +
    "       DATE_FORMAT(property.leaseStart, '%m/%d/%Y') AS leaseStart, " +
    "       DATE_FORMAT(property.leaseEnd, '%m/%d/%Y') AS leaseEnd, " +
    "       property.damage, resident.first, resident.last " +
    "FROM   resident, property " +
    "WHERE  resident.propertyId=property.propertyId";
  connection.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});

// getting unoccupied properties
app.get("/property/empty/get", (req, res) => {
  const empty = "SELECT * FROM property ";
  connection.query(empty, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});


// adding new unoccupied properties to the list of the properties 
app.post("/property/post", (req, res) => {
  const apartmentNum = req.body.apartmentNum
  const address = req.body.address
  const bedrooms = req.body.bedrooms
  const sqFeet = req.body.sqFeet
  const rent = req.body.rent
  const leaseStart = req.body.leaseStart
  const leaseEnd = req.body.leaseEnd

  connection.query("INSERT INTO property (apartmentNum,address,bedrooms,sqFeet,rent,leaseStart,leaseEnd) VALUES (?,?,?,?,?,?,?)", [apartmentNum,
    address, bedrooms,
    sqFeet, rent, leaseStart, leaseEnd], (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
    });
});

// delete the particular property
app.delete("/property/delete/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId;

  const propDelete = "DELETE FROM property WHERE propertyId = ?";
  connection.query(propDelete, propertyId, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });
});


//need fixing !!!!!!!!!!!!!!!!!!!!
// Update the property
app.put("/property/put/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId;
  const rent = req.body.rent;
  const leaseStart = req.body.leaseStart;
  const leaseEnd = req.body.leaseEnd;
  const damage = req.body.damage;

  const q = "UPDATE property SET rent =?,leaseStart =?,leaseEnd=?,damage = ? WHERE propertyId = ?";
  connection.query(q, [rent, leaseStart, leaseEnd, damage,propertyId], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });
});

// need fixing 
//adding new resident 
app.post("/resident/post/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId
  const first = req.body.first
  const last = req.body.last
  const ssn = req.body.ssn
  const phone = req.body.phone
  const credit = req.body.credit
  const prevAdress = req.body.prevAdress
  const emp = req.body.emp
  const emer = req.body.emer
  const income = req.body.income

  connection.query("INSERT INTO resident (first,last,ssn,phone,credit,prevAdress,employerContact,emergencyContact,income) " +
                   "VALUES (?,?,?,?,?,?,?,?,?) WHERE propertyId = ? ",[first,
    last, ssn, phone, credit, prevAdress, emp, emer, income],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
    });
});


//list of residents
app.get("/resident", (req, res) => {
  const sqlResident = "SELECT * FROM resident";
  connection.query(sqlResident, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});



//delete particular resident
app.delete("/resident/delete/:residentId", (req, res) => {
  const residentId = req.params.residentId;
  connection.query("DELETE FROM resident WHERE residentId= ?", residentId, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });
});

//update resident 
app.put("/resident/put/:residentId", (req, res) => {
  const residentId = req.params.residentId;
  const phone = req.body.phone;
  const employerContact = req.body.employerContact;
  const emergencyContact = req.body.emergencyContact;
  const income = req.body.income;

  const q = "UPDATE resident SET phone =?,employerContact=?,emergencyContact=?,income = ? WHERE residentId = ?";
  connection.query(q, [phone,employerContact,emergencyContact,income,residentId], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });
});

//incidents list
app.get("/incident", (req, res) => {
  const incident = "SELECT DATE_FORMAT(incident.eventDate,'%m/%d/%Y') AS eventDate,incident.desc, " +
    "property.address, property.apartmentNum, " +
    "  DATE_FORMAT(incident.policeReportDate, '%m/%d/%Y')AS policeReportDate,incident.officerName, " +
    "incident.policeReportId FROM incident, property " +
    "WHERE property.propertyId=incident.propertyId ";

  connection.query(incident, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});

// incident insert
app.post("/incident/insert", (req, res) => {
  const eventDate = req.body.eventDate
  const propertyId = req.body.propertyId
  const description = req.body.description
  const officerName = req.body.officerName
  const policeReportDate = req.body.policeReportDate
  const policeReportId = req.body.policeReportId


  connection.query("INSERT INTO incident(eventDate,description,officerName,policeReportDate,policeReportId) ," +
    "VALUES (?,?,?,'','')", [eventDate, propertyId, description, officerName, policeReportDate, policeReportId],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
    });
});


app.get("/incident/get/:id", (req, res) => {
  const propertyId = req.params.propertyId;

  const incidentById = "SELECT * FROM incident WHERE propertyId = ?";
  connection.query(incidentById, [propertyId], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });
});




















//get maintenance list 
app.get("/maintenance", (req, res) => {
  const maintenance = "SELECT DATE_FORMAT(maintenance.mainDate ,'%m/%d/%Y') AS mainDate , maintenance.description, " +
    "DATE_FORMAT(incident.eventDate ,'%m/%d/%Y') AS eventDate ," +
    " incident.desc,maintenance.charge, maintenance.contractorName " +
    "FROM maintenance,incident " +
    "WHERE maintenance.incidentId = incident.incidentId ";
  connection.query(maintenance, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});



app.post("/maintenance/insert", (req, res) => {
  const mainDate = req.body.mainDate
  const description = req.body.description
  const charge = req.body.charge
  const contractorName = req.body.contractorName


  connection.query("INSERT INTO maintenance (mainDate,description,charge,contractorName) VALUES (?,?,?,?)", [mainDate,
    description, charge, contractorName],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
    });
});


// get maintenance by id of incident 
app.get("/maintenance/:event_id" ,(req,res)=>{
  const mainById = "SELECT "

});










app.get("/payment", (req, res) => {
  const payment = "SELECT property.apartmentNum,property.address,payment.amount," +
    "payment.receiptNum, DATE_FORMAT(payment.paymentDate , '%m/%d/%Y') AS paymentDate " +
    "FROM property, payment " +
    "WHERE property.propertyId = payment.propertyId";
  connection.query(payment, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});

app.post("/payment/insert", (req, res) => {
  const amount = req.body.amount
  const receiptNum = req.body.receiptNum
  const paymentDate = req.body.paymentDate


  connection.query("INSERT INTO payment (amount,receiptNum,paymentDate) VALUES (?,?,?)", [amount,
    receiptNum, paymentDate],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
    });
});



app.listen(PORT, () => {
  console.log('running on port:' , PORT);
});
