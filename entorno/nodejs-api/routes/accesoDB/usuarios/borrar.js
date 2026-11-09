// ============================
// 📄 routes/accesoDB/usuarios/borrar.js
//  Borra un usuario por su clave.
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.delete("/borrar/:usuario", (req, res) => {
  const { usuario } = req.params;
  const connection = mysql.createConnection(dbConfig.accesoDB);
  const sql = "DELETE FROM usuarios WHERE usuario = ?";

  connection.query(sql, [usuario], (error) => {
    connection.end();

    if (error) {
      console.error(`❌ Error al borrar usuario ${usuario}:`, error.sqlMessage || error);
      return res.status(500).json({ ok: false, mensaje: "Error del servidor" });
    }

    res.json({ ok: true });
  });
});

module.exports = router;
