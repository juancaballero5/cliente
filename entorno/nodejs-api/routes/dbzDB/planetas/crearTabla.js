// ============================
// 📄 routes/dbzDB/planetas/crearTabla.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.get("/crear-tabla", (req, res) => {
  const connection = mysql.createConnection(dbConfig.dbz);

  const sql = `
    CREATE TABLE IF NOT EXISTS planetas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_api INT UNIQUE,
      name VARCHAR(100),
      is_destroyed BOOLEAN,
      description TEXT,
      image_url TEXT,
      image_blob LONGBLOB
    );
  `;

  connection.query(sql, (error) => {
    connection.end();
    if (error) {
      console.error("❌ Error al crear tabla planetas DBZ:", error.sqlMessage || error);
      return res.status(500).json({ success: false, mensaje: "Error al crear tabla planetas DBZ" });
    }
    res.json({ success: true, mensaje: "✅ Tabla planetas DBZ creada correctamente" });
  });
});

module.exports = router;
