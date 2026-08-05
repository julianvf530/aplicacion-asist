const statisticsRepository =
    require("../repositories/statistics.repository");


function getAttendanceStatistics() {

    return statisticsRepository.getAttendanceStatistics();

}


function getMonthlyWarnings() {

    return statisticsRepository.getMonthlyWarnings();

}


module.exports = {

    getAttendanceStatistics,

    getMonthlyWarnings

};