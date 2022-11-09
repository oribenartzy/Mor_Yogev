const SQL = require("../node/db");
const path = require("path");
const csv = require("csvtojson");
///create DB:

// create DB "mor"

// const CreateDB= (req, res) => {
//   var Q1 =
//     "CREATE DATABASE IF NOT EXISTS mor"
//   SQL.query(Q1, (err, mySQLres) => {
//     if (err) {
//       console.log("error ", err);
//       res.status(400).send({ message: "error in creating DB" });
//       return;
//     }
//     console.log("created DB mor");
//     res.send("created DB mor");
//     return;
//   });
// };

//Create Table
const CreateTable = (req, res) => {
  var Q1 =
    "CREATE TABLE reports (serialNumber int(11),reportDT datetime NOT NULL DEFAULT current_timestamp(),addres varchar(500) NOT NULL,lat varchar(30) NOT NULL,lng varchar(30) NOT NULL,reportDetails varchar(1000) NOT NULL,reportType varchar(1000) NOT NULL)";
  SQL.query(Q1, (err, mySQLres) => {
    if (err) {
      console.log("error ", err);
      res.status(400).send({ message: "error in creating table" });
      return;
    }
    console.log("created table");
    res.send("table created");
    return;
  });
};
// add primery Key
const alterTable_reports_primeryKey = (req, res) => {
  var Q2 = "ALTER TABLE reports ADD PRIMARY KEY (`serialNumber`)";
  SQL.query(Q2, (err, mySQLres) => {
    if (err) {
      console.log("error ", err);
      res.status(400).send({ message: "error in ALTER TABLE table" });
      return;
    }
    console.log("ADD PRIMARY KEY");
    res.send("ADD PRIMARY KEY");
    return;
  });
};
// add AUTO_INCREMENT
const alterTable_reports_AUTO_INCREMENT = (req, res) => {
  var Q2 =
    "ALTER TABLE reports MODIFY serialNumber int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1";
  SQL.query(Q2, (err, mySQLres) => {
    if (err) {
      console.log("error ", err);
      res
        .status(400)
        .send({ message: "error in ALTER TABLE AUTO_INCREMENT table" });
      return;
    }
    console.log("ADD AUTO_INCREMENT ");
    res.send("ADD AUTO_INCREMENT ");
    return;
  });
};

//Insert data from csvFile
const InsertReportFromCSVfile = (req, res) => {
  var Q3 = "INSERT INTO reports SET ?";
  const csvFilePath = path.join(__dirname, "../node/data.csv");
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      jsonObj.forEach((element) => {
        var newReport = {
          addres: element.addres,
          lat: element.lat,
          lng: element.lng,
          reportDetails: element.reportDetails,
          reportType: element.reportType,
        };
        console.log(newReport);
        SQL.query(Q3, newReport, (err, mysqlres) => {
          if (err) {
            console.log("error in inserting data", err);
          }
          console.log("created row sucssefuly csv ");
        });
      });
    });
  res.send("data read");
};

//REPORTS CONTROLLES:
//query 1
const InsertReportFromClient = (req, res) => {
  var query = "INSERT INTO Reports SET ?";
  var newReport = {
    addres: req.body.addres,
    lat: req.body.lat,
    lng: req.body.lng,
    reportDetails: req.body.reportDetails,
    reportType: req.body.reportType,
  };
  SQL.query(query, newReport, (err, mysqlres) => {
    if (err) {
      console.log("error in inserting data", err);
    }
    console.log("created row sucssefuly from client ");
    console.log(newReport);
  });
};
//query 2
const GetReportsToMap = (req, res) => {
  SQL.query("SELECT * FROM reports", function (err, rows) {
    if (err) {
      res.status(400).send({
        message: err.message || "Some error occurred",
      });
    } else {
      res.status(200).send({
        reports: rows,
      });
    }
  });
};
//query 3
const GetReportsBySearch = (req, res) => {
  const query =
    "SELECT * FROM reports WHERE lat between " +
    req.body.latMin +
    " and " +
    req.body.latMax +
    " AND lng between " +
    req.body.lngMin +
    " and " +
    req.body.lngMax;

  SQL.query(query, function (err, rows) {
    if (err) {
      res.status(400).send({
        message: err.message || "Some error occurred",
      });
    } else {
      res.status(200).send({
        reports: rows,
      });
    }
  });
};

//query 4
const DropTable = (req, res) => {
  var Q4 = "DROP TABLE reports";
  SQL.query(Q4, (err, mySQLres) => {
    if (err) {
      console.log("error in droping table ", err);
      res.status(400).send({ message: "error om dropping table" + err });
      return;
    }
    console.log("table drpped");
    res.send("table drpped");
    return;
  });
};

module.exports = {
  //Create DB
  CreateTable,
  alterTable_reports_primeryKey,
  alterTable_reports_AUTO_INCREMENT,
  InsertReportFromCSVfile,
  DropTable,
  CreateDB,
  // other controles
  InsertReportFromClient,
  GetReportsToMap,
  GetReportsBySearch,
};
