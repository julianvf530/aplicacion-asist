const ensayosRepository = require("../repositories/ensayos.repository");


function getAllEnsayos() {

    return ensayosRepository.getAllEnsayos();

}


function createEnsayo(ensayo) {

    if (!ensayo.fecha) {
        throw new Error("La fecha es obligatoria");
    }

    if (
        ensayo.tipo !== "Ensayo" &&
        ensayo.tipo !== "Evento"
    ) {
        throw new Error("Tipo de ensayo inválido");
    }

    if (
        !Array.isArray(ensayo.asistencia) ||
        ensayo.asistencia.length === 0
    ) {
        throw new Error("Debe existir al menos un miembro");
    }

    return ensayosRepository.createEnsayo(ensayo);

}

function deleteEnsayo(id) {

    return ensayosRepository.deleteEnsayo(id);

}


module.exports = {
    getAllEnsayos,
    createEnsayo,
    deleteEnsayo
};