const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "database.sqlite");

const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

console.log("SQLite conectado");

module.exports = db;