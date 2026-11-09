// ============================
// 📄 routes/accesoDB/usuarios/leer.js
//  Lee un usuario por su clave, o todos. La dirección vuelve agrupada.
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

const SQL_USUARIO = `
  SELECT usuario, nombre, password, telefono, email, calle, cp, ciudad, provincia, imagen
  FROM usuarios
`;

function filaAUsuario(fila) {
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

  connection.query(SQL_USUARIO + " ORDER BY usuario", (error, filas) => {
    connection.end();

    if (error) {
      console.error("❌ Error al leer usuarios:", error.sqlMessage || error);
      return res.status(500).json({ ok: false, mensaje: "Error del servidor" });
    }

    res.json(filas.map(filaAUsuario));
  });
});

router.get("/leer/:usuario", (req, res) => {
  const { usuario } = req.params;
  const connection = mysql.createConnection(dbConfig.accesoDB);

  connection.query(SQL_USUARIO + " WHERE usuario = ?", [usuario], (error, filas) => {
    connection.end();

    if (error) {
      console.error(`❌ Error al leer usuario ${usuario}:`, error.sqlMessage || error);
      return res.status(500).json({ ok: false, mensaje: "Error del servidor" });
    }

    if (filas.length === 0) {
      return res.status(404).json({ ok: false, mensaje: "No existe el usuario" });
    }

    res.json(filaAUsuario(filas[0]));
  });
});

module.exports = router;
