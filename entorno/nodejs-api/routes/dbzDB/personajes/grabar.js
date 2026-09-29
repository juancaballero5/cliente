// ============================
// 📄 routes/dbzDB/personajes/grabar.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.post("/grabar", (req, res) => {
  const { id, name, ki, maxKi, race, gender, description, image, affiliation } = req.body;

  const connection = mysql.createConnection(dbConfig.dbz);

  const sql = `
    INSERT INTO personajes (
      id_api, name, ki, max_ki, race, gender, affiliation, description, image_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE name = VALUES(name);
  `;

  const values = [
    id,
    name,
    ki,
    maxKi,
    race,
    gender,
    affiliation,
    description,
    image
  ];

  connection.query(sql, values, (error) => {
    connection.end();
    if (error) {
      console.error(`❌ Error al grabar ${name}:`, error.sqlMessage);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

module.exports = router;
