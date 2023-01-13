
const express = require('express')
const cors = require('cors');
const mysql = require('mysql')
const bodyparser = require('body-parser');
const app = express();
const PORT = 8080;
var morgan = require('morgan');


const connection = mysql.createConnection({
  multipleStatements: false,
  host: "localhost",
  user: "root",
  password: "zara9626",
  database: "proppal"

});

module.exports = connection;

connection.connect(function (err) {
  if (err) {
    console.error('database connection failed' + err.stack);
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
  const sqlSelect = "SELECT property.propertyId,property.apartmentNum, property.address, " +
    "       property.bedrooms, property.sqFeet,lease.rent, " +
    "       DATE_FORMAT(lease.leaseStart, '%m/%d/%Y') AS leaseStart, " +
    "       DATE_FORMAT(lease.leaseEnd, '%m/%d/%Y') AS leaseEnd, " +
    "       lease.damage, resident.first, resident.last " +
    "FROM   property, lease, resident " +
    "WHERE  property.propertyId = lease.propertyId AND lease.leaseId = resident.leaseId";
  connection.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});

// get specific property address and apartment number
app.get("/property/get/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId;
  const propertyById = "SELECT * FROM property WHERE propertyId = ?";
  connection.query(propertyById, [propertyId], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(JSON.stringify(result))
  });
});


// getting specific property by leaseId
app.get("/lease/get/:propertyId" ,(req, res) => {
  const propertyId = req.params.propertyId;
  const propertyById = "SELECT lease.propertyId, property.propertyId, property.apartmentNum, " +
    "property.address FROM property,lease WHERE property.propertyId=lease.propertyId AND lease.leaseId = ?";
  connection.query(propertyById, [propertyId], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(JSON.stringify(result))
  });
});


// get specific property info
app.get("/property/get/info/:propertyId", (req, res) => {

  const propertyId = req.params.propertyId;
  const sqlId = "SELECT DISTINCT property.*, " +
    "incident.happened, incident.policeReportId, DATE_FORMAT(lease.leaseStart, '%m/%d/%Y') AS leaseStart," +
    "DATE_FORMAT(lease.leaseEnd, '%m/%d/%Y') AS leaseEnd, lease.rent, lease.damage, " +
    "resident.first, resident.last " +
    "FROM property, lease, resident, incident " +
    "WHERE property.propertyId = lease.propertyId AND lease.leaseId = resident.leaseId " +
    "AND property.propertyId = incident.propertyId AND property.propertyId = ?";
  connection.query(sqlId, [propertyId], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(JSON.stringify(result))
  });
});

// getting unoccupied properties
app.get("/property/empty/get", (req, res) => {
  const empty = "SELECT * FROM property WHERE propertyId NOT IN (SELECT propertyId FROM lease WHERE propertyId IS NOT NULL)";
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

  connection.query("INSERT INTO property (apartmentNum,address,bedrooms,sqFeet) VALUES (?,?,?,?)", [apartmentNum,
    address, bedrooms,
    sqFeet], (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
    });
});

// delete the particular property from the unoccupied properties
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

// Update lease
app.put("/property/put/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId;
  const rent = req.body.rent;
  const leaseStart = req.body.leaseStart;
  const leaseEnd = req.body.leaseEnd;
  const damage = req.body.damage;

  const q = "UPDATE lease SET rent =?,leaseStart = ?,leaseEnd = ?,damage = ? WHERE propertyId = ?";
  connection.query(q, [rent, leaseStart, leaseEnd, damage, propertyId], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
    res.redirect('/property/get')
  });
});


// list of all residents 
app.get("/resident/get/all" , (req, res) => {
  const full = "SELECT resident.residentId,resident.first,resident.last FROM resident ";
  connection.query(full, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});



//adding new lease to empty property
app.post("/lease/post/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId
  const leaseStart = req.body.leaseStart
  const leaseEnd = req.body.leaseEnd
  const rent = req.body.rent
  
  connection.query("INSERT INTO lease (leaseStart,leaseEnd,rent,propertyId) VALUES (?,?,?,?)", [leaseStart,
    leaseEnd,rent, propertyId],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
      res.redirect('/lease/get')
    });
});


