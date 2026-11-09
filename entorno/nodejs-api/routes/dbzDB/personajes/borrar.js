// ============================
// 📄 routes/dbzDB/personajes/borrar.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.delete("/borrar/:id_personaje", (req, res) => {
  const { id_personaje } = req.params;
  const connection = mysql.createConnection(dbConfig.dbz);
  const sql = "DELETE FROM personajes WHERE id_api = ?";

  connection.query(sql, [id_personaje], (error) => {
    connection.end();
    if (error) {
      console.error(`❌ Error al borrar personaje ${id_personaje}:`, error.sqlMessage || error);
      return res.status(500).json({ success: false, mensaje: "Error al borrar personaje DBZ" });
    }
    res.json({ success: true, mensaje: `Personaje ${id_personaje} eliminado correctamente` });
  });
});

module.exports = router;
