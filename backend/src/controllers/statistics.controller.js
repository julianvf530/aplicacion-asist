const statisticsService =
    require("../services/statistics.services");


function getStatistics(req, res) {

    const statistics =
        statisticsService.getStatistics();


    res.json(statistics);

}


module.exports = {
    getStatistics
};