//list of leases
app.get("/lease/get", (req, res) => {
  const sqlLease = "SELECT property.propertyId,lease.leaseId, DATE_FORMAT(lease.leaseStart, '%m/%d/%Y') AS leaseStart, " +
  "DATE_FORMAT(lease.leaseEnd, '%m/%d/%Y') AS leaseEnd, property.apartmentNum,property.address, " +
  "property.bedrooms,property.sqFeet FROM lease, property " +
  "WHERE property.propertyId = lease.propertyId AND leaseId NOT IN(SELECT leaseId from proppal.resident WHERE leaseId IS NOT NULL)";
  connection.query(sqlLease, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});

app.delete("/lease/delete/:leaseId", (req, res) => {
  const residentId = req.params.leaseId;
  connection.query("DELETE FROM resident WHERE leaseId= ?", leaseId, (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
  });
});


//adding new resident 
app.post("/resident/post/:leaseId", (req, res) => {
  const propertyId = req.params.propertyId
  const leaseId = req.params.leaseId
  const first = req.body.first
  const last = req.body.last
  const ssn = req.body.ssn
  const phone = req.body.phone
  const credit = req.body.credit
  const prevAdress = req.body.prevAdress
  const emp = req.body.emp
  const emer = req.body.emer
  const income = req.body.income

  connection.query("INSERT INTO resident (first,last,ssn,phone,credit,prevAdress,employerContact,emergencyContact,income,leaseId) " +
    "VALUES (?,?,?,?,?,?,?,?,?,?)", [first,
    last, ssn, phone, credit, prevAdress, emp, emer, income,leaseId],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
    });
  });

//list of residents
app.get("/resident", (req, res) => {
  const sqlResident = "SELECT resident.*, property.apartmentNum FROM resident,property,lease WHERE  property.propertyId = lease.propertyId AND lease.leaseId = resident.leaseId";
  connection.query(sqlResident, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});


// getting particular resident in to particular lease
app.get("/resident/get/:propertyId", (req, res) => {
  const residentId = req.params.residentId;
  const leaseId = req.params.leaseId;
  const propertyId = req.params.propertyId;
  const residentById = "SELECT resident.leaseId,resident.residentId,resident.first,resident.last,resident.ssn,resident.phone,resident.credit,resident.prevAdress, " +
    "resident.employerContact,resident.emergencyContact,resident.income " +
    "FROM resident ,property,lease  WHERE  property.propertyId = lease.propertyId AND lease.leaseId = resident.leaseId AND property.propertyId = ?";
  connection.query(residentById, [propertyId, residentId], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(JSON.stringify(result))
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
  connection.query(q, [phone, employerContact, emergencyContact, income, residentId], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
    res.redirect('/resident')
  });
});

//incidents list
app.get("/incident/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId

  const incident = "SELECT  incident.incidentId,incident.propertyId, DATE_FORMAT(incident.eventDate,'%m/%d/%Y') AS eventDate,incident.happened, " +
    "property.address, property.apartmentNum, " +
    "  DATE_FORMAT(incident.policeReportDate, '%m/%d/%Y')AS policeReportDate,incident.officerName, " +
    "incident.policeReportId FROM incident, property " +
    "WHERE property.propertyId=incident.propertyId ";

  connection.query(incident,[propertyId],(err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});

// incident insert to particular property
app.post("/incident/post/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId

  const eventDate = req.body.eventDate
  const happened = req.body.happened
  const officerName = req.body.officerName
  const policeReportDate = req.body.policeReportDate
  const policeReportId = req.body.policeReportId

  connection.query("INSERT INTO incident(eventDate,happened,officerName,policeReportDate,policeReportId,propertyId) " +
    "VALUES (?,?,?,?,?,?) ", [eventDate, happened, officerName, policeReportDate, policeReportId, propertyId],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
      res.redirect('/property/get')
    });
});

// get incident of particular property
app.get("/incident/get/:propertyId/:incidentId", (req, res) => {
  const propertyId = req.params.propertyId;
  const incidentId = req.params.incidentId;

  const selectInc = "SELECT incident.incidentId,DATE_FORMAT(incident.eventDate,'%m/%d/%Y') AS eventDate, incident.happened, " +
    "DATE_FORMAT(incident.policeReportDate ,'%m/%d/%Y') AS policeReportDate, incident.officerName,incident.policeReportId " +
    " FROM incident WHERE propertyId = ? ";
  connection.query(selectInc, [propertyId, incidentId], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(JSON.stringify(result))
  });
});


