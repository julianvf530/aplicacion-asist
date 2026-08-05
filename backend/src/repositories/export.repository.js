const db = require("../database/db");

function getEnsayoForExport(id) {

    return db.prepare(`
        SELECT
            members.numero,
            members.nombre,
            asistencia.presente
        FROM asistencia

        INNER JOIN members
            ON members.id = asistencia.member_id

        WHERE asistencia.ensayo_id = ?

        ORDER BY members.numero ASC
    `).all(id);

}

module.exports = {
    getEnsayoForExport
};