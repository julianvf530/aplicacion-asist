const fs =require("fs")
const path = require("path")

const db = require("./db")

const schema = fs.readFileSync(
    path.join (__dirname, "schema.sql"),
    "utf8"

);

try {

    db.exec(schema);

    console.log("Base de datos inicializada");

} catch (error) {

    console.error(
        "Error creando la base de datos",
        error.message
    );

}