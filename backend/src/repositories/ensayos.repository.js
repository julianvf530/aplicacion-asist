const db = require("../database/db");


function getAllEnsayos() {

    const ensayos = db.prepare(`
        SELECT
            ensayos.id,
            ensayos.fecha,
            ensayos.tipo
        FROM ensayos
        ORDER BY ensayos.fecha DESC
    `).all();


    const getAttendance = db.prepare(`
        SELECT
            asistencia.member_id AS memberId,
            asistencia.presente
        FROM asistencia
        WHERE asistencia.ensayo_id = ?
    `);


    return ensayos.map((ensayo) => ({

        ...ensayo,

        asistencia: getAttendance.all(ensayo.id).map((attendance) => ({

            memberId: attendance.memberId,

            presente: Boolean(attendance.presente)

        }))

    }));

}


function createEnsayo(ensayo) {

    const transaction = db.transaction(() => {

        // Crear ensayo
        const result = db.prepare(`
            INSERT INTO ensayos
            (fecha, tipo)
            VALUES (?, ?)
        `).run(
            ensayo.fecha,
            ensayo.tipo
        );

        const ensayoId = result.lastInsertRowid;

        // Preparar INSERT de asistencia
        const insertAttendance = db.prepare(`
            INSERT INTO asistencia
            (ensayo_id, member_id, presente)
            VALUES (?, ?, ?)
        `);

        const activeMembers = db.prepare(`
            SELECT id
            FROM members
            WHERE activo = 1
        `).all();


        const activeIds = new Set(
            activeMembers.map(
                (member) => member.id
            )
        );


        // Insertar solo miembros activos
        ensayo.asistencia.forEach((attendance) => {

            if (!activeIds.has(attendance.memberId)) {
                return;
            }


            insertAttendance.run(
                ensayoId,
                attendance.memberId,
                attendance.presente ? 1 : 0
            );

        });

        return {
            id: ensayoId,
            fecha: ensayo.fecha,
            tipo: ensayo.tipo,
            asistencia: ensayo.asistencia
        };

    });

    return transaction();

}

function deleteEnsayo(id) {

    const deleteEnsayoTransaction = db.transaction(() => {

        db.prepare(`
            DELETE FROM asistencia
            WHERE ensayo_id = ?
        `).run(id);


        db.prepare(`
            DELETE FROM ensayos
            WHERE id = ?
        `).run(id);

    });


    deleteEnsayoTransaction();

}

module.exports = {
    getAllEnsayos,
    createEnsayo,
    deleteEnsayo
};