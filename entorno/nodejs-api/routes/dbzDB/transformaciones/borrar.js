// ============================
// 📄 routes/dbzDB/transformaciones/borrar.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.delete("/borrar/:id_transformacion", (req, res) => {
  const { id_transformacion } = req.params;
  const connection = mysql.createConnection(dbConfig.dbz);
  const sql = "DELETE FROM transformaciones WHERE id_api = ?";

  connection.query(sql, [id_transformacion], (error) => {
    connection.end();
    if (error) {
      console.error(`❌ Error al borrar transformación ${id_transformacion}:`, error.sqlMessage || error);
      return res.status(500).json({ success: false, mensaje: "Error al borrar transformación DBZ" });
    }
    res.json({ success: true, mensaje: `Transformación ${id_transformacion} eliminada correctamente` });
  });
});

module.exports = router;
