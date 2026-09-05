const db = require("../database/db");

// ======================================================
// OBTENER TODOS LOS MIEMBROS ACTIVOS
// ======================================================

function getAllMembers() {
    return db.prepare(`
        SELECT *
        FROM members
        WHERE activo = 1
        ORDER BY numero ASC
    `).all();
}


// ======================================================
// OBTENER MIEMBRO POR ID
// ======================================================

function getMemberById(id) {
    return db.prepare(`
        SELECT *
        FROM members
        WHERE id = ?
    `).get(id);
}


// ======================================================
// CREAR MIEMBRO
// ======================================================

function createMember(member) {

    const transaction = db.transaction(() => {

        // Miembros que tienen que desplazarse una posición
        const membersToMove = db.prepare(`
            SELECT id, numero
            FROM members
            WHERE activo = 1
              AND numero >= ?
            ORDER BY numero DESC
        `).all(member.numero);

        // --------------------------------------------------
        // PASO 1
        // Los ponemos temporalmente en números negativos
        // para evitar conflictos con UNIQUE(numero)
        // --------------------------------------------------

        const moveToTemporary = db.prepare(`
            UPDATE members
            SET numero = ?
            WHERE id = ?
        `);

        for (const currentMember of membersToMove) {

            moveToTemporary.run(
                -1000000 - currentMember.id,
                currentMember.id
            );

        }

        // --------------------------------------------------
        // PASO 2
        // Desplazamos +1
        // --------------------------------------------------

        const moveToNewPosition = db.prepare(`
            UPDATE members
            SET numero = ?
            WHERE id = ?
        `);

        for (const currentMember of membersToMove) {

            moveToNewPosition.run(
                currentMember.numero + 1,
                currentMember.id
            );

        }

        // --------------------------------------------------
        // PASO 3
        // Insertamos el nuevo miembro
        // --------------------------------------------------

        const result = db.prepare(`
            INSERT INTO members (
                nombre,
                categoria,
                instrumento,
                numero,
                activo
            )
            VALUES (?, ?, ?, ?, 1)
        `).run(
            member.nombre,
            member.categoria,
            member.instrumento,
            member.numero
        );

        // IMPORTANTE:
        // Devolvemos el miembro completo, no el resultado
        // interno de SQLite.
        return {
            id: Number(result.lastInsertRowid),
            nombre: member.nombre,
            categoria: member.categoria,
            instrumento: member.instrumento,
            numero: member.numero,
            activo: 1
        };
    });

    return transaction();
}


// ======================================================
// ACTUALIZAR MIEMBRO
// ======================================================

