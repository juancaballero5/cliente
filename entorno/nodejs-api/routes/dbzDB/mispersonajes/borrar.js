// ============================
// 📄 routes/dbzDB/mispersonajes/borrar.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.delete("/borrar/:id", (req, res) => {
  const { id } = req.params;
  const connection = mysql.createConnection(dbConfig.dbz);
  const sql = "DELETE FROM MisPersonajes WHERE id = ?";

  connection.query(sql, [id], (error) => {
    connection.end();
    if (error) {
      console.error(`❌ Error al borrar personaje ${id}:`, error.sqlMessage || error);
      return res.status(500).json({ success: false, mensaje: "Error al borrar personaje" });
    }
    res.json({ success: true, mensaje: `Personaje ${id} eliminado correctamente` });
  });
});

module.exports = router;