// update particular property incident
app.put("/incident/put/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId;

  const happened = req.body.happened;
  const officerName = req.body.officerName;
  const policeReportDate = req.body.policeReportDate;
  const policeReportId = req.body.policeReportId;

  const updateInc = "UPDATE incident SET happened =?,officerName=?,policeReportDate=?,policeReportId= ? WHERE propertyId = ?";
  connection.query(updateInc, [happened, officerName, policeReportDate, policeReportId, propertyId], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
    res.redirect('/property/get')
  });
});


//get maintenance list 
app.get("/maintenance", (req, res) => {
  const maintenance = "SELECT maintenance.eventId,DATE_FORMAT(maintenance.mainDate ,'%m/%d/%Y') AS mainDate , maintenance.description, " +
    "DATE_FORMAT(incident.eventDate ,'%m/%d/%Y') AS eventDate ," +
    " incident.happened,maintenance.charge, maintenance.contractorName " +
    "FROM maintenance,incident " +
    "WHERE maintenance.incidentId = incident.incidentId ";
  connection.query(maintenance, (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(result);
  });
});

// get the maintenace record of particular property
app.get("/maintenance/get/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId;

  const maintenanceById = "SELECT DATE_FORMAT(maintenance.mainDate,'%m/%d/%Y') AS mainDate,maintenance.description ," +
    "DATE_FORMAT(incident.eventDate,'%m/%d/%Y') AS eventDate, incident.happened, maintenance.charge," +
    "maintenance.contractorName FROM maintenance, incident WHERE maintenance.incidentId = incident.incidentId " +
    "AND incident.propertyId = ? ";
  connection.query(maintenanceById, [propertyId], (err, result) => {

    if (err) {
      console.log(err)
    }
    res.send(JSON.stringify(result))
  });
});

// addding maintenance according to the incidentId to particular property
app.post("/maintenance/post/:propertyId/:incidentId", (req, res) => {
  const propertyId = req.params.propertyId
  const incidentId = req.params.incidentId
  const mainDate = req.body.mainDate
  const description = req.body.description
  const charge = req.body.charge
  const contractorName = req.body.contractorName


  connection.query("INSERT INTO maintenance (mainDate,description,charge,contractorName,incidentId) VALUES (?,?,?,?,?)", [mainDate,
    description, charge, contractorName, propertyId, incidentId],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
    });
});

// update particular maintenance
app.put("/maintenance/put/:eventId", (req, res) => {
  const eventId = req.params.eventId;

  const description = req.body.description;
  const charge = req.body.charge;

  const updateMain = "UPDATE maintenance SET description =?,charge=? WHERE eventId =? ";
  connection.query(updateMain, [description, charge, eventId], (err, result) => {
    if (err) {
      console.log(err)
    }
    console.log(result)
    res.redirect('/maintenance')
  });
});


// show the list of all payments
app.get("/payment", (req, res) => {
  const payment = "SELECT property.propertyId,property.apartmentNum,property.address,payment.amount," +
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


// insert the payment to particular property
app.post("/payment/post/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId
  const amount = req.body.amount
  const receiptNum = req.body.receiptNum
  const paymentDate = req.body.paymentDate


  connection.query("INSERT INTO payment (amount,receiptNum,paymentDate,propertyId) VALUES (?,?,?,?)", [amount,
    receiptNum, paymentDate, propertyId],
    (err, result) => {
      if (err) {
        console.log(err)
      }
      console.log(result)
      res.redirect('/payment')
    });
});

//calculate the total of the paid amount of specfic property 
app.get("/payment/get/total/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId;
  const totalCal = "SELECT SUM(payment.amount) AS totalAmount FROM payment WHERE propertyId = ?";
  connection.query(totalCal, [propertyId], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(JSON.stringify(result))
  });
});


// show the payment history of particular property
app.get("/payment/get/:propertyId", (req, res) => {
  const propertyId = req.params.propertyId;
  const paymentById = "SELECT payment.amount,payment.receiptNum, " +
    "DATE_FORMAT(payment.paymentDate,'%m/%d/%Y') AS paymentDate FROM payment WHERE propertyId = ?";
  connection.query(paymentById, [propertyId], (err, result) => {
    if (err) {
      console.log(err)
    }
    res.send(JSON.stringify(result))
  });
});


app.listen(PORT, () => {
  console.log('running on port', PORT);
});
