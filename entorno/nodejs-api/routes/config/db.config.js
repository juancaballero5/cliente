// ============================
//  config/db.config.js
//  Datos de conexión a MySQL.
//  Lee las variables del docker-compose (DB_HOST, DB_USER, DB_PASS).
//  Si no existen, usa los valores por defecto del curso.
// ============================
"use strict";

function crearConfig(database) {
  return {
    host: process.env.DB_HOST || "mysql-db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "dejame",
    database: database,
  };
}

module.exports = {
  accesoDB: crearConfig("accesoDB"),
  dbz: crearConfig("dbzDB"),
  superheroDB: crearConfig("superheroDB"),
};
