const db = require("../database/db");


function getAllMembers() {

    return db
        .prepare(`
            SELECT *
            FROM members
            ORDER BY numero
        `)
        .all();

}


function createMember(member) {

    const result = db
        .prepare(`
            INSERT INTO members
            (numero, nombre, categoria, instrumento)
            VALUES (?, ?, ?, ?)
        `)
        .run(
            member.numero,
            member.nombre,
            member.categoria,
            member.instrumento
        );

    return {
        id: result.lastInsertRowid,
        ...member
    };

}


function updateMember(id, member) {

    db.prepare(`
        UPDATE members
        SET
            numero = ?,
            nombre = ?,
            categoria = ?,
            instrumento = ?
        WHERE id = ?
    `)
    .run(
        member.numero,
        member.nombre,
        member.categoria,
        member.instrumento,
        id
    );

    return {
        id,
        ...member
    };

}


function deleteMember(id) {

    db.prepare(`
        DELETE FROM asistencia
        WHERE member_id = ?
    `).run(id);

    db.prepare(`
        DELETE FROM members
        WHERE id = ?
    `).run(id);

}


module.exports = {
    getAllMembers,
    createMember,
    updateMember,
    deleteMember
};