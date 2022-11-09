const express = require("express");
const reportsController = require("../controllers/reportsController");
const router = express.Router();

//create DB routers:
// 1. localhost:3000/CreateTable
// 2. localhost:3000/alterTable_reports_primeryKey
// 3. localhost:3000/alterTable_reports_AUTO_INCREMENT
// 4. localhost:3000/InsertReportsFromCSVfile
// 5. localhost:3000
//router.route("/CreateDB").get(reportsController.CreateDB);

router.route("/CreateTable").get(reportsController.CreateTable);
router
  .route("/alterTable_reports_primeryKey")
  .get(reportsController.alterTable_reports_primeryKey);
router
  .route("/alterTable_reports_AUTO_INCREMENT")
  .get(reportsController.alterTable_reports_AUTO_INCREMENT);

router
  .route("/InsertReportsFromCSVfile")
  .get(reportsController.InsertReportFromCSVfile);

router.route("/DropTable").get(reportsController.DropTable);

//___________________________________________________________________________________________________________________

// app routers:
router.route("/sendReport").post(reportsController.InsertReportFromClient);

router.route("/getReportsToMap").get(reportsController.GetReportsToMap);

router.route("/getReportsBySearch").post(reportsController.GetReportsBySearch);

module.exports = router;
