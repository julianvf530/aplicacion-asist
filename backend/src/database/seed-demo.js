const fs = require("fs");
const path = require("path");

// --------------------------------------------------
// IMPORTANTE:
// El seed de demo utiliza una base de datos independiente.
// Nunca utiliza la database.sqlite habitual.
// --------------------------------------------------

const demoDbPath = path.join(__dirname, "database-demo.sqlite");

// Si ya existe una demo anterior, la eliminamos
if (fs.existsSync(demoDbPath)) {
    fs.unlinkSync(demoDbPath);
}

process.env.DB_PATH = demoDbPath;

const db = require("./db");

// --------------------------------------------------
// Crear tablas
// --------------------------------------------------

const schema = fs.readFileSync(
    path.join(__dirname, "schema.sql"),
    "utf8"
);

db.exec(schema);

// --------------------------------------------------
// Datos ficticios
// --------------------------------------------------

const nombres = [
    "Alejandro",
    "Álvaro",
    "Andrés",
    "Antonio",
    "Carlos",
    "Daniel",
    "David",
    "Diego",
    "Eduardo",
    "Enrique",
    "Fernando",
    "Francisco",
    "Gabriel",
    "Guillermo",
    "Hugo",
    "Javier",
    "Jesús",
    "Jorge",
    "José",
    "Juan",
    "Luis",
    "Manuel",
    "Marcos",
    "Mario",
    "Miguel",
    "Nicolás",
    "Pablo",
    "Pedro",
    "Rafael",
    "Roberto",
    "Sergio",
    "Víctor"
];

const apellidos = [
    "García",
    "Fernández",
    "González",
    "Rodríguez",
    "López",
    "Martínez",
    "Sánchez",
    "Pérez",
    "Martín",
    "Gómez",
    "Jiménez",
    "Ruiz",
    "Hernández",
    "Díaz",
    "Moreno",
    "Muñoz",
    "Álvarez",
    "Romero",
    "Alonso",
    "Navarro"
];

const instrumentos = [
    "Flauta",
    "Oboe",
    "Clarinete",
    "Saxofón Alto",
    "Saxofón Tenor",
    "Trompeta",
    "Trompa",
    "Trombón",
    "Bombardino",
    "Tuba",
    "Percusión"
];

const categorias = [
    "1",
    "2",
    "3",
    "4",
    "E",
    "R",
    "T"
];

// --------------------------------------------------
// Insertar miembros
// --------------------------------------------------

const insertMember = db.prepare(`
    INSERT INTO members
    (
        nombre,
        categoria,
        instrumento,
        numero,
        activo
    )
    VALUES (?, ?, ?, ?, ?)
`);

const miembros = [];

for (let i = 1; i <= 60; i++) {
    const nombre =
        nombres[Math.floor(Math.random() * nombres.length)];

    const apellido1 =
        apellidos[Math.floor(Math.random() * apellidos.length)];

    const apellido2 =
        apellidos[Math.floor(Math.random() * apellidos.length)];

    const nombreCompleto =
        `${nombre} ${apellido1} ${apellido2}`;

    const categoria =
        categorias[Math.floor(Math.random() * categorias.length)];

    const instrumento =
        instrumentos[Math.floor(Math.random() * instrumentos.length)];

    const result = insertMember.run(
        nombreCompleto,
        categoria,
        instrumento,
        i,
        1
    );

    miembros.push({
        id: Number(result.lastInsertRowid),
        nombre: nombreCompleto
    });
}

// --------------------------------------------------
// Crear ensayos
// --------------------------------------------------

const insertEnsayo = db.prepare(`
    INSERT INTO ensayos
    (
        fecha,
        tipo
    )
    VALUES (?, ?)
`);

const insertAsistencia = db.prepare(`
    INSERT INTO asistencia
    (
        ensayo_id,
        member_id,
        presente
    )
    VALUES (?, ?, ?)
`);

const tipos = [
    "Ensayo",
    "Ensayo",
    "Ensayo",
    "Evento especial"
];

const hoy = new Date();

for (let i = 0; i < 25; i++) {
    const fecha = new Date(hoy);

    // Un ensayo cada 3 días aproximadamente
    fecha.setDate(
        hoy.getDate() - ((24 - i) * 3)
    );

    const fechaTexto =
        fecha.toISOString().split("T")[0];

    const tipo =
        tipos[Math.floor(Math.random() * tipos.length)];

    const ensayo =
        insertEnsayo.run(
            fechaTexto,
            tipo
        );

    const ensayoId =
        Number(ensayo.lastInsertRowid);

    // --------------------------------------------------
    // Asistencia
    // --------------------------------------------------

    miembros.forEach((member) => {

        // Generamos diferentes niveles de asistencia.
        // La mayoría tendrá una asistencia razonable,
        // pero algunos tendrán porcentajes bajos.

        const probabilidad = Math.random();

        let presente;

        if (member.id % 10 === 0) {
            // Algunos miembros con asistencia baja
            presente = probabilidad > 0.45;
        } else if (member.id % 7 === 0) {
            // Algunos con asistencia media
            presente = probabilidad > 0.25;
        } else {
            // La mayoría con buena asistencia
            presente = probabilidad > 0.10;
        }

        insertAsistencia.run(
            ensayoId,
            member.id,
            presente ? 1 : 0
        );
    });
}

// --------------------------------------------------
// Resultado
// --------------------------------------------------

console.log("");
console.log("======================================");
console.log("   DATOS DEMO CREADOS CORRECTAMENTE");
console.log("======================================");
console.log("");
console.log(`Miembros: ${miembros.length}`);
console.log("Ensayos: 25");
console.log("Asistencias: generadas");
console.log("");
console.log(`Base de datos: ${demoDbPath}`);
console.log("");