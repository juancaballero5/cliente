// ============================
// 📄 routes/accesoDB/sesion/leer.js
//  Lee la sesión. La dirección vuelve agrupada.
//  Si hay varias filas, devuelve la primera por usuario (como getAll()[0]).
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

const SQL_SESION = `
  SELECT usuario, nombre, password, telefono, email, calle, cp, ciudad, provincia, imagen
  FROM sesion
  ORDER BY usuario
  LIMIT 1
`;

function filaASesion(fila) {
  return {
    usuario: fila.usuario,
    nombre: fila.nombre,
    password: fila.password,
    telefono: fila.telefono,
    email: fila.email,
    direccion: {
      calle: fila.calle,
      cp: fila.cp,
      ciudad: fila.ciudad,
      provincia: fila.provincia,
    },
    imagen: fila.imagen,
  };
}

router.get("/leer", (req, res) => {
  const connection = mysql.createConnection(dbConfig.accesoDB);

  connection.query(SQL_SESION, (error, filas) => {
    connection.end();

    if (error) {
      console.error("❌ Error al leer la sesión:", error.sqlMessage || error);
      return res.status(500).json({ ok: false, mensaje: "Error del servidor" });
    }

    if (filas.length === 0) {
      return res.status(404).json({ ok: false, mensaje: "No hay sesión" });
    }

    res.json(filaASesion(filas[0]));
  });
});

module.exports = router;
