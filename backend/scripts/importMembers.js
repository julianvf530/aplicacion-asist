const fs = require("fs");
const path = require("path");

const db = require("../src/database/db");

const filePath = path.join(__dirname, "../data/miembros.txt");

const text = fs.readFileSync(filePath, "utf8");

const lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line !== "");

const categorias = {
    "PRIMERA CATEGORÍA": "1",
    "SEGUNDA CATEGORÍA": "2",
    "TERCERA CATEGORÍA": "3",
    "CUARTA CATEGORÍA": "4",
    "EDUCANDOS": "E",
    "REFUERZO-COLABORADOR": "R",
    "TAMBORES": "T"
};

let categoriaActual = "";
let numero = 1;

const insert = db.prepare(`
INSERT INTO members
(nombre,categoria,instrumento,numero)
VALUES (?,?,?,?)
`);

for (const line of lines) {

    if (categorias[line]) {

        categoriaActual = categorias[line];
        continue;

    }

    insert.run(

        line,
        categoriaActual,
        "Sin asignar",
        numero

    );

    console.log(`${numero} - ${line}`);

    numero++;

}

console.log(`\n${numero - 1} miembros importados.`);