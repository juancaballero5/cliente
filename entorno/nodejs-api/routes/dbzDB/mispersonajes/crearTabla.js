"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.get("/crear-tabla", (req, res) => {
  const connection = mysql.createConnection(dbConfig.dbz);

  const sql = `
    CREATE TABLE IF NOT EXISTS MisPersonajes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      ki VARCHAR(50),
      race VARCHAR(50),
      gender VARCHAR(20),
      affiliation VARCHAR(100),
      image_url TEXT
    );
  `;

  connection.query(sql, (error) => {
    connection.end();
    if (error) {
      console.error("❌ Error al crear tabla MisPersonajes:", error);
      return res.status(500).json({ success: false, mensaje: "Error al crear tabla" });
    }
    res.json({ success: true, mensaje: "✅ Tabla MisPersonajes creada correctamente" });
  });
});

module.exports = router;
