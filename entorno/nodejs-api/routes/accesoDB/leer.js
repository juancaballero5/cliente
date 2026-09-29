// ============================
// 📄 routes/accesoDB/leer.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../config/db.config");

router.post("/leer", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ ok: false, mensaje: "Faltan credenciales" });
  }

  const connection = mysql.createConnection(dbConfig.accesoDB);
  const sql =
    "SELECT id, username, nombre FROM usuarios WHERE username = ? AND password = ?";

  connection.query(sql, [username, password], (err, rows) => {
    connection.end();

    if (err) {
      console.error("❌ Error en /leer:", err);
      return res.status(500).json({ ok: false, mensaje: "Error del servidor" });
    }

    if (rows.length === 0) {
      return res.json({ ok: false, mensaje: "No existe el usuario" });
    }

    // Token de ejemplo para clase (NO es seguridad real).
    // Solo sirve para ver la idea de "sesión" en el front.
    const token = Date.now().toString();

    return res.json({
      ok: true,
      usuario: rows[0],
      mensaje: "Usuario encontrado",
      token: token,
    });
  });
});

module.exports = router;
