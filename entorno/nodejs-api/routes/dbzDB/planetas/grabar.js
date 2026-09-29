// ============================
// 📄 routes/dbzDB/planetas/grabar.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.post("/grabar", (req, res) => {
  const { id, name, isDestroyed, description, image } = req.body;

  const connection = mysql.createConnection(dbConfig.dbz);

  const sql = `
    INSERT INTO planetas (
      id_api, name, is_destroyed, description, image_url
    )
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE name = VALUES(name);
  `;

  const values = [id, name, isDestroyed, description, image];

  connection.query(sql, values, (error) => {
    connection.end();
    if (error) {
      console.error(`❌ Error al grabar planeta ${name}:`, error.sqlMessage);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

module.exports = router;
