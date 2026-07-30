const ensayosService = require("../services/ensayos.services");


function getAllEnsayos(req, res) {

    const ensayos = ensayosService.getAllEnsayos();

    res.json(ensayos);

}


function createEnsayo(req, res) {

    const ensayo = ensayosService.createEnsayo(req.body);

    res.status(201).json(ensayo);

}

function deleteEnsayo(req, res) {

    const id = Number(req.params.id);

    ensayosService.deleteEnsayo(id);

    res.json({
        message: "Ensayo eliminado"
    });

}

module.exports = {
    getAllEnsayos,
    createEnsayo,
    deleteEnsayo
};