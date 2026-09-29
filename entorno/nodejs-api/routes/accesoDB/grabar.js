// ============================
// 📄 routes/accesoDB/grabar.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../config/db.config");

router.post("/grabar", (req, res) => {
  const { username, password, nombre } = req.body;

  if (!username || !password || !nombre) {
    return res.json({ ok: false, mensaje: "Faltan datos" });
  }

  const connection = mysql.createConnection(dbConfig.accesoDB);
  const sqlExiste = "SELECT id FROM usuarios WHERE username = ?";
  const valuesExiste = [username];

  connection.query(sqlExiste, valuesExiste, (error, rows) => {
    if (error) {
      connection.end();
      console.error(`❌ Error al verificar usuario ${username}:`, error.sqlMessage);
      return res.status(500).json({ ok: false, mensaje: "Error del servidor" });
    }

    if (rows.length > 0) {
      connection.end();
      return res.json({ ok: false, mensaje: "Usuario ya existe" });
    }

    const sqlInsert = "INSERT INTO usuarios (username, password, nombre) VALUES (?, ?, ?)";
    const valuesInsert = [username, password, nombre];

    connection.query(sqlInsert, valuesInsert, (error) => {
      connection.end();
      
      if (error) {
        console.error(`❌ Error al grabar usuario ${username}:`, error.sqlMessage);
        return res.status(500).json({ ok: false, mensaje: "Error del servidor" });
      }

      res.json({ ok: true });
    });
  });
});

module.exports = router;
