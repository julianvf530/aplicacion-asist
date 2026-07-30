const statisticsRepository =
    require("../repositories/statistics.repository");


function getStatistics() {

    return statisticsRepository.getStatistics();

}


module.exports = {
    getStatistics
};