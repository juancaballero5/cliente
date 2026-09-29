// ============================
// 📄 routes/dbzDB/planetas/borrar.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.delete("/borrar/:id_planeta", (req, res) => {
  const { id_planeta } = req.params;
  const connection = mysql.createConnection(dbConfig.dbz);
  const sql = "DELETE FROM planetas WHERE id_api = ?";

  connection.query(sql, [id_planeta], (error) => {
    connection.end();
    if (error) {
      console.error(`❌ Error al borrar planeta ${id_planeta}:`, error.sqlMessage || error);
      return res.status(500).json({ success: false, mensaje: "Error al borrar planeta DBZ" });
    }
    res.json({ success: true, mensaje: `Planeta ${id_planeta} eliminado correctamente` });
  });
});

module.exports = router;
