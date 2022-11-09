// import + declare
const express = require("express");
const bodyParser = require("body-parser");
const sql = require("./node/db.js");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const router = require("./routes/routes");
const reportsController = require("./controllers/reportsController");

// setups
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use(router);

//routs
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Views/index.html"));
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "Views/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "Views/about.html"));
});

app.get("/Real-time-map", (req, res) => {
  res.sendFile(path.join(__dirname, "Views/Real-time-map.html"));
});

app.get("/Send-A-report", (req, res) => {
  res.sendFile(path.join(__dirname, "Views/Send-A-report.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "Views/services.html"));
});

app.get("/statistical-reports", (req, res) => {
  res.sendFile(path.join(__dirname, "Views/statistical-reports.html"));
});

app.listen(3000, () => {
  console.log(" Server is running on port 3000.");
});
