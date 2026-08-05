const db = require("../database/db");

const XLSX = require("xlsx");
const fs = require("fs");

function importMembers(filePath) {

    const workbook = XLSX.readFile(filePath);

    const sheet =
        workbook.Sheets[
            workbook.SheetNames[0]
        ];

    const rows = XLSX.utils.sheet_to_json(
        sheet,
        {
            header: 1
        }
    );

    const transaction = db.transaction(() => {

        const findMemberByName = db.prepare(`
            SELECT id
            FROM members
            WHERE nombre = ?
        `);


        const findMemberByNumber = db.prepare(`
            SELECT id
            FROM members
            WHERE numero = ?
        `);

        const updateMember = db.prepare(`
            UPDATE members
            SET
                numero = ?,
                categoria = ?,
                activo = 1
            WHERE id = ?
        `);

        const insertMember = db.prepare(`
            INSERT INTO members
            (
                numero,
                categoria,
                nombre,
                instrumento,
                activo
            )
            VALUES (?, ?, ?, ?, ?)
        `);

        const getMembers = db.prepare(`
            SELECT
                id,
                nombre
            FROM members
        `);

        const deactivateMember = db.prepare(`
            UPDATE members
            SET activo = 0
            WHERE id = ?
        `);

        const importedNames = new Set();

        let importados = 0;

        for (let i = 1; i < rows.length; i++) {

            const row = rows[i];

            if (!row || row.length < 3) {
                continue;
            }

            const numero = Number(row[0]);

            const categoria = String(row[1]).trim();

            const nombre = String(row[2]).trim();

            if (
                !numero ||
                !categoria ||
                !nombre
            ) {
                continue;
            }

            importedNames.add(nombre);

            let existing =
                findMemberByName.get(nombre);


            if (!existing) {

                existing =
                    findMemberByNumber.get(numero);

            } else {

                insertMember.run(
                    numero,
                    categoria,
                    nombre,
                    "",
                    1
                );

            }

            importados++;

        }

        const members = getMembers.all();

        let desactivados = 0;

        for (const member of members) {

            if (!importedNames.has(member.nombre)) {

                deactivateMember.run(member.id);

                desactivados++;

            }

        }

        return {

            importados,

            desactivados

        };

    });

    const result = transaction();

    fs.unlinkSync(filePath);

    return result;

}

module.exports = {
    importMembers
};