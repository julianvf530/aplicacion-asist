
const db = require("./db");


const insert = db.prepare(`
    INSERT INTO members 
    (nombre, categoria, instrumento)
    VALUES (?, ?, ?)
`);


insert.run(
    "manuel",
    "3",
    "Trompeta"
);


insert.run(
    "Pedro",
    "2",
    "Trombón"
);


console.log("Datos insertados");