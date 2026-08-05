const statisticsService =
    require("../services/statistics.services");


function getAttendanceStatistics(req, res) {

    const statistics =
        statisticsService.getAttendanceStatistics();

    res.json(statistics);

}


function getMonthlyWarnings(req, res) {

    const warnings =
        statisticsService.getMonthlyWarnings();

    res.json(warnings);

}


module.exports = {

    getAttendanceStatistics,

    getMonthlyWarnings

};