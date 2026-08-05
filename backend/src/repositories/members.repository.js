const db = require("../database/db");


function getAllMembers() {

    return db
        .prepare(`
            SELECT *
            FROM members
            WHERE activo = 1
            ORDER BY numero
        `)
        .all();

}


function createMember(member) {

    try {

        const result = db
            .prepare(`
                INSERT INTO members
                (
                    numero,
                    nombre,
                    categoria,
                    instrumento,
                    activo
                )
                VALUES (?, ?, ?, ?, ?)
            `)
            .run(
                member.numero,
                member.nombre,
                member.categoria,
                member.instrumento,
                1
            );

        return {
            id: result.lastInsertRowid,
            ...member
        };

    } catch (error) {

        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            throw new Error("Ya existe un miembro con ese número");
        }

        throw error;

    }

}


function updateMember(id, member) {

    try {

        db.prepare(`
            UPDATE members
            SET
                numero = ?,
                nombre = ?,
                categoria = ?,
                instrumento = ?,
                activo = 1
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

    } catch (error) {

        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            throw new Error("Ya existe un miembro con ese número");
        }

        throw error;

    }

}

function deleteMember(id) {

    db.prepare(`
        UPDATE members
        SET activo = 0
        WHERE id = ?
    `).run(id);

}


module.exports = {
    getAllMembers,
    createMember,
    updateMember,
    deleteMember
};