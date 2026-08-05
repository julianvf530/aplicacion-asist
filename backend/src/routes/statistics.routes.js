const express = require("express");

const router = express.Router();

const statisticsController =
    require("../controllers/statistics.controller");


router.get(
    "/attendance",
    statisticsController.getAttendanceStatistics
);


router.get(
    "/warnings",
    statisticsController.getMonthlyWarnings
);


module.exports = router;