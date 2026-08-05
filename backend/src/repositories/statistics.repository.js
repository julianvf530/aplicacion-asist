const db = require("../database/db");


function getAttendanceStatistics() {

    const statistics = db.prepare(`
        SELECT

            members.id,
            members.numero,
            members.nombre,
            members.categoria,

            COUNT(asistencia.member_id) AS total,

            COALESCE(
                SUM(asistencia.presente),
                0
            ) AS presentes

        FROM members

        LEFT JOIN asistencia
            ON members.id = asistencia.member_id

        WHERE members.activo = 1

        GROUP BY members.id

        ORDER BY members.numero

    `).all();


    return statistics.map((member) => ({

        id: member.id,

        numero: member.numero,

        nombre: member.nombre,

        categoria: member.categoria,

        total: member.total,

        presentes: member.presentes,

        porcentaje:
            member.total === 0
                ? 0
                :
                Math.round(
                    (member.presentes / member.total) * 100
                )

    }));

}



function getMonthlyWarnings() {

    const statistics = db.prepare(`
        SELECT

            members.id,
            members.numero,
            members.nombre,
            members.categoria,

            COUNT(asistencia.member_id) AS total,

            COALESCE(
                SUM(asistencia.presente),
                0
            ) AS presentes

        FROM members

        LEFT JOIN asistencia

            ON members.id = asistencia.member_id

        LEFT JOIN ensayos

            ON asistencia.ensayo_id = ensayos.id


        WHERE members.activo = 1

        AND ensayos.fecha >= date('now','-1 month')


        GROUP BY members.id

    `).all();


    return statistics

        .map((member) => ({

            id: member.id,

            numero: member.numero,

            nombre: member.nombre,

            categoria: member.categoria,

            total: member.total,

            presentes: member.presentes,

            porcentaje:
                member.total === 0
                    ? 0
                    :
                    Math.round(
                        (member.presentes / member.total) * 100
                    )

        }))

        .filter(
            (member) =>
                member.porcentaje < 80
        );

}



module.exports = {

    getAttendanceStatistics,

    getMonthlyWarnings

};