const db = require("../database/db");


function getStatistics() {

    const ensayosRealizados = db.prepare(`
        SELECT COUNT(*) AS total
        FROM ensayos
    `).get();


    const totalAsistencias = db.prepare(`
        SELECT COUNT(*) AS total
        FROM asistencia
        WHERE presente = 1
    `).get();


    const totalAusencias = db.prepare(`
        SELECT COUNT(*) AS total
        FROM asistencia
        WHERE presente = 0
    `).get();


    const mejorAsistencia = db.prepare(`
        SELECT
            m.nombre,
            COUNT(*) AS total
        FROM asistencia a
        JOIN members m
            ON a.member_id = m.id
        WHERE a.presente = 1
        GROUP BY m.id
        ORDER BY total DESC
        LIMIT 1
    `).get();


    const masAusencias = db.prepare(`
        SELECT
            m.nombre,
            COUNT(*) AS total
        FROM asistencia a
        JOIN members m
            ON a.member_id = m.id
        WHERE a.presente = 0
        GROUP BY m.id
        ORDER BY total DESC
        LIMIT 1
    `).get();


    const porcentajeAsistencia =

        (totalAsistencias.total + totalAusencias.total) === 0

            ? 0

            : Number(

                (
                    totalAsistencias.total * 100 /

                    (
                        totalAsistencias.total +
                        totalAusencias.total
                    )

                ).toFixed(1)

            );


    return {

        ensayosRealizados: ensayosRealizados.total,

        totalAsistencias: totalAsistencias.total,

        totalAusencias: totalAusencias.total,

        porcentajeAsistencia,

        mejorAsistencia: mejorAsistencia ?? null,

        masAusencias: masAusencias ?? null

    };

}


module.exports = {
    getStatistics
};