function updateMember(id, member) {

    const transaction = db.transaction(() => {

        const currentMember = getMemberById(id);

        if (!currentMember) {
            throw new Error("Miembro no encontrado");
        }

        const oldNumero = currentMember.numero;
        const newNumero = member.numero;

        // ==================================================
        // MISMA POSICIÓN
        // ==================================================

        if (oldNumero === newNumero) {

            db.prepare(`
                UPDATE members
                SET
                    nombre = ?,
                    categoria = ?,
                    instrumento = ?
                WHERE id = ?
            `).run(
                member.nombre,
                member.categoria,
                member.instrumento,
                id
            );

            return {
                id,
                nombre: member.nombre,
                categoria: member.categoria,
                instrumento: member.instrumento,
                numero: newNumero,
                activo: 1
            };
        }

        // ==================================================
        // PRIMERO SACAMOS AL MIEMBRO QUE ESTAMOS MOVIENDO
        // A UNA POSICIÓN TEMPORAL
        // ==================================================

        db.prepare(`
            UPDATE members
            SET numero = ?
            WHERE id = ?
        `).run(
            -1000000 - id,
            id
        );

        // ==================================================
        // MOVER HACIA ARRIBA
        //
        // Ejemplo:
        //
        // 30
        // 31
        // 32
        // 33
        //
        // mover 33 -> 30
        //
        // resultado:
        //
        // 30 -> 31
        // 31 -> 32
        // 32 -> 33
        // 33 -> 30
        // ==================================================

        if (newNumero < oldNumero) {

            const membersToMove = db.prepare(`
                SELECT id, numero
                FROM members
                WHERE activo = 1
                  AND numero >= ?
                  AND numero < ?
                ORDER BY numero DESC
            `).all(
                newNumero,
                oldNumero
            );

            // Temporal
            const moveToTemporary = db.prepare(`
                UPDATE members
                SET numero = ?
                WHERE id = ?
            `);

            for (const currentMember of membersToMove) {

                moveToTemporary.run(
                    -1000000 - currentMember.id,
                    currentMember.id
                );

            }

            // +1
            const moveToNewPosition = db.prepare(`
                UPDATE members
                SET numero = ?
                WHERE id = ?
            `);

            for (const currentMember of membersToMove) {

                moveToNewPosition.run(
                    currentMember.numero + 1,
                    currentMember.id
                );

            }

        }

        // ==================================================
        // MOVER HACIA ABAJO
        //
        // Ejemplo:
        //
        // 30
        // 31
        // 32
        // 33
        //
        // mover 30 -> 33
        //
        // resultado:
        //
        // 31 -> 30
        // 32 -> 31
        // 33 -> 32
        // 30 -> 33
        // ==================================================

        else {

            const membersToMove = db.prepare(`
                SELECT id, numero
                FROM members
                WHERE activo = 1
                  AND numero > ?
                  AND numero <= ?
                ORDER BY numero ASC
            `).all(
                oldNumero,
                newNumero
            );

            // Temporal
            const moveToTemporary = db.prepare(`
                UPDATE members
                SET numero = ?
                WHERE id = ?
            `);

            for (const currentMember of membersToMove) {

                moveToTemporary.run(
                    -1000000 - currentMember.id,
                    currentMember.id
                );

            }

            // -1
            const moveToNewPosition = db.prepare(`
                UPDATE members
                SET numero = ?
                WHERE id = ?
            `);

            for (const currentMember of membersToMove) {

                moveToNewPosition.run(
                    currentMember.numero - 1,
                    currentMember.id
                );

            }

        }

        // ==================================================
        // COLOCAMOS EL MIEMBRO EN SU NUEVA POSICIÓN
        // ==================================================

        db.prepare(`
            UPDATE members
            SET
                nombre = ?,
                categoria = ?,
                instrumento = ?,
                numero = ?,
                activo = 1
            WHERE id = ?
        `).run(
            member.nombre,
            member.categoria,
            member.instrumento,
            newNumero,
            id
        );

        // IMPORTANTE:
        // También devolvemos el miembro completo.
        return {
            id,
            nombre: member.nombre,
            categoria: member.categoria,
            instrumento: member.instrumento,
            numero: newNumero,
            activo: 1
        };
    });

    return transaction();
}


// ======================================================
// ELIMINAR MIEMBRO
// ======================================================

function deleteMember(id) {

    const transaction = db.transaction(() => {

        const member = getMemberById(id);

        if (!member) {
            throw new Error("Miembro no encontrado");
        }

        const deletedNumero = member.numero;

        // ==================================================
        // SACAMOS AL MIEMBRO DE SU POSICIÓN
        // ==================================================

        db.prepare(`
            UPDATE members
            SET
                activo = 0,
                numero = ?
            WHERE id = ?
        `).run(
            -id,
            id
        );

        // ==================================================
        // MIEMBROS POSTERIORES
        // BAJAN UNA POSICIÓN
        // ==================================================

        const membersToMove = db.prepare(`
            SELECT id, numero
            FROM members
            WHERE activo = 1
              AND numero > ?
            ORDER BY numero ASC
        `).all(deletedNumero);

        // --------------------------------------------------
        // Temporal
        // --------------------------------------------------

        const moveToTemporary = db.prepare(`
            UPDATE members
            SET numero = ?
            WHERE id = ?
        `);

        for (const currentMember of membersToMove) {

            moveToTemporary.run(
                -1000000 - currentMember.id,
                currentMember.id
            );

        }

        // --------------------------------------------------
        // -1
        // --------------------------------------------------

        const moveToNewPosition = db.prepare(`
            UPDATE members
            SET numero = ?
            WHERE id = ?
        `);

        for (const currentMember of membersToMove) {

            moveToNewPosition.run(
                currentMember.numero - 1,
                currentMember.id
            );

        }

    });

    transaction();
}


// ======================================================
// EXPORTAR
// ======================================================

module.exports = {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